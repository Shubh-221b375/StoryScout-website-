import { trekAssets } from "@/lib/trekAssets";

export type GalleryImage = {
  src: string;
  caption: string;
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function titleFromPackageId(id: string) {
  return id
    .replace(/-+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Picks a mixed random set of images across trek packages.
 * Ensures variety by taking a few from each package first, then filling the rest.
 */
export function getRandomTrekGalleryImages(count: number): GalleryImage[] {
  const entries = Object.entries(trekAssets)
    .map(([packageId, a]) => ({
      packageId,
      caption: titleFromPackageId(packageId),
      urls: a.gallery ?? [],
    }))
    .filter((e) => e.urls.length > 0);

  if (entries.length === 0) return [];

  const perPackage = Math.max(1, Math.floor(count / entries.length));
  const chosen: GalleryImage[] = [];
  const remainingPool: GalleryImage[] = [];

  for (const e of entries) {
    const shuffled = shuffle(e.urls);
    const take = Math.min(perPackage, shuffled.length);
    for (let i = 0; i < take; i += 1) {
      chosen.push({ src: shuffled[i], caption: e.caption });
    }
    for (let i = take; i < shuffled.length; i += 1) {
      remainingPool.push({ src: shuffled[i], caption: e.caption });
    }
  }

  if (chosen.length < count) {
    const fill = shuffle(remainingPool).slice(0, count - chosen.length);
    chosen.push(...fill);
  }

  return shuffle(chosen).slice(0, count);
}


