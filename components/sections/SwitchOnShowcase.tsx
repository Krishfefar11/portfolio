"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Github, Zap, Shield, Users, Database,
  Code2, Smartphone, ChevronDown, ChevronRight,
  Radio, Layers, Key, Bug, CheckCircle2, Terminal,
  LayoutDashboard, Globe, Activity,
} from "lucide-react";
import { staggerContainer, cardReveal, fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";

// ─── Constants ────────────────────────────────────────────────────────────────
const LINKS = {
  dashboard: "https://switchon-dashboard.vercel.app",
  demo: "https://switchon-demo2.onrender.com",
  api: "https://switchon-api2.onrender.com",
  github: "https://github.com/Krishfefar11/Switch-On",
};

const METRICS = [
  { value: "12,692", label: "Lines of Code", icon: Code2, color: "#6366f1" },
  { value: "3",      label: "Live Services",  icon: Globe,  color: "#34d399" },
  { value: "10",     label: "DB Collections", icon: Database, color: "#3b82f6" },
  { value: "4",      label: "Auth Layers",    icon: Shield, color: "#f59e0b" },
];

const TECH_STACK = [
  { name: "Node.js",   color: "#339933" },
  { name: "Express",   color: "#ffffff" },
  { name: "MongoDB",   color: "#47A248" },
  { name: "React",     color: "#61DAFB" },
  { name: "Vite",      color: "#646CFF" },
  { name: "SSE",       color: "#34d399" },
  { name: "JWT",       color: "#f59e0b" },
  { name: "Docker",    color: "#2496ED" },
];

const FEATURES = [
  {
    icon: Radio,
    title: "Real-time SSE Engine",
    badge: "< 50ms",
    badgeColor: "#34d399",
    description:
      "Server-Sent Events push flag changes to every connected client in under 50ms — no polling, no page reload. On connect, a FLAG_SNAPSHOT delivers the full current state in one payload.",
    points: [
      "25-second keep-alive heartbeat prevents proxy timeouts",
      "Auto-reconnect with exponential backoff",
      "X-Accel-Buffering: no disables nginx buffering",
      "Project-scoped broadcast — no cross-tenant data",
    ],
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
  },
  {
    icon: Layers,
    title: "Multi-Tenant Architecture",
    badge: "SaaS-grade",
    badgeColor: "#6366f1",
    description:
      "Full Organization → Project → SdkKey hierarchy. Every flag, audit log, and analytics event is scoped to a projectId — complete tenant isolation from day one.",
    points: [
      "Auto-creates org + project + 3 SDK keys on register",
      "RBAC: admin / developer / viewer roles",
      "Email invite system with token-based onboarding",
      "SDK keys scoped per environment (dev/staging/prod)",
    ],
    color: "#6366f1",
    glow: "rgba(99,102,241,0.15)",
  },
  {
    icon: Zap,
    title: "Flag Evaluation Engine",
    badge: "Deterministic",
    badgeColor: "#f59e0b",
    description:
      "murmurhash(userId + flagName) mod 100 gives a deterministic 0–100 bucket — the same user always gets the same result. Supports targeting rules, gradual rollouts, and multi-variate flags.",
    points: [
      "Targeting rules → rollout % → default value hierarchy",
      "Multi-variate: boolean / string / number / JSON",
      "Reason codes: TARGETING_MATCH, ROLLOUT_PASS, etc.",
      "Batch endpoint evaluates all flags in one DB query",
    ],
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    icon: Smartphone,
    title: "VOLT Demo Store",
    badge: "12 Live Flags",
    badgeColor: "#ec4899",
    description:
      "A fully functional e-commerce store (VOLT) wired directly to the flag system. Toggling a flag in the dashboard instantly mutates the DOM in VOLT — with zero page reload.",
    points: [
      "Hero banner, flash deals, dark mode, search bar & more",
      "7 responsive breakpoints (1280px → 360px)",
      "Bottom-sheet flag widget on mobile",
      "SSE proxy keeps SDK key server-side only",
    ],
    color: "#ec4899",
    glow: "rgba(236,72,153,0.15)",
  },
  {
    icon: Key,
    title: "JavaScript SDK",
    badge: "npm-ready",
    badgeColor: "#22d3ee",
    description:
      "A production-ready SDK mirroring the LaunchDarkly API. Available as Browser (UMD), Node.js (CJS), and React hooks builds — with full TypeScript definitions.",
    points: [
      "useFlagValue() and useFlags() React hooks",
      "Local flag cache — works even if SSE disconnects",
      "client.on('change:flag-name', callback) listeners",
      "waitUntilReady() promise for safe initialization",
    ],
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.15)",
  },
  {
    icon: Shield,
    title: "Production Security",
    badge: "8 layers",
    badgeColor: "#f87171",
    description:
      "This isn't tutorial-grade auth. JWT access tokens (15-min TTL) + refresh rotation in HttpOnly Secure cookies, plus six additional layers of hardening.",
    points: [
      "Helmet.js: 11 security headers (CSP, HSTS, etc.)",
      "express-rate-limit: 10 req/15min on auth endpoints",
      "express-mongo-sanitize: prevents NoSQL injection",
      "bcryptjs cost factor 12 + HMAC-SHA256 webhooks",
    ],
    color: "#f87171",
    glow: "rgba(248,113,113,0.15)",
  },
];

