import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Sync trek package assets from `/attached_assets/<Folder Name>/`
 * into `/client/public/trek_assets/<packageId>/` with clean filenames,
 * and generate `client/src/lib/trekAssets.ts` for use in the app.
 *
 * - Copies images: jpg/jpeg/png/webp (case-insensitive)
 * - Skips: HEIC, mp4, pdf (except itinerary pdf)
 * - Copies 1 pdf as `itinerary.pdf` (prefers filenames containing "itinerary")
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const SRC_ROOT = path.resolve(repoRoot, "attached_assets");
const DEST_PUBLIC_ROOT = path.resolve(
  repoRoot,
  "client",
  "public",
  "trek_assets",
);
const DEST_TS_FILE = path.resolve(
  repoRoot,
  "client",
  "src",
  "lib",
  "trekAssets.ts",
);

const TREK_FOLDERS = [
  { packageId: "kedarkantha-trek", folderName: "Kedharkantha", coverBaseName: "Kedarkantha Cover" },
  { packageId: "dayara-bugyal", folderName: "Dayara Bugyal", coverBaseName: "Dayara Bugyal Cover" },
  { packageId: "chandrakhani-pass", folderName: "Chandrakhani Pass", coverBaseName: "Chandrakhani Cover" },
  { packageId: "kuari-pass", folderName: "Kuari Pass", coverBaseName: "Kuari Pass Cover" },
  { packageId: "pangarchulla-kuari-pass", folderName: "Pangarchulla", coverBaseName: "Pangarchulla X Kuari Pass Cover" },
  { packageId: "brahmatal-trek", folderName: "Brahmatal", coverBaseName: "Brahmatal Cover" },
];

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const COVER_PHOTOS_DIR = path.resolve(SRC_ROOT, "cover photos");

function getExtLower(fileName) {
  return path.extname(fileName).toLowerCase();
}

function numericSortKey(fileName) {
  const m = fileName.match(/(\d+)/);
  return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
}

function naturalFileSort(a, b) {
  const an = numericSortKey(a);
  const bn = numericSortKey(b);
  if (an !== bn) return an - bn;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

async function ensureEmptyDir(dir) {
  await fs.mkdir(dir, { recursive: true });
  const entries = await fs.readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map((e) =>
      fs.rm(path.join(dir, e.name), { recursive: true, force: true }),
    ),
  );
}

function toPublicUrl(...parts) {
  // Always use forward slashes in URLs
  return "/" + parts.join("/").replaceAll("\\", "/");
}

function padIndex(i, width) {
  return String(i).padStart(width, "0");
}

function normalizeKey(s) {
  return s
    .toLowerCase()
    .replace(/\.[^/.]+$/u, "")
    .replace(/[^a-z0-9]+/gu, "");
}

async function readCoverPhotosIndex() {
  try {
    const entries = await fs.readdir(COVER_PHOTOS_DIR, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile()).map((e) => e.name);
    const coverImages = files.filter((f) => IMAGE_EXTS.has(getExtLower(f)));
    const byKey = new Map();
    for (const f of coverImages) {
      byKey.set(normalizeKey(f), f);
    }
    return { coverImages, byKey };
  } catch {
    return { coverImages: [], byKey: new Map() };
  }
}

async function main() {
  const out = {};
  const coverIndex = await readCoverPhotosIndex();

  for (const { packageId, folderName, coverBaseName } of TREK_FOLDERS) {
    const srcDir = path.resolve(SRC_ROOT, folderName);
    const destDir = path.resolve(DEST_PUBLIC_ROOT, packageId);
    const destGalleryDir = path.resolve(destDir, "gallery");

    const entries = await fs.readdir(srcDir, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile()).map((e) => e.name);

    const imageFiles = files
      .filter((f) => IMAGE_EXTS.has(getExtLower(f)))
      .sort(naturalFileSort);

    const pdfFiles = files
      .filter((f) => getExtLower(f) === ".pdf")
      .sort(naturalFileSort);

    // Prefer "itinerary" pdf if present
    const pdf =
      pdfFiles.find((f) => f.toLowerCase().includes("itinerary")) ??
      pdfFiles[0];

    await ensureEmptyDir(destGalleryDir);

    const padWidth = Math.max(2, String(imageFiles.length).length);
    const galleryUrls = [];

    for (let idx = 0; idx < imageFiles.length; idx += 1) {
      const srcName = imageFiles[idx];
      const ext = getExtLower(srcName);
      const outName = `${padIndex(idx + 1, padWidth)}${ext}`;
      await fs.copyFile(
        path.resolve(srcDir, srcName),
        path.resolve(destGalleryDir, outName),
      );
      galleryUrls.push(
        toPublicUrl("trek_assets", packageId, "gallery", outName),
      );
    }

    if (pdf) {
      await fs.mkdir(destDir, { recursive: true });
      await fs.copyFile(
        path.resolve(srcDir, pdf),
        path.resolve(destDir, "itinerary.pdf"),
      );
    }

    // Cover photo: prefer `attached_assets/cover photos/<name> Cover.*`
    let coverUrl = galleryUrls[0] ?? "";
    if (coverIndex.coverImages.length > 0) {
      const exact =
        coverIndex.byKey.get(normalizeKey(coverBaseName)) ??
        coverIndex.coverImages.find((f) =>
          normalizeKey(f).includes(normalizeKey(coverBaseName)),
        );

      if (exact) {
        const ext = getExtLower(exact);
        const destCoverPath = path.resolve(destDir, `cover${ext}`);
        await fs.mkdir(destDir, { recursive: true });
        await fs.copyFile(path.resolve(COVER_PHOTOS_DIR, exact), destCoverPath);
        coverUrl = toPublicUrl("trek_assets", packageId, `cover${ext}`);
      }
    }

    out[packageId] = {
      cover: coverUrl,
      gallery: galleryUrls,
      itineraryPdfUrl: pdf
        ? toPublicUrl("trek_assets", packageId, "itinerary.pdf")
        : undefined,
    };
  }

  const ts = `/* eslint-disable */
// AUTO-GENERATED by scripts/syncTrekAssets.mjs — do not edit manually.
export type TrekAssetEntry = {
  cover: string;
  gallery: string[];
  itineraryPdfUrl?: string;
};

export const trekAssets: Record<string, TrekAssetEntry> = ${JSON.stringify(
    out,
    null,
    2,
  )} as const;
`;

  await fs.mkdir(path.dirname(DEST_TS_FILE), { recursive: true });
  await fs.writeFile(DEST_TS_FILE, ts, "utf8");

  // eslint-disable-next-line no-console
  console.log(
    `Synced trek assets to ${path.relative(repoRoot, DEST_PUBLIC_ROOT)} and wrote ${path.relative(
      repoRoot,
      DEST_TS_FILE,
    )}`,
  );
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});


