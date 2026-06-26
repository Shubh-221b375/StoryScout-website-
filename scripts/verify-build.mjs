import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const publicDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "server",
  "public",
);

const required = [
  "index.html",
  "logo.png",
  "generated_images/cinematic_hiker_on_mountain_ridge_at_sunrise.png",
  "trek_assets/kedarkantha-trek/cover.jpg",
  "favicon.png",
];

const missing = required.filter((rel) => !fs.existsSync(path.join(publicDir, rel)));

if (missing.length > 0) {
  console.error("Build verification failed. Missing:");
  missing.forEach((m) => console.error(" -", m));
  process.exit(1);
}

console.log("Build verification passed.");