const BUGS = [
  {
    title: "Cross-Tenant SSE Data Leak",
    severity: "Security",
    severityColor: "#f87171",
    problem:
      "JWT-authenticated users had req.projectId=null, causing the SSE endpoint to skip the projectId filter and stream ALL flags from every organization to every user.",
    fix: "const projectId = req.projectId ?? req.query.projectId ?? null",
    fixLabel: "sseRoutes.js · backend fix",
    result: "Each SSE client now only receives events for their own project.",
  },
  {
    title: "SDK Key Project Scope Bypass",
    severity: "Security",
    severityColor: "#f87171",
    problem:
      "The demo proxy used a legacy env-var API key that matched a fallback branch in consumerAuth — calling next() without setting req.projectId, leaking cross-project data.",
    fix: "Replaced legacy key with real DB-stored SdkKey — consumerAuth finds it, sets req.projectId.",
    fixLabel: "consumerAuth.js · scoping fix",
    result: "All evaluate/SSE endpoints correctly scoped to the demo project.",
  },
  {
    title: "Flag Widget Hidden on Mobile",
    severity: "UX",
    severityColor: "#f59e0b",
    problem:
      "@media (max-width:480px) { .flag-widget { display:none } } — completely hiding the primary demo feature on mobile, exactly where recruiters open demo links from their phone.",
    fix: "Replaced hide rule with bottom-sheet: left:0; right:0; bottom:0; border-radius:12px 12px 0 0",
    fixLabel: "demo-store.css · mobile UX fix",
    result: "Widget now slides up from the bottom on mobile — fully accessible.",
  },
  {
    title: "Docker Image Missing Static Files",
    severity: "DevOps",
    severityColor: "#3b82f6",
    problem:
      "Render Root Directory was set to feature-flag-demo/proxy. Dockerfile only COPY'd proxy/ — but server.js used path.join(__dirname, '../public') which resolved to empty /public inside the container.",
    fix: "New Dockerfile at feature-flag-demo/ (one level up) — COPYs both proxy/ and public/.",
    fixLabel: "Dockerfile · multi-stage fix",
    result: "Server correctly serves static files from /app/public in production.",
  },
];

