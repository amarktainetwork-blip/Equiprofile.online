import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/_core/hooks/useAuth";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Features", path: "/features" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
];

/**
 * Marketing navigation component for public pages
 *
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Sticky header with background change on scroll
 * - Login/Register buttons
 * - Logo on the left
 */
export function MarketingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();

  // Handle scroll for sticky header effect
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 10);
    });
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="text-2xl font-bold font-serif">
                <span className={`${isScrolled ? "text-gradient" : "text-white"}`}>
                  EquiProfile
                </span>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  className={`text-sm font-medium transition-colors ${
                    isScrolled
                      ? location === link.path
                        ? "text-black hover:text-gray-700"
                        : "text-gray-700 hover:text-black"
                      : location === link.path
                        ? "text-white hover:text-white/90"
                        : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button className={isScrolled ? "" : "bg-white/10 text-white border-white/20 hover:bg-white/20"}>
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button 
                    variant="ghost"
                    className={isScrolled ? "" : "text-white hover:bg-white/10 hover:text-white"}
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className={isScrolled ? "" : "bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white border-0"}>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 hover:bg-accent rounded-lg transition-colors ${
              isScrolled ? "text-black" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            {...({
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              transition: { duration: 0.2 },
            } as any)}
            className="md:hidden border-t bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <a
                    className={`block py-2 text-base font-medium transition-colors ${
                      location === link.path
                        ? "text-foreground hover:text-foreground/90"
                        : "text-foreground/90 hover:text-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}

              <div className="pt-4 border-t flex flex-col gap-2">
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        className="w-full"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default MarketingNav;
