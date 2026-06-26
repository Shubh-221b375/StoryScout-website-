/**
 * Upload the hero background video to Supabase Storage (free tier: 1 GB).
 *
 * Setup:
 * 1. Supabase Dashboard → Storage → New bucket → name: "media" → Public bucket: ON
 * 2. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env
 *    (Project Settings → API → service_role secret)
 * 3. Run: node scripts/upload-hero-video.mjs
 *
 * Then set VITE_HERO_VIDEO_URL in .env to the printed public URL and rebuild.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env");

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv(envPath);

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = "media";
const objectPath = "bg_video_1763829371002.mp4";
const videoPath = path.join(root, "attached_assets", objectPath);

if (!supabaseUrl || !serviceKey) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env\n" +
      "Get them from Supabase Dashboard → Project Settings → API",
  );
  process.exit(1);
}

if (!fs.existsSync(videoPath)) {
  console.error(`Video not found: ${videoPath}`);
  process.exit(1);
}

const sizeMb = (fs.statSync(videoPath).size / (1024 * 1024)).toFixed(1);
console.log(`Uploading ${objectPath} (${sizeMb} MB) to Supabase Storage...`);

const fileBuffer = fs.readFileSync(videoPath);
const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucket}/${objectPath}`;

const uploadRes = await fetch(uploadUrl, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "video/mp4",
    "x-upsert": "true",
  },
  body: fileBuffer,
});

if (!uploadRes.ok) {
  const text = await uploadRes.text();
  if (uploadRes.status === 400 && text.includes("Bucket not found")) {
    console.log('Creating public bucket "media"...');
    const createRes = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: bucket, public: true }),
    });
    if (!createRes.ok) {
      console.error("Failed to create bucket:", await createRes.text());
      process.exit(1);
    }
    const retry = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "video/mp4",
        "x-upsert": "true",
      },
      body: fileBuffer,
    });
    if (!retry.ok) {
      console.error("Upload failed:", await retry.text());
      process.exit(1);
    }
  } else {
    console.error(`Upload failed (${uploadRes.status}):`, text);
    process.exit(1);
  }
}

const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`;

console.log("\nUpload complete!\n");
console.log("Add this to your .env:\n");
console.log(`VITE_HERO_VIDEO_URL=${publicUrl}`);
console.log("\nThen rebuild: npm run build");
