import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const trekAssets = fs.readFileSync(
  path.join(root, "client/src/lib/trekAssets.ts"),
  "utf8",
);
const urls = [...trekAssets.matchAll(/"(\/trek_assets[^"]+)"/g)].map((m) => m[1]);
const missing = urls.filter(
  (u) => !fs.existsSync(path.join(root, "client/public", u)),
);
console.log(`Missing trek files: ${missing.length}`);
missing.forEach((m) => console.log(m));
