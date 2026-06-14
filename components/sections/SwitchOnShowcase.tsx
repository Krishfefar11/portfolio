"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Radio, Layers, Key, LayoutDashboard, Smartphone } from "lucide-react";
import { staggerContainer, fadeInUp, cardReveal } from "@/lib/animations";

const ACCENT = "#6366f1";

const LINKS = {
  dashboard: "https://switchon-dashboard.vercel.app",
  demo:      "https://switchon-demo2.onrender.com",
  github:    "https://github.com/Krishfefar11/Switch-On",
};

const HIGHLIGHTS = [
  {
    icon: Radio,
    title: "Real-time SSE Engine",
    desc: "Flag changes propagate to every connected client in under 50ms via Server-Sent Events — no polling, no page reload, with project-scoped broadcasts and auto-reconnect.",
  },
  {
    icon: Key,
    title: "JavaScript SDK",
    desc: "npm-ready Browser, Node.js, and React builds with useFlagValue() hooks, change listeners, and a waitUntilReady() promise for safe initialization.",
  },
  {
    icon: Layers,
    title: "Multi-Tenant RBAC",
    desc: "Organization → Project → SdkKey hierarchy with admin / developer / viewer roles, email invite onboarding, and 4-layer authentication.",
  },
];

const STATS = [
  { value: "12,692", label: "Lines of Code" },
  { value: "30+",    label: "API Endpoints" },
  { value: "13",     label: "Live Flags" },
  { value: "<50ms",  label: "SSE Latency" },
];

const TECH = [
  "Node.js", "Express", "MongoDB", "React", "Vite", "SSE", "JWT", "Docker",
];

export default function SwitchOnShowcase() {
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
            "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(10,10,20,0) 60%)",
        }}
      >
        <div className="p-8 md:p-12">

          {/* ── Overline ── */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              Project 01
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
                background: "rgba(99,102,241,0.15)",
                color: "#818cf8",
                border: "1px solid rgba(99,102,241,0.25)",
              }}
            >
              Full-Stack · MERN
            </span>
          </div>

          {/* ── Title ── */}
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-3">
            Switch<span style={{ color: ACCENT }}>On</span>
          </h2>
          <p className="text-lg font-medium text-slate-300 mb-4">
            LaunchDarkly-inspired Feature Flag Platform
          </p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mb-10">
            Production-grade, multi-tenant feature flag system that decouples deployment from
            release. Ship any time, enable for 10% of users, roll back instantly by toggling a
            flag — no code, no deploy. Ships with a live e-commerce demo store wired to 13
            active flags.
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
                className="p-5 rounded-2xl glass border border-white/[0.07] hover:border-white/[0.14] transition-all duration-300 group"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
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
          <div className="flex flex-wrap gap-3 items-center">
            <motion.a
              href={LINKS.dashboard}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #818cf8)` }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <LayoutDashboard size={14} />
              Live Dashboard
              <ExternalLink size={12} className="opacity-70" />
            </motion.a>

            <motion.a
              href={LINKS.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #34d399, #059669)" }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Smartphone size={14} />
              VOLT Demo Store
              <ExternalLink size={12} className="opacity-70" />
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

            <span
              className="text-xs font-mono text-slate-600 ml-1"
            >
              admin@demo.com · demo1234
            </span>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
