import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import Home from "@/pages/Home";
import RegionPage from "@/pages/RegionPage";
import PackageDetail from "@/pages/PackageDetail";
import PolicyPage from "@/pages/PolicyPage";
import AboutPage from "@/pages/AboutPage";
import NotFound from "@/pages/not-found";
import ReviewsPage from "@/pages/ReviewsPage";
import PrivateToursPage from "@/pages/PrivateToursPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminPackages from "@/pages/admin/AdminPackages";
import AdminReviews from "@/pages/admin/AdminReviews";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminPrivateTours from "@/pages/admin/AdminPrivateTours";
import AdminUsers from "@/pages/admin/AdminUsers";
import { FloatingActions } from "@/components/layout/FloatingActions";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/region/:id" component={RegionPage} />
      <Route path="/package/:id" component={PackageDetail} />
      <Route path="/policy" component={PolicyPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/reviews" component={ReviewsPage} />
      <Route path="/private-tours" component={PrivateToursPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/packages" component={AdminPackages} />
      <Route path="/admin/reviews" component={AdminReviews} />
      <Route path="/admin/bookings" component={AdminBookings} />
      <Route path="/admin/private-tours" component={AdminPrivateTours} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollToTopOnRouteChange() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function AppShell() {
  const [location] = useLocation();
  const hideFloatingActions = location.startsWith("/admin");

  return (
    <>
      <ScrollToTopOnRouteChange />
      {!hideFloatingActions && <FloatingActions />}
      <Router />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <AppShell />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
