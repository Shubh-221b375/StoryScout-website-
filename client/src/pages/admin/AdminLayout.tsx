import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Star,
  CalendarCheck,
  Users,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { useEffect } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/users", label: "Team & Users", icon: Users, adminOnly: true },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, isStaff, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isStaff) {
      setLocation("/login?redirect=/admin");
    }
  }, [isLoading, isStaff, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isStaff) return null;

  return (
    <div className="min-h-screen flex bg-muted/20">
      <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold">
            StoryScout
          </p>
          <h1 className="text-xl font-display font-bold">Admin Portal</h1>
          <p className="text-xs text-muted-foreground mt-1">{user?.fullName}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems
            .filter((item) => !item.adminOnly || user?.role === "admin")
            .map((item) => {
              const active = location === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </a>
                </Link>
              );
            })}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <Link href="/">
            <a className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground px-3 py-2">
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </a>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => logout()}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
