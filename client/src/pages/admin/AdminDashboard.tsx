import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { packages as mockPackages, regions as mockRegions } from "@/lib/mockData";
import {
  Package,
  CalendarCheck,
  Star,
  Users,
  IndianRupee,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardStats {
  totalPackages: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalReviews: number;
  approvedReviews: number;
  totalUsers: number;
  staffUsers: number;
  estimatedRevenue: number;
  recentBookings: Array<{
    id: string;
    fullName: string;
    packageId: string;
    numberOfPeople: number;
    status: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/admin/dashboard"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const importMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/admin/import-packages", {
        packages: mockPackages,
        regions: mockRegions.map((r) => ({
          id: r.id,
          name: r.name,
          image: r.image,
          description: r.description,
        })),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    if (stats && stats.totalPackages === 0 && !importMutation.isPending) {
      importMutation.mutate();
    }
  }, [stats?.totalPackages]);

  const cards = [
    {
      title: "Packages",
      value: stats?.totalPackages ?? 0,
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Bookings",
      value: stats?.totalBookings ?? 0,
      icon: CalendarCheck,
      color: "text-accent",
    },
    {
      title: "Pending",
      value: stats?.pendingBookings ?? 0,
      icon: Clock,
      color: "text-amber-600",
    },
    {
      title: "Reviews",
      value: stats?.totalReviews ?? 0,
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Customers",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Est. Revenue",
      value: `₹${(stats?.estimatedRevenue ?? 0).toLocaleString()}`,
      icon: IndianRupee,
      color: "text-green-600",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your website data and recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.recentBookings?.length ? (
            <div className="space-y-3">
              {stats.recentBookings.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div>
                    <p className="font-medium">{b.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {b.numberOfPeople} traveller{b.numberOfPeople > 1 ? "s" : ""} ·{" "}
                      {new Date(b.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant={
                      b.status === "confirmed"
                        ? "default"
                        : b.status === "cancelled"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {b.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No bookings yet.</p>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
