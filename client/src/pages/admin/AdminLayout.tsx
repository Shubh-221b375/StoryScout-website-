import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Package,
  Star,
  CalendarCheck,
  Users,
  LogOut,
  ArrowLeft,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/users", label: "Team & Users", icon: Users, adminOnly: true },
];

function SidebarPanel({
  location,
  userName,
  isAdmin,
  onNavigate,
  onLogout,
}: {
  location: string;
  userName?: string;
  isAdmin: boolean;
  onNavigate?: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-card">
      <div className="border-b border-border p-5 lg:p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          StoryScout
        </p>
        <h1 className="font-display text-xl font-bold">Admin Portal</h1>
        {userName && (
          <p className="mt-1 truncate text-xs text-muted-foreground">{userName}</p>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3 lg:p-4">
        {navItems
          .filter((item) => !item.adminOnly || isAdmin)
          .map((item) => {
            const active = location === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={onNavigate}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </a>
              </Link>
            );
          })}
      </nav>

      <div className="space-y-2 border-t border-border p-3 lg:p-4">
        <Link href="/">
          <a
            onClick={onNavigate}
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Back to website
          </a>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => {
            onNavigate?.();
            onLogout();
          }}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign out
        </Button>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, isStaff, isLoading, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isStaff) {
      setLocation("/login?redirect=/admin");
    }
  }, [isLoading, isStaff, setLocation]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isStaff) return null;

  const sidebarProps = {
    location,
    userName: user?.fullName,
    isAdmin: user?.role === "admin",
    onLogout: () => logout(),
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Open admin menu"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Admin Portal
          </p>
          <p className="truncate text-sm font-medium">{user?.fullName}</p>
        </div>
      </header>

      {/* Mobile drawer */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-[min(280px,88vw)] p-0">
          <SidebarPanel
            {...sidebarProps}
            onNavigate={() => setMobileNavOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="lg:flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-card">
          <SidebarPanel {...sidebarProps} />
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 lg:pl-64">
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
