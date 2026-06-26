import type { Package } from "./mockData";

export const LAUNCHING_SOON_LABEL = "Launching Soon";

export function isLaunchingSoon(pkg: Pick<Package, "region">): boolean {
  return pkg.region !== "Trekking";
}

export function showDiscount(pkg: Package): boolean {
  return !isLaunchingSoon(pkg) && !!pkg.discount;
}

export function showOriginalPrice(pkg: Package): boolean {
  return (
    !isLaunchingSoon(pkg) &&
    !!pkg.originalPrice &&
    pkg.originalPrice > pkg.price
  );
}
