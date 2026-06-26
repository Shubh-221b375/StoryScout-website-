import { useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { parseApiError } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const redirect = new URLSearchParams(search).get("redirect") || "/";
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedInUser = await login(email.trim(), password);
      toast({ title: "Welcome back!" });
      const isStaff =
        loggedInUser.role === "admin" || loggedInUser.role === "employee";
      if (isStaff && (redirect === "/" || redirect === "/login")) {
        setLocation("/admin");
      } else {
        setLocation(redirect);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: parseApiError(err) || "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-40 pb-20 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl border border-border bg-card shadow-xl"
        >
          <h1 className="text-3xl font-display font-bold mb-2">Sign in</h1>
          <p className="text-muted-foreground mb-8">
            Login to book packages and manage your journeys.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
