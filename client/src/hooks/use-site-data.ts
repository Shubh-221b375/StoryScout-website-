import { useQuery } from "@tanstack/react-query";
import { packages as mockPackages, regions as mockRegions } from "@/lib/mockData";
import type { SitePackage, SiteRegion, SiteReview } from "@shared/types";
import { getQueryFn } from "@/lib/queryClient";

export function usePackages() {
  const { data, isLoading } = useQuery<SitePackage[]>({
    queryKey: ["/api/site/packages"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const packages =
    data && data.length > 0 ? data : (mockPackages as SitePackage[]);

  return { packages, isLoading, isFromApi: Boolean(data && data.length > 0) };
}

export function useRegions() {
  const { data, isLoading } = useQuery<SiteRegion[]>({
    queryKey: ["/api/site/regions"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const regions =
    data && data.length > 0
      ? data
      : mockRegions.map((r) => ({
          id: r.id,
          name: r.name,
          image: r.image as string,
          description: r.description,
        }));

  return { regions, isLoading };
}

export function useReviews() {
  return useQuery<SiteReview[]>({
    queryKey: ["/api/site/reviews"],
    queryFn: getQueryFn({ on401: "throw" }),
  });
}

export function usePackage(id?: string) {
  const { packages, isLoading } = usePackages();
  const pkg = packages.find((p) => p.id === id);
  return { pkg, isLoading };
}
