import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import type { SiteBooking } from "@shared/types";
import { usePackages } from "@/hooks/use-site-data";

export default function AdminBookings() {
  const queryClient = useQueryClient();
  const { packages } = usePackages();
  const { data: bookings = [] } = useQuery<SiteBooking[]>({
    queryKey: ["/api/admin/bookings"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/admin/bookings/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({ title: "Booking updated" });
    },
  });

  const getPackageTitle = (id: string) =>
    packages.find((p) => p.id === id)?.title || id;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Bookings</h1>
        <p className="text-muted-foreground mt-1">
          Manage customer booking requests from the website.
        </p>
      </div>

      <div className="space-y-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="p-5 rounded-xl border border-border bg-card"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{booking.fullName}</p>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "cancelled"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {getPackageTitle(booking.packageId)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {booking.email} · {booking.phone}
                </p>
                <p className="text-sm text-muted-foreground">
                  {booking.numberOfPeople} traveller
                  {booking.numberOfPeople > 1 ? "s" : ""}
                  {booking.preferredDate && ` · ${booking.preferredDate}`}
                </p>
                {booking.specialRequests && (
                  <p className="text-sm mt-2 italic text-muted-foreground">
                    &ldquo;{booking.specialRequests}&rdquo;
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {booking.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() =>
                        updateMutation.mutate({ id: booking.id, status: "confirmed" })
                      }
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive"
                      onClick={() =>
                        updateMutation.mutate({ id: booking.id, status: "cancelled" })
                      }
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {booking.status === "confirmed" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateMutation.mutate({ id: booking.id, status: "cancelled" })
                    }
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        {bookings.length === 0 && (
          <p className="text-muted-foreground text-center py-12">No bookings yet.</p>
        )}
      </div>
    </AdminLayout>
  );
}
