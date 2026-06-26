import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import type { SitePackage, PackageRegion } from "@shared/types";
import { Pencil, Plus, Trash2 } from "lucide-react";

const emptyPackage: Partial<SitePackage> = {
  title: "",
  region: "Trekking",
  location: "",
  duration: "",
  price: 0,
  image: "",
  description: "",
  highlights: [],
  itinerary: [{ day: 1, title: "", description: "" }],
  isHot: false,
};

export default function AdminPackages() {
  const queryClient = useQueryClient();
  const { data: packages = [] } = useQuery<SitePackage[]>({
    queryKey: ["/api/admin/packages"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const [editing, setEditing] = useState<Partial<SitePackage> | null>(null);
  const [open, setOpen] = useState(false);

  const saveMutation = useMutation({
    mutationFn: async (pkg: Partial<SitePackage>) => {
      const payload = {
        ...pkg,
        highlights: typeof pkg.highlights === "string"
          ? (pkg.highlights as unknown as string).split("\n").filter(Boolean)
          : pkg.highlights,
      };
      if (pkg.id && packages.some((p) => p.id === pkg.id)) {
        await apiRequest("PATCH", `/api/admin/packages/${pkg.id}`, payload);
      } else {
        await apiRequest("POST", "/api/admin/packages", payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/site/packages"] });
      toast({ title: "Package saved" });
      setOpen(false);
      setEditing(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/packages/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({ title: "Package deleted" });
    },
  });

  const openNew = () => {
    setEditing({ ...emptyPackage });
    setOpen(true);
  };

  const openEdit = (pkg: SitePackage) => {
    setEditing({ ...pkg });
    setOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Packages</h1>
          <p className="text-muted-foreground mt-1">Manage travel packages on the website.</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Add package
        </Button>
      </div>

      <div className="space-y-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card"
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="h-16 w-24 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold truncate">{pkg.title}</p>
                <Badge variant="outline">{pkg.region}</Badge>
                {pkg.isHot && <Badge className="bg-accent">Hot</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">
                {pkg.location} · {pkg.duration} · ₹{pkg.price.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => openEdit(pkg)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive"
                onClick={() => deleteMutation.mutate(pkg.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {packages.length === 0 && (
          <p className="text-muted-foreground text-center py-12">
            No packages yet. They will auto-import from site data on dashboard load.
          </p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit package" : "New package"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate(editing);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Title</Label>
                  <Input
                    value={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Region</Label>
                  <Select
                    value={editing.region}
                    onValueChange={(v) =>
                      setEditing({ ...editing, region: v as PackageRegion })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Trekking", "North", "South", "East", "West", "Foreign"].map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    value={editing.price || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, price: Number(e.target.value) })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={editing.location || ""}
                    onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input
                    value={editing.duration || ""}
                    onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Cover image URL</Label>
                  <Input
                    value={editing.image || ""}
                    onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editing.description || ""}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Highlights (one per line)</Label>
                  <Textarea
                    value={
                      Array.isArray(editing.highlights)
                        ? editing.highlights.join("\n")
                        : String(editing.highlights || "")
                    }
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        highlights: e.target.value.split("\n").filter(Boolean),
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save package"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
