import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import type { SiteReview } from "@shared/types";
import { Star, Trash2, Check, X } from "lucide-react";

export default function AdminReviews() {
  const queryClient = useQueryClient();
  const { data: reviews = [] } = useQuery<SiteReview[]>({
    queryKey: ["/api/admin/reviews"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...body }: { id: string; approved?: boolean; featured?: boolean }) =>
      apiRequest("PATCH", `/api/admin/reviews/${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({ title: "Review updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({ title: "Review deleted" });
    },
  });

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Reviews</h1>
        <p className="text-muted-foreground mt-1">
          Approve, feature, or remove customer reviews.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-5 rounded-xl border border-border bg-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex items-center gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < review.rating ? "fill-accent" : "stroke-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  {!review.approved && (
                    <Badge variant="secondary">Pending approval</Badge>
                  )}
                  {review.featured && <Badge className="bg-accent">Featured</Badge>}
                </div>
                <p className="text-muted-foreground text-sm mb-2">{review.message}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {!review.approved && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={() =>
                      updateMutation.mutate({ id: review.id, approved: true })
                    }
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve
                  </Button>
                )}
                {review.approved && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateMutation.mutate({
                        id: review.id,
                        featured: !review.featured,
                      })
                    }
                  >
                    {review.featured ? "Unfeature" : "Feature"}
                  </Button>
                )}
                {review.approved && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={() =>
                      updateMutation.mutate({ id: review.id, approved: false })
                    }
                  >
                    <X className="h-3.5 w-3.5" />
                    Hide
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive gap-1"
                  onClick={() => deleteMutation.mutate(review.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-muted-foreground text-center py-12">No reviews yet.</p>
        )}
      </div>
    </AdminLayout>
  );
}
