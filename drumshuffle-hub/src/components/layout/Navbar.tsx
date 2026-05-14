"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Drum, ChevronRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Framer motion variants for the mobile menu
const menuVariants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.toggle('dark');
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3 lg:py-4" : "py-5 lg:py-6"
      )}
    >
      <nav
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-out",
          scrolled
            ? "glass-card bg-gradient-to-br from-white/[0.08] to-white/[0.02] !border-white/[0.15] px-4 py-3 sm:px-6"
            : "bg-transparent border border-transparent px-2"
        )}
      >
        {scrolled && (
          <div className="absolute inset-0 rounded-[2rem] pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
        )}
        <div className="flex items-center justify-between h-12 md:h-14 transition-all duration-500">
          {/* Logo Placeholder */}
          <Link href="/" className="flex items-center gap-3 group z-50" id="nav-logo">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center shadow-brand-md border border-white/10 group-hover:shadow-brand-lg transition-all duration-300">
                <Drum className="w-5 h-5 text-white drop-shadow-md" />
              </div>
              <div className="absolute -inset-2 rounded-2xl bg-brand-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <div className="flex flex-col justify-center">
              <span className="font-display font-extrabold text-xl leading-none tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-200 transition-all duration-300">
                Drum<span className="text-brand-500">Shuffle</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-300 font-bold mt-0.5 opacity-80">
                Hub
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group px-4 py-2"
                >
                  <span
                    className={cn(
                      "relative z-10 text-sm font-semibold transition-colors duration-300",
                      isActive ? "text-white" : "text-night-300 group-hover:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                  
                  {/* Hover Background */}
                  <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-300" />

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-xl border border-white/[0.1] bg-white/[0.04]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] rounded-t-full bg-brand-500 shadow-[0_-2px_10px_rgba(255,61,46,0.5)]" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => {
                document.documentElement.classList.toggle('dark');
              }}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.1] transition-colors text-night-300 hover:text-white"
              aria-label="Toggle theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-colors"
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5 text-white" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden absolute top-full left-0 right-0 overflow-hidden bg-night-950/95 backdrop-blur-3xl border-b border-white/[0.08] shadow-2xl"
          >
            <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-5 py-4 rounded-2xl text-base font-semibold transition-all duration-300",
                        isActive
                          ? "bg-gradient-to-r from-brand-500/20 to-transparent text-white border border-brand-500/30 shadow-[inset_4px_0_0_#ff3d2e]"
                          : "text-night-300 hover:bg-white/[0.04] hover:text-white"
                      )}
                    >
                      {link.label}
                      {isActive && <ChevronRight className="w-5 h-5 text-brand-400" />}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div variants={itemVariants} className="pt-6 mt-6 border-t border-white/[0.08] flex justify-center">
                <button
                  onClick={() => {
                    document.documentElement.classList.toggle('dark');
                  }}
                  className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-night-300 hover:text-white flex items-center gap-2 w-full justify-center font-semibold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  Toggle Theme
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
