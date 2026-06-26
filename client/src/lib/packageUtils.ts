import type { Package } from "./mockData";

export const LAUNCHING_SOON_LABEL = "Launching Soon";

export function isLaunchingSoon(pkg: Pick<Package, "region">): boolean {
  return pkg.region !== "Trekking";
}

export function getDiscountPercent(pkg: Package): number {
  if (pkg.discount) return pkg.discount;
  if (pkg.originalPrice && pkg.originalPrice > pkg.price) {
    return Math.round((1 - pkg.price / pkg.originalPrice) * 100);
  }
  return 0;
}

export function hasOffer(pkg: Package): boolean {
  return !isLaunchingSoon(pkg) && getDiscountPercent(pkg) > 0;
}

export function showDiscount(pkg: Package): boolean {
  return hasOffer(pkg);
}

export function showOriginalPrice(pkg: Package): boolean {
  return (
    !isLaunchingSoon(pkg) &&
    !!pkg.originalPrice &&
    pkg.originalPrice > pkg.price
  );
}
