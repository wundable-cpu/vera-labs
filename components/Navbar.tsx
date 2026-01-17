"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to audit section (the main CTA button on landing page)
  const handleGetStarted = () => {
    if (pathname === "/") {
      // Find the main CTA button or hero section
      const heroSection = document.querySelector('main') || 
                         document.querySelector('[data-section="hero"]');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Fallback: scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // If not on landing page, navigate to landing page using Next.js router
      router.push("/");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg"
          : "bg-slate-900/40 backdrop-blur-md border-b border-slate-800/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-75 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-2xl font-bold text-emerald-400">
                  Vera Labs
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "text-emerald-400"
                  : "text-slate-300 hover:text-emerald-400"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "text-emerald-400"
                  : "text-slate-300 hover:text-emerald-400"
              }`}
            >
              About Us
            </Link>
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 rounded-lg border border-emerald-500/60 bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-shadow"
            >
              {/* Emerald glow effect */}
              <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/30 via-emerald-500/40 to-emerald-400/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-800/50 bg-slate-900/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-medium transition-colors ${
                  pathname === "/dashboard"
                    ? "text-emerald-400"
                    : "text-slate-300 hover:text-emerald-400"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-medium transition-colors ${
                  pathname === "/about"
                    ? "text-emerald-400"
                    : "text-slate-300 hover:text-emerald-400"
                }`}
              >
                About Us
              </Link>
              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full group relative inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/60 bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-shadow"
              >
                {/* Emerald glow effect */}
                <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/30 via-emerald-500/40 to-emerald-400/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

