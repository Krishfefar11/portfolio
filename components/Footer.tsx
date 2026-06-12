"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import { PERSONAL, NAV_LINKS, SOCIAL_LINKS } from "@/constants";

const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, mail: Mail };

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.05] bg-surface/50 overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(52,211,153,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#hero" className="inline-flex items-center gap-2 mb-4 group">
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white"
                style={{
                  background: "linear-gradient(135deg, #34d399, #3b82f6)",
                  boxShadow: "0 0 20px rgba(52,211,153,0.25)",
                }}
              >
                {PERSONAL.initials}
              </span>
              <span className="font-bold text-white text-lg">{PERSONAL.name}</span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Full Stack Developer specializing in the MERN stack. Building scalable web
              applications that make a real-world impact.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2 mt-5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS];
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl glass border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-400/30 transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {Icon && <Icon size={15} />}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigation</h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-emerald-400 transition-colors text-sm animated-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Email", href: `mailto:${PERSONAL.email}`, text: PERSONAL.email },
                {
                  label: "GitHub",
                  href: `https://github.com/${PERSONAL.github}`,
                  text: `@${PERSONAL.github}`,
                },
                {
                  label: "LinkedIn",
                  href: `https://linkedin.com/in/${PERSONAL.linkedin}`,
                  text: `in/${PERSONAL.linkedin}`,
                },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.label !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-emerald-400 transition-colors text-sm animated-underline truncate block"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            © {new Date().getFullYear()} {PERSONAL.name}. Built with
            <Heart size={11} className="text-emerald-400 fill-emerald-400" />
            using Next.js & Framer Motion.
          </p>

          <motion.button
            onClick={scrollToTop}
            className="group w-9 h-9 rounded-xl glass border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-400/30 transition-all duration-200"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
