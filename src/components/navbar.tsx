"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-foreground/5 border-b border-border/50"
            : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`relative font-mono flex items-center gap-[2px] transition-all duration-300 ease-in-out hover:scale-105 group ${scrolled ? "text-lg opacity-90" : "text-xl opacity-100"
              } drop-shadow-[0_0_8px_rgba(34,211,238,0.15)] hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]`}
          >
            <span className="font-medium text-cyan-400 group-hover:brightness-110 transition-all duration-300">&lt;</span>

            <div className="relative flex flex-col items-center mx-[1px]">
              <span className="font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Mostafa
              </span>
              <span className="absolute -bottom-[2px] left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 ease-in-out group-hover:w-full" />
            </div>

            <span className="font-medium text-cyan-400 group-hover:brightness-110 transition-all duration-300">/&gt;</span>

            <span className="font-bold text-cyan-400 animate-[pulse_1s_ease-in-out_infinite] ml-[1px]">|</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium px-4 py-2 rounded-full relative group text-foreground/70 hover:text-foreground transition-colors overflow-hidden"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 bg-foreground/5 dark:bg-foreground/10 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out-expo" />
              </Link>
            ))}

            <div className="w-px h-6 bg-border mx-2" />

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-full bg-transparent hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} className="text-foreground/70 hover:text-brand-primary transition-colors" /> : <Moon size={18} className="text-foreground/70 hover:text-brand-primary transition-colors" />}
              </button>
            )}
          </nav>

          {/* Mobile Menu Button - Hamburger */}
          {!mobileOpen && (
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2.5 rounded-xl text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          )}
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-l border-white/20 dark:border-white/10 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full px-6">
                {/* Close Button Inside Panel */}
                <div className="h-16 flex items-center justify-end">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2.5 rounded-xl text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                <nav className="flex flex-col gap-2 mt-4">
                  {navLinks.map((link, idx) => (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      onClick={() => handleNavClick(link.href)}
                      className="text-left text-2xl font-bold py-4 px-4 rounded-xl text-slate-900 dark:text-white hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
                    >
                      {link.name}
                    </motion.button>
                  ))}
                </nav>

                <div className="mt-auto pb-8">
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="flex items-center gap-3 w-full py-4 px-4 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-foreground/5 transition-colors border border-border/50"
                      aria-label="Toggle theme"
                    >
                      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                      <span className="font-medium">Toggle Theme</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
