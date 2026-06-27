import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { packages as mockPackages, regions as mockRegions } from "@/lib/mockData";
import { Link } from "wouter";
import {
  Package,
  CalendarCheck,
  Star,
  Users,
  IndianRupee,
  Clock,
  MapPinned,
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
  totalPrivateTourInquiries: number;
  recentBookings: Array<{
    id: string;
    fullName: string;
    packageId: string;
    numberOfPeople: number;
    status: string;
    createdAt: string;
  }>;
  recentPrivateTourInquiries: Array<{
    id: string;
    fullName: string;
    email: string;
    contactNumber: string;
    primaryDestination: string;
    tripStartDate: string;
    numberOfDays: string;
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
      title: "Private Tours",
      value: stats?.totalPrivateTourInquiries ?? 0,
      icon: MapPinned,
      color: "text-teal-600",
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
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                    className="flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
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
              <p className="text-sm text-muted-foreground">No bookings yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Recent private tours</CardTitle>
            <Link href="/admin/private-tours">
              <a className="text-sm font-medium text-primary hover:underline">View all</a>
            </Link>
          </CardHeader>
          <CardContent>
            {stats?.recentPrivateTourInquiries?.length ? (
              <div className="space-y-3">
                {stats.recentPrivateTourInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="rounded-lg border border-border p-3"
                  >
                    <p className="font-medium">{inquiry.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {inquiry.primaryDestination} · {inquiry.numberOfDays} day
                      {inquiry.numberOfDays === "1" ? "" : "s"} ·{" "}
                      {inquiry.tripStartDate || "Dates TBD"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {inquiry.contactNumber} · {inquiry.email}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No private tour enquiries yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
