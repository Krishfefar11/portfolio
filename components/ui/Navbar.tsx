"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PERSONAL } from "@/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrollProgress";
import { navReveal, mobileMenuReveal, staggerFast, fadeInRight } from "@/lib/animations";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(60);
  const activeSection = useActiveSection(
    NAV_LINKS.map((l) => l.href.slice(1)),
    80
  );

  return (
    <>
      <motion.header
        variants={navReveal}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-white/[0.06] py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "py-5 bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* ── Logo ── */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #34d399, #3b82f6)",
                boxShadow: "0 0 20px rgba(52,211,153,0.3)",
              }}
            >
              {PERSONAL.initials}
            </span>
            <span className="hidden sm:block font-bold text-white tracking-tight">
              {PERSONAL.name}
            </span>
          </motion.a>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-emerald-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navActiveIndicator"
                      className="absolute inset-0 rounded-lg bg-emerald-400/8 border border-emerald-400/15"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navActiveDot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400"
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* ── CTA + Mobile Toggle ── */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden relative group"
              style={{
                background: "linear-gradient(135deg, #34d399, #3b82f6)",
              }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative">Hire Me</span>
            </motion.a>

            {/* Mobile menu toggle */}
            <motion.button
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg glass text-slate-300 hover:text-white transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              variants={mobileMenuReveal}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden"
            >
              <motion.div
                variants={staggerFast}
                className="glass border-t border-white/[0.06] px-6 py-5 flex flex-col gap-1"
              >
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      variants={fadeInRight}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                        isActive
                          ? "text-emerald-400 bg-emerald-400/8"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      )}
                      {link.label}
                    </motion.a>
                  );
                })}
                <div className="pt-2 border-t border-white/[0.06]">
                  <motion.a
                    href="#contact"
                    variants={fadeInRight}
                    className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold text-white"
                    style={{
                      background: "linear-gradient(135deg, #34d399, #3b82f6)",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Hire Me
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