const NUMBERS = [
  { value: "12,692", label: "Lines of Code" },
  { value: "30+",   label: "API Endpoints" },
  { value: "10",    label: "DB Collections" },
  { value: "<50ms", label: "SSE Latency" },
  { value: "13",    label: "Demo Flags" },
  { value: "7",     label: "Breakpoints" },
  { value: "38",    label: "API Source Files" },
  { value: "4",     label: "Auth Layers" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" }}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
      </span>
      LIVE
    </span>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="relative p-6 rounded-2xl glass border border-white/[0.07] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)" }} />

      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-8 text-center">
        System Architecture
      </p>

      {/* 3-service diagram */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">

        {/* Dashboard */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="px-5 py-4 rounded-xl text-center min-w-[140px]"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)" }}
            whileHover={{ scale: 1.04 }}
          >
            <LayoutDashboard size={20} className="mx-auto mb-2" style={{ color: "#818cf8" }} />
            <p className="text-xs font-bold text-white">Dashboard UI</p>
            <p className="text-[10px] text-slate-500 mt-0.5">React + Vite</p>
            <p className="text-[10px] mt-1" style={{ color: "#818cf8" }}>Vercel</p>
          </motion.div>
        </div>

        {/* Arrow + SSE label */}
        <div className="flex flex-col items-center gap-1 md:mx-4">
          <div className="hidden md:flex items-center gap-1">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.6), rgba(52,211,153,0.6))" }} />
            <ChevronRight size={12} className="text-emerald-400 -ml-1" />
          </div>
          <span className="text-[10px] font-mono text-emerald-400 whitespace-nowrap">REST + SSE</span>
          <div className="hidden md:flex items-center gap-1 rotate-180">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.6), rgba(52,211,153,0.6))" }} />
            <ChevronRight size={12} className="text-indigo-400 -ml-1" />
          </div>
        </div>

        {/* API — center hub */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="px-5 py-4 rounded-xl text-center min-w-[150px] relative"
            style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.35)" }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(52,211,153,0.2)", color: "#34d399" }}>HUB</span>
            </div>
            <Activity size={20} className="mx-auto mb-2 text-emerald-400" />
            <p className="text-xs font-bold text-white">REST API</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Node.js + Express</p>
            <p className="text-[10px] mt-1 text-emerald-400">Render (Docker)</p>
          </motion.div>

          {/* Arrow to DB */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-px h-6" style={{ background: "linear-gradient(180deg, rgba(59,130,246,0.8), rgba(59,130,246,0.3))" }} />
            <ChevronDown size={12} className="text-blue-400" />
          </div>

          {/* MongoDB */}
          <motion.div
            className="px-5 py-3 rounded-xl text-center min-w-[140px]"
            style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)" }}
            whileHover={{ scale: 1.04 }}
          >
            <Database size={16} className="mx-auto mb-1.5 text-blue-400" />
            <p className="text-xs font-bold text-white">MongoDB Atlas</p>
            <p className="text-[10px] text-slate-500">10 Collections</p>
          </motion.div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1 md:mx-4">
          <div className="hidden md:flex items-center gap-1">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, rgba(52,211,153,0.6), rgba(236,72,153,0.6))" }} />
            <ChevronRight size={12} className="text-pink-400 -ml-1" />
          </div>
          <span className="text-[10px] font-mono text-pink-400 whitespace-nowrap">REST + SSE</span>
          <div className="hidden md:flex items-center gap-1 rotate-180">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, rgba(52,211,153,0.6), rgba(236,72,153,0.6))" }} />
            <ChevronRight size={12} className="text-emerald-400 -ml-1" />
          </div>
        </div>

        {/* Demo Store */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="px-5 py-4 rounded-xl text-center min-w-[140px]"
            style={{ background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.25)" }}
            whileHover={{ scale: 1.04 }}
          >
            <Smartphone size={20} className="mx-auto mb-2" style={{ color: "#f472b6" }} />
            <p className="text-xs font-bold text-white">VOLT Demo Store</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Vanilla JS + Proxy</p>
            <p className="text-[10px] mt-1" style={{ color: "#f472b6" }}>Render (Docker)</p>
          </motion.div>
        </div>
      </div>

      {/* SDK note */}
      <div className="mt-8 flex justify-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs"
          style={{ background: "rgba(34,211,238,0.07)", border: "1px solid rgba(34,211,238,0.2)", color: "#22d3ee" }}>
          <Key size={11} />
          switchon-js-sdk — Browser / Node.js / React builds · npm-ready
        </span>
      </div>
    </div>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.07]">
      {/* Window bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          <span className="ml-2 text-xs text-slate-500 font-mono">{label}</span>
        </div>
        <motion.button
          onClick={handleCopy}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5"
          whileTap={{ scale: 0.95 }}
        >
          {copied ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Terminal size={12} />}
          {copied ? "Copied!" : "Copy"}
        </motion.button>
      </div>
      <pre className="p-5 text-xs leading-relaxed overflow-x-auto bg-black/30 font-mono text-slate-300">
        {code}
      </pre>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SwitchOnShowcase() {
  const [expandedBug, setExpandedBug] = useState<number | null>(null);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
      className="relative"
    >
      {/* ── HERO HEADER ──────────────────────────────────────────────────── */}
      <motion.div
        variants={fadeInUp}
        className="relative rounded-3xl overflow-hidden border border-white/[0.08] mb-6"
        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(52,211,153,0.05) 50%, rgba(59,130,246,0.08) 100%)" }}
      >
        {/* Corner glow */}
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle at 100% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle at 0% 100%, rgba(52,211,153,0.1) 0%, transparent 60%)" }} />

        <div className="relative z-10 p-8 md:p-12">
          {/* Top row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-slate-500">
              Featured Project
            </span>
            <LiveBadge />
            <span className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
              Full-Stack · MERN
            </span>
          </div>

          {/* Title */}
          <div className="mb-4">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-3"
              style={{ textShadow: "0 0 60px rgba(99,102,241,0.3)" }}>
              Switch<span style={{ color: "#6366f1" }}>On</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 font-medium">
              A LaunchDarkly-inspired feature flag management platform
            </p>
            <p className="text-slate-500 text-sm mt-2 max-w-2xl leading-relaxed">
              Production-grade · Multi-tenant · Real-time · 12,692 lines of code across 4 services
            </p>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {METRICS.map((m) => (
              <div key={m.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: `${m.color}10`, border: `1px solid ${m.color}25` }}>
                <m.icon size={16} style={{ color: m.color }} className="flex-shrink-0" />
                <div>
                  <p className="text-lg font-black text-white leading-none">{m.value}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{m.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <motion.a
              href={LINKS.dashboard}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white relative overflow-hidden group"
              style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)" }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
              <LayoutDashboard size={15} />
              <span className="relative">Live Dashboard</span>
              <ExternalLink size={12} className="relative opacity-70" />
            </motion.a>

            <motion.a
              href={LINKS.demo}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white relative overflow-hidden group"
              style={{ background: "linear-gradient(135deg, #34d399, #059669)" }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
              <Smartphone size={15} />
              <span className="relative">VOLT Demo Store</span>
              <ExternalLink size={12} className="relative opacity-70" />
            </motion.a>

            <motion.a
              href={LINKS.github}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white glass border border-white/[0.1] hover:border-white/[0.2] transition-all"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={15} />
              GitHub Repo
            </motion.a>
          </div>

          {/* Demo credentials */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-slate-500">Demo login:</span>
            <span className="text-emerald-400">admin@demo.com</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400">demo1234</span>
          </div>
        </div>
      </motion.div>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-6">
        {TECH_STACK.map((t) => (
          <span key={t.name}
            className="px-3 py-1.5 rounded-xl glass border border-white/[0.07] text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-default flex items-center gap-2"
            style={{ boxShadow: `0 0 0 0 ${t.color}00` }}
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
            {t.name}
          </span>
        ))}
      </motion.div>

      {/* ── PROBLEM / SOLUTION ───────────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-6 rounded-2xl glass border border-white/[0.07] border-l-2"
          style={{ borderLeftColor: "#f87171" }}>
          <p className="text-xs font-mono text-red-400 uppercase tracking-widest mb-3">The Problem</p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Shipping a new feature to production is risky. You can&apos;t test at scale in staging. Rolling back means a hotfix deploy. A/B testing requires separate builds. Teams are stuck in a &ldquo;big bang&rdquo; release cycle.
          </p>
        </div>
        <div className="p-6 rounded-2xl glass border border-white/[0.07] border-l-2"
          style={{ borderLeftColor: "#34d399" }}>
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">The Solution</p>
          <p className="text-slate-300 text-sm leading-relaxed">
            SwitchOn decouples deployment from release. Ship any time, enable for 10% of users, watch real-time analytics, roll back instantly by flipping a toggle — no code, no deploy, no risk.
          </p>
        </div>
      </motion.div>

      {/* ── ARCHITECTURE DIAGRAM ─────────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="mb-6">
        <ArchitectureDiagram />
      </motion.div>

      {/* ── FEATURE CARDS ────────────────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="mb-6">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-5 flex items-center gap-2">
          <span className="w-4 h-px bg-slate-700" />
          Key Engineering Features
          <span className="flex-1 h-px bg-slate-700/50" />
        </p>
        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              variants={cardReveal}
              className="group p-5 rounded-2xl glass border border-white/[0.07] hover:border-white/[0.14] transition-all duration-300 relative overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 0%, ${f.glow} 0%, transparent 65%)` }} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${f.color}18` }}>
                    <f.icon size={18} style={{ color: f.color }} />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full font-mono"
                    style={{ background: `${f.badgeColor}15`, color: f.badgeColor, border: `1px solid ${f.badgeColor}30` }}>
                    {f.badge}
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm mb-2">{f.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">{f.description}</p>

                <ul className="flex flex-col gap-1.5">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-xs text-slate-500">
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: f.color }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── ENGINEERING HIGHLIGHTS (Bug Fixes) ───────────────────────────── */}
      <motion.div variants={fadeInUp} className="mb-6">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-5 flex items-center gap-2">
          <span className="w-4 h-px bg-slate-700" />
          Engineering Challenges Solved
          <span className="flex-1 h-px bg-slate-700/50" />
          <span className="text-[10px] text-slate-600 normal-case font-sans">Interview gold — real bugs found and fixed in production</span>
        </p>

        <div className="flex flex-col gap-3">
          {BUGS.map((bug, i) => (
            <motion.div
              key={bug.title}
              variants={cardReveal}
              className="rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.12] transition-all duration-300"
            >
              {/* Collapsed header */}
              <button
                onClick={() => setExpandedBug(expandedBug === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 glass text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${bug.severityColor}15` }}>
                    <Bug size={14} style={{ color: bug.severityColor }} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {bug.title}
                    </span>
                    <span className="ml-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `${bug.severityColor}15`, color: bug.severityColor }}>
                      {bug.severity}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedBug === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown size={16} className="text-slate-500" />
                </motion.div>
              </button>

              {/* Expanded body */}
              <AnimatePresence>
                {expandedBug === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-white/[0.05]">
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-[10px] font-mono text-red-400/70 uppercase tracking-wider mb-2">Problem</p>
                          <p className="text-slate-400 text-xs leading-relaxed">{bug.problem}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-wider mb-2">Fix</p>
                          <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06] mb-2">
                            <code className="text-xs text-emerald-300 font-mono">{bug.fix}</code>
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono">{bug.fixLabel}</p>
                          <div className="flex items-center gap-1.5 mt-3">
                            <CheckCircle2 size={12} className="text-emerald-400" />
                            <p className="text-xs text-slate-400">{bug.result}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── CODE SNIPPET ─────────────────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-4 h-px bg-slate-700" />
            SSE Scoping Fix
          </p>
          <CodeBlock
            label="sseRoutes.js — security patch"
            code={`// ❌ BEFORE: req.projectId = null for JWT users
//    → skipped filter → leaked ALL org flags
const projectId = req.projectId;

// ✅ AFTER: fallback chain prevents null scope
const projectId =
  req.projectId        // SDK key auth (set by middleware)
  ?? req.query.projectId  // JWT dashboard auth
  ?? null;             // explicit null = no data

// Frontend also patched:
// new EventSource(\`/sse/flags?projectId=\${user.project.id}\`)`}
          />
        </div>
        <div>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-4 h-px bg-slate-700" />
            SDK Usage
          </p>
          <CodeBlock
            label="switchon-js-sdk — client integration"
            code={`// Browser / Node.js
const client = SwitchOn.initialize(
  'sdk-dev-xxxx',
  { userId: 'user_123', environment: 'development' }
);

await client.waitUntilReady();
const isOn = client.variation('feature-hero-banner', false);

// React hooks
const { value } = useFlagValue('feature-hero-banner', false);

// Change listeners
client.on('change:feature-hero-banner', (newVal) => {
  console.log('Flag changed:', newVal);
});`}
          />
        </div>
      </motion.div>

      {/* ── NUMBERS ROW ──────────────────────────────────────────────────── */}
      <motion.div
        variants={fadeInUp}
        className="p-6 rounded-2xl glass border border-white/[0.07] overflow-hidden relative"
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-5 text-center">By the Numbers</p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {NUMBERS.map((n, i) => (
            <div key={n.label} className={`text-center ${i < 7 ? "md:border-r md:border-white/[0.05]" : ""}`}>
              <p className="text-xl md:text-2xl font-black" style={{
                background: "linear-gradient(135deg, #818cf8, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {n.value}
              </p>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight">{n.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
