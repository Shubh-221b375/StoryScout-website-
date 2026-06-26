import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = path.join(root, "attached_assets");
const publicRoot = path.join(root, "client", "public");

async function copyFile(src, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
}

async function copyDir(srcDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const from = path.join(srcDir, entry.name);
    const to = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyDir(from, to);
    } else if (/\.(png|jpe?g|webp|gif|svg)$/i.test(entry.name)) {
      await copyFile(from, to);
    }
  }
}

const logoSrc = path.join(srcRoot, "logo_1763751397591.png");
const generatedSrc = path.join(srcRoot, "generated_images");

if (!(await fs.stat(logoSrc).catch(() => null))) {
  console.error("Missing logo:", logoSrc);
  process.exit(1);
}

await copyFile(logoSrc, path.join(publicRoot, "logo.png"));
await copyDir(generatedSrc, path.join(publicRoot, "generated_images"));

console.log("Synced logo and generated_images to client/public/");
