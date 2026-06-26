import { Link, useLocation } from "wouter";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquireModal } from "./EnquireModal";
import { useAuth } from "@/hooks/use-auth";
import { SITE_LOGO } from "@/lib/siteAssets";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const [location] = useLocation();
  const { user, isStaff, logout } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const scrollToRegions = () => {
    if (location !== "/") {
      window.location.href = "/#regions";
    } else {
      document.getElementById("regions")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Regions" },
    { name: "Packages", href: "/region/all" },
    { name: "Private Tours", href: "/private-tours" },
    { name: "Reviews", href: "/reviews" },
    { name: "About", href: "/about" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || location !== "/" ? "bg-white/80 backdrop-blur-md border-b border-primary/10 shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 h-28 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center h-full">
            <img 
              src={SITE_LOGO} 
              alt="StoryScout Logo" 
              className="h-20 w-auto"
            />
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => 
            link.name === "Regions" ? (
              <button
                key={link.name}
                onClick={scrollToRegions}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isScrolled || location !== "/" ? "text-foreground" : "text-white/90"
                }`}
              >
                {link.name}
              </button>
            ) : (
              <Link key={link.name} href={link.href || "/"} className={`text-sm font-medium transition-colors hover:text-accent ${
                isScrolled || location !== "/" ? "text-foreground" : "text-white/90"
              }`}>
                {link.name}
              </Link>
            )
          )}
          {isStaff ? (
            <Link href="/admin">
              <Button
                variant={isScrolled || location !== "/" ? "default" : "secondary"}
                className="font-semibold gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin Portal
              </Button>
            </Link>
          ) : user ? (
            <Button
              variant="ghost"
              className={`font-medium gap-2 ${
                isScrolled || location !== "/" ? "text-foreground" : "text-white/90"
              }`}
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              {user.fullName.split(" ")[0]}
            </Button>
          ) : (
            <Link href="/login">
              <Button
                variant={isScrolled || location !== "/" ? "outline" : "secondary"}
                className="font-semibold gap-2"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
          <Button 
            onClick={() => setIsEnquireModalOpen(true)}
            variant={isScrolled || location !== "/" ? "default" : "secondary"}
            className="font-semibold"
          >
            Contact Us
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled || location !== "/" ? "text-foreground" : "text-white"} />
          ) : (
            <Menu className={isScrolled || location !== "/" ? "text-foreground" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background border-b border-border"
        >
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => 
              link.name === "Regions" ? (
                <button
                  key={link.name}
                  onClick={() => {
                    scrollToRegions();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-foreground font-medium py-2 text-left"
                >
                  {link.name}
                </button>
              ) : (
                <Link 
                  key={link.name} 
                  href={link.href || "/"} 
                  className="text-foreground font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
            {isStaff ? (
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Admin Portal
                </Button>
              </Link>
            ) : user ? (
              <Button className="w-full gap-2" variant="outline" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                <LogOut className="h-4 w-4" />
                Sign out ({user.fullName.split(" ")[0]})
              </Button>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full gap-2" variant="outline">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
            <Button className="w-full" onClick={() => {
              setIsEnquireModalOpen(true);
              setIsMobileMenuOpen(false);
            }}>Contact Us</Button>
          </div>
        </motion.div>
      )}

      <EnquireModal open={isEnquireModalOpen} onOpenChange={setIsEnquireModalOpen} />
    </motion.nav>
  );
}
