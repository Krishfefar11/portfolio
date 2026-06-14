"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, CreditCard, Shield, Wifi } from "lucide-react";
import { staggerContainer, fadeInUp, cardReveal } from "@/lib/animations";

const ACCENT = "#1AB64F";

const LINKS = {
  live:   "https://urban-company-clone-taupe.vercel.app",
  api:    "https://urban-company-clone.onrender.com",
  github: "https://github.com/Krishfefar11/urban-company-clone",
};

const HIGHLIGHTS = [
  {
    icon: CreditCard,
    title: "Razorpay Payment Flow",
    desc: "Order creation, HMAC-SHA256 signature verification, webhook processing, and real-time booking status updates via Socket.io rooms — end-to-end payment lifecycle handled.",
  },
  {
    icon: Shield,
    title: "Firebase Auth Stack",
    desc: "Google OAuth, email/password, and phone OTP — three auth methods unified through a Firebase-to-JWT adapter that plugs into the Express RBAC middleware seamlessly.",
  },
  {
    icon: Wifi,
    title: "Real-time Booking Updates",
    desc: "Socket.io room-based architecture keeps customers and professionals in sync on booking status changes — no polling, instant propagation across all connected sessions.",
  },
];

const STATS = [
  { value: "30+",  label: "Pages" },
  { value: "25+",  label: "API Endpoints" },
  { value: "8",    label: "MongoDB Models" },
  { value: "3",    label: "Auth Methods" },
];

const TECH = [
  "React 19", "Vite", "React Router v7", "Tailwind CSS",
  "Node.js", "Express", "MongoDB", "Firebase Auth",
  "Razorpay", "Socket.io", "TanStack Query",
];

export default function UrbanCloneShowcase() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <motion.div
        variants={fadeInUp}
        className="rounded-3xl overflow-hidden border border-white/[0.08]"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,182,79,0.08) 0%, rgba(10,10,20,0) 60%)",
        }}
      >
        <div className="p-8 md:p-12">

          {/* ── Overline ── */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              Project 05
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(52,211,153,0.12)",
                color: "#34d399",
                border: "1px solid rgba(52,211,153,0.25)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                background: "rgba(26,182,79,0.15)",
                color: "#4ade80",
                border: "1px solid rgba(26,182,79,0.25)",
              }}
            >
              Full-Stack · Marketplace
            </span>
          </div>

          {/* ── Title ── */}
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-3">
            Urban<span style={{ color: ACCENT }}>Clone</span>
          </h2>
          <p className="text-lg font-medium text-slate-300 mb-4">
            Home Services Marketplace — Urban Company Clone
          </p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mb-10">
            Full-stack home services marketplace with Customer, Professional, and Admin portals.
            Features Razorpay payments, Socket.io real-time booking updates, Firebase
            authentication with three methods, and PWA offline support — 30+ pages and 25+
            API endpoints across a three-role RBAC system.
          </p>

          {/* ── Highlights ── */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-4 mb-10"
          >
            {HIGHLIGHTS.map((h) => (
              <motion.div
                key={h.title}
                variants={cardReveal}
                className="p-5 rounded-2xl glass border border-white/[0.07] hover:border-white/[0.14] transition-all duration-300"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${ACCENT}18` }}
                >
                  <h.icon size={18} style={{ color: ACCENT }} />
                </div>
                <h4 className="font-semibold text-white text-sm mb-2">{h.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Stats ── */}
          <div className="flex flex-wrap gap-10 mb-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  className="text-2xl font-black"
                  style={{
                    background: `linear-gradient(135deg, #fff 0%, ${ACCENT} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── Tech stack ── */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TECH.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-lg glass border border-white/[0.07] text-xs text-slate-300 hover:text-white hover:border-white/[0.15] transition-all cursor-default"
              >
                {t}
              </span>
            ))}
          </div>

          {/* ── CTAs ── */}
          <div className="flex flex-wrap gap-3">
            <motion.a
              href={LINKS.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: `linear-gradient(135deg, #16a34a, ${ACCENT})` }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Live Demo
              <ExternalLink size={13} className="opacity-70" />
            </motion.a>

            <motion.a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 glass border border-white/[0.1] hover:text-white hover:border-white/[0.2] transition-all"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={15} />
              GitHub
            </motion.a>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
