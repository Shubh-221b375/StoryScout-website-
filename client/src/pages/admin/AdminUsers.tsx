import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./AdminLayout";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import type { PublicUser, UserRole } from "@shared/types";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function AdminUsers() {
  const { isAdmin, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !isAdmin) setLocation("/admin");
  }, [isAdmin, isLoading, setLocation]);

  const { data: users = [] } = useQuery<PublicUser[]>({
    queryKey: ["/api/admin/users"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: isAdmin,
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      apiRequest("PATCH", `/api/admin/users/${id}/role`, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User role updated" });
    },
  });

  if (!isAdmin) return null;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Team & Users</h1>
        <p className="text-muted-foreground mt-1">
          Manage staff access and customer accounts.
        </p>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 rounded-xl border border-border bg-card gap-4 flex-wrap"
          >
            <div>
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant={
                  user.role === "admin"
                    ? "default"
                    : user.role === "employee"
                      ? "secondary"
                      : "outline"
                }
              >
                {user.role}
              </Badge>
              <Select
                value={user.role}
                onValueChange={(role) =>
                  updateRoleMutation.mutate({ id: user.id, role: role as UserRole })
                }
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
