"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Github, ChevronDown, ChevronRight,
  CheckCircle2, Terminal, Zap, Globe, Server,
  Database, Brain, MessageSquare, FileText,
  Download, Upload, Smartphone, Map, DollarSign,
  Cloud, UtensilsCrossed, Gem, Wind, Package,
  Bookmark, ArrowRight,
} from "lucide-react";
import { staggerContainer, cardReveal, fadeInUp } from "@/lib/animations";

// ─── Constants ────────────────────────────────────────────────────────────────
const LINKS = {
  live:    "https://tripgenie-psi.vercel.app",
  github:  "https://github.com/Krishfefar11/TripGenie",
  backend: "https://tripgenie-k0hi.onrender.com",
};

const METRICS = [
  { value: "< 8s",  label: "Itinerary Generation",  icon: Zap,      color: "#6366f1" },
  { value: "384",   label: "Embedding Dimensions",   icon: Brain,    color: "#8b5cf6" },
  { value: "Top-5", label: "RAG Chunk Retrieval",    icon: Database, color: "#a78bfa" },
  { value: "15+",   label: "Itinerary Features",     icon: Map,      color: "#7c3aed" },
];

const TECH_STACK = [
  { name: "React 18",               layer: "Frontend",  color: "#61DAFB", why: "Fast HMR in dev, optimised production bundle" },
  { name: "Vite",                   layer: "Frontend",  color: "#646CFF", why: "Sub-second HMR, ESM-first bundler" },
  { name: "Tailwind CSS",           layer: "Styling",   color: "#38BDF8", why: "Utility-first — no context switching" },
  { name: "Framer Motion",          layer: "Styling",   color: "#FF0055", why: "Smooth animations without heavy libraries" },
  { name: "React Router v6",        layer: "Routing",   color: "#CA4245", why: "Industry-standard SPA routing" },
  { name: "Axios",                  layer: "HTTP",      color: "#5A29E4", why: "Interceptors, timeout config, prod-ready" },
  { name: "Node.js + Express",      layer: "Backend",   color: "#339933", why: "Non-blocking I/O ideal for LLM workloads" },
  { name: "MongoDB + Mongoose",     layer: "Database",  color: "#47A248", why: "Mixed schema for semi-structured LLM JSON" },
  { name: "@xenova/transformers",   layer: "AI/ML",     color: "#F5A623", why: "Runs all-MiniLM-L6-v2 in Node — no Python" },
  { name: "all-MiniLM-L6-v2",      layer: "AI/ML",     color: "#8B5CF6", why: "384-dim vectors, fast, accurate for semantic search" },
  { name: "Groq API (llama-3.3-70b)", layer: "LLM",    color: "#6366f1", why: "8× faster than OpenAI, effectively free at portfolio scale" },
  { name: "pdf-parse",              layer: "Parsing",   color: "#EF4444", why: "Pure JS, no native deps — works on Render free tier" },
  { name: "Multer",                 layer: "Uploads",   color: "#F59E0B", why: "Stream-based multipart handler built for Express" },
  { name: "Vercel",                 layer: "Deploy",    color: "#ffffff", why: "Zero-config CDN, auto HTTPS" },
  { name: "Render",                 layer: "Deploy",    color: "#46E3B7", why: "Free web services with GitHub auto-deploys" },
  { name: "MongoDB Atlas M0",       layer: "DB Host",   color: "#47A248", why: "Free 512MB cloud cluster, no ops overhead" },
];

const FEATURES = [
  { icon: Map,           label: "Day-by-Day Itinerary",   desc: "Morning / afternoon / evening schedule for 1–30 days, grounded in real uploaded docs" },
  { icon: DollarSign,    label: "Budget Breakdown",        desc: "Accommodation 35% · Food 25% · Activities 20% · Transport 10% · Misc 10%" },
  { icon: UtensilsCrossed, label: "Local Food Picks",      desc: "Dish descriptions and restaurant recommendations per destination" },
  { icon: Gem,           label: "Hidden Gems",             desc: "Less-crowded places and off-the-beaten-path discoveries" },
  { icon: Wind,          label: "Weather Info",            desc: "Per-destination weather conditions and what to expect" },
  { icon: Package,       label: "Smart Packing List",      desc: "Tailored to destination, duration, and trip type" },
  { icon: FileText,      label: "RAG-Powered Travel Tips", desc: "Tips extracted from real uploaded travel guides — not hallucinated" },
  { icon: MessageSquare, label: "AI Chat Assistant",       desc: "Ask follow-up questions about your trip with full session context" },
  { icon: Bookmark,      label: "Save Trips",              desc: "Persist itineraries to MongoDB — accessible across sessions" },
  { icon: Download,      label: "Download as PDF",         desc: "Print-to-PDF the full itinerary via window.print()" },
  { icon: Upload,        label: "Upload Travel Guides",    desc: "Add custom PDFs or TXT files to enhance the RAG knowledge base" },
  { icon: Smartphone,    label: "Fully Responsive",        desc: "Works on mobile, tablet, and desktop — Framer Motion AnimatePresence" },
  { icon: Brain,         label: "LLM Cascade",             desc: "Groq API → Local Ollama → Mock fallback — always returns structured output" },
  { icon: Globe,         label: "No Login Required",       desc: "UUID v4 sessionId groups chat history — stateless by design" },
  { icon: Cloud,         label: "Live 24/7",               desc: "Vercel + Render + MongoDB Atlas — runs without any local machine" },
];

const ARCH_DECISIONS = [
  {
    decision: "MongoDB over PostgreSQL",
    color: "#47A248",
    reasoning: "Travel itineraries are semi-structured JSON blobs that vary per destination. PostgreSQL would require complex JSONB columns or separate tables. MongoDB's Mixed schema type stores the entire LLM output natively — no migration needed when the JSON shape changes.",
    tradeoff: "No relational integrity — acceptable for a stateless planner where each trip is self-contained.",
  },
  {
    decision: "@xenova/transformers over Python",
    color: "#F5A623",
    reasoning: "Running all-MiniLM-L6-v2 in the same Node.js process eliminates a Python microservice entirely. No inter-process HTTP calls, no cold start latency on a separate service, no extra Render slot — the embedding model loads once as a Node.js singleton.",
    tradeoff: "Slightly heavier Node process. Acceptable: Render free tier has 512MB RAM, model is ~25MB quantised.",
  },
  {
    decision: "Groq over OpenAI",
    color: "#6366f1",
    reasoning: "Groq's free tier runs llama-3.3-70b-versatile at 8× the token throughput of OpenAI's free tier. For a portfolio project it's effectively unlimited. The model quality is comparable for structured JSON output with tight prompt constraints.",
    tradeoff: "Groq can have rate-limit spikes under heavy load. Mitigated by the mock fallback in the LLM cascade.",
  },
  {
    decision: "Brute-force cosine over HNSW / Pinecone",
    color: "#8B5CF6",
    reasoning: "With under 10,000 vectors (typical for uploaded travel guides), brute-force O(n) cosine search in memory runs in <50ms. HNSW or Pinecone would add infra cost, API keys, and cold start complexity for zero measurable gain at this vector count.",
    tradeoff: "Does not scale past ~100k vectors. Pinecone migration path is a single service swap.",
  },
  {
    decision: "UUID sessionId over JWT auth",
    color: "#A78BFA",
    reasoning: "TripGenie is stateless by design — users don't need accounts or personalization. UUID v4 generated client-side groups chat messages per browser session without any auth overhead, server-side session storage, or token refresh logic.",
    tradeoff: "No cross-device persistence. Deliberate: travel planning is a session activity.",
  },
  {
    decision: "250-word chunks with 50-word overlap",
    color: "#EC4899",
    reasoning: "250 words carries enough semantic context for a meaningful embedding without diluting the signal across too large a window. 50-word overlap prevents chunk boundaries from splitting mid-sentence, ensuring the retrieval step always finds the coherent passage around any query match.",
    tradeoff: "Higher storage per document vs. larger chunks. Storage is MongoDB Atlas M0 free — non-issue.",
  },
];

const NUMBERS = [
  { value: "< 8s",   label: "End-to-end generation" },
  { value: "384",    label: "Vector dimensions" },
  { value: "Top-5",  label: "Chunks retrieved" },
  { value: "250",    label: "Words per chunk" },
  { value: "50",     label: "Overlap words" },
  { value: "15+",    label: "Itinerary sections" },
  { value: "3",      label: "LLM fallback layers" },
  { value: "6–8w",   label: "Time to build" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" }}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-400" />
      </span>
      LIVE 24/7
    </span>
  );
}

function RagPipelineDiagram() {
  const ingestionSteps = [
    { label: "Upload PDF / TXT",     sub: "via Multer",                     color: "#6366f1" },
    { label: "pdf-parse",            sub: "Extract full text",              color: "#8b5cf6" },
    { label: "textSplitter.js",      sub: "250-word chunks, 50w overlap",   color: "#a78bfa" },
    { label: "all-MiniLM-L6-v2",     sub: "@xenova/transformers",           color: "#7c3aed" },
    { label: "MongoDB Embeddings",   sub: "{chunkText, vector[384]}",       color: "#6366f1" },
  ];

  const retrievalSteps = [
    { label: "User Form Input",      sub: "Destination, budget, interests", color: "#6366f1" },
    { label: "Embed Query",          sub: "same all-MiniLM-L6-v2 model",    color: "#8b5cf6" },
    { label: "Cosine Similarity",    sub: "Top-5 chunks retrieved",         color: "#a78bfa" },
    { label: "Prompt Augmentation",  sub: "CLIP 1...5 injected as context", color: "#7c3aed" },
    { label: "Groq LLM",            sub: "llama-3.3-70b-versatile",        color: "#6366f1" },
    { label: "JSON Itinerary",       sub: "Parsed & returned to frontend",  color: "#4f46e5" },
  ];

  return (
    <div className="p-6 rounded-2xl glass border border-white/[0.07] overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 60%)" }} />
      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-8 text-center">
        Two-Stage RAG Pipeline
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Offline Ingestion */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <span className="px-3 py-1 rounded-lg text-xs font-bold"
              style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" }}>
              STAGE 1 — OFFLINE INGESTION
            </span>
          </div>
          <div className="flex flex-col gap-0">
            {ingestionSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-start">
                <motion.div
                  className="w-full flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: `${step.color}10`, border: `1px solid ${step.color}20` }}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ background: step.color, color: "#fff" }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{step.label}</p>
                    <p className="text-[10px] text-slate-500">{step.sub}</p>
                  </div>
                </motion.div>
                {i < ingestionSteps.length - 1 && (
                  <div className="ml-[1.15rem] flex flex-col items-center py-0.5">
                    <div className="w-px h-3" style={{ background: `${step.color}50` }} />
                    <ChevronRight size={9} className="rotate-90" style={{ color: step.color }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Online Retrieval */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <span className="px-3 py-1 rounded-lg text-xs font-bold"
              style={{ background: "rgba(139,92,246,0.2)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}>
              STAGE 2 — ONLINE RETRIEVAL
            </span>
          </div>
          <div className="flex flex-col gap-0">
            {retrievalSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-start">
                <motion.div
                  className="w-full flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: `${step.color}10`, border: `1px solid ${step.color}20` }}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ background: step.color, color: "#fff" }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{step.label}</p>
                    <p className="text-[10px] text-slate-500">{step.sub}</p>
                  </div>
                </motion.div>
                {i < retrievalSteps.length - 1 && (
                  <div className="ml-[1.15rem] flex flex-col items-center py-0.5">
                    <div className="w-px h-3" style={{ background: `${step.color}50` }} />
                    <ChevronRight size={9} className="rotate-90" style={{ color: step.color }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cosine similarity formula */}
      <div className="mt-8 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider mb-1">Cosine Similarity Formula</p>
            <p className="text-sm font-mono text-white">sim(A,B) = (A·B) / (‖A‖ × ‖B‖)</p>
            <p className="text-[10px] text-slate-500 mt-1">Vectors are L2-normalised → sim = A·B directly (dot product only)</p>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">LLM Cascade (in order)</p>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <span style={{ color: "#6366f1" }}>Groq API</span>
              <ArrowRight size={10} className="text-slate-600" />
              <span style={{ color: "#8b5cf6" }}>Ollama</span>
              <ArrowRight size={10} className="text-slate-600" />
              <span style={{ color: "#a78bfa" }}>Mock</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Production always uses Groq. Fallbacks ensure 100% uptime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.07] mt-3">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          <span className="ml-1.5 text-[10px] text-slate-500 font-mono">{label}</span>
        </div>
        <motion.button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
          whileTap={{ scale: 0.95 }}
        >
          {copied ? <CheckCircle2 size={10} className="text-emerald-400" /> : <Terminal size={10} />}
          {copied ? "Copied" : "Copy"}
        </motion.button>
      </div>
      <pre className="p-4 text-[11px] leading-relaxed overflow-x-auto bg-black/30 font-mono text-slate-300 whitespace-pre-wrap">{code}</pre>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TripGenieShowcase() {
  const [expandedDecision, setExpandedDecision] = useState<number | null>(null);

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
        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 50%, rgba(167,139,250,0.06) 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle at 100% 0%, rgba(99,102,241,0.2) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
          style={{ background: "radial-gradient(circle at 0% 100%, rgba(139,92,246,0.12) 0%, transparent 60%)" }} />

        <div className="relative z-10 p-8 md:p-12">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-slate-500">Flagship Project</span>
            <LiveBadge />
            <span className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" }}>
              RAG · AI · Full-Stack
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: "rgba(139,92,246,0.12)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.25)" }}>
              Solo · 6–8 weeks
            </span>
          </div>

          {/* Title */}
          <div className="mb-5">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-3"
              style={{ textShadow: "0 0 60px rgba(99,102,241,0.4)" }}>
              Trip<span style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Genie</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 font-medium">
              RAG-Powered AI Travel Planner
            </p>
            <p className="text-slate-500 text-sm mt-2 max-w-2xl leading-relaxed">
              Generates personalised day-by-day itineraries using vector embeddings, cosine similarity search,
              and the Groq LLM — grounded in real uploaded travel documents, not hallucinated output.
              Fully deployed and live 24/7 on Vercel + Render + MongoDB Atlas.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {METRICS.map((m) => (
              <div key={m.label} className="flex items-center gap-3 px-4 py-3 rounded-xl"
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
          <div className="flex flex-wrap gap-3 mb-5">
            <motion.a href={LINKS.live} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white relative overflow-hidden group"
              style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1, #8b5cf6)" }}
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
              <Globe size={15} className="relative" />
              <span className="relative">Live Demo</span>
              <ExternalLink size={12} className="relative opacity-70" />
            </motion.a>

            <motion.a href={LINKS.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white glass border border-white/[0.1] hover:border-white/[0.2] transition-all"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Github size={15} />
              GitHub Repo
            </motion.a>

            <motion.a href={LINKS.backend} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white glass border border-white/[0.08] hover:border-indigo-400/20 transition-all"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Server size={15} />
              Backend API
            </motion.a>
          </div>

          {/* Key differentiator callout */}
          <div className="inline-flex items-start gap-3 px-4 py-3 rounded-xl"
            style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <Brain size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="text-indigo-300 font-semibold">Not a ChatGPT wrapper.</span>{" "}
              TripGenie implements a custom RAG pipeline from scratch — PDF ingestion, vector chunking,
              embedding generation in Node.js, cosine similarity search, and structured prompt engineering.
              Every component was built and deployed by Krish Fefar as a solo project.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-6">
        {TECH_STACK.map((t) => (
          <span key={t.name}
            className="group px-3 py-1.5 rounded-xl glass border border-white/[0.07] text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-default flex items-center gap-2 relative"
            title={t.why}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
            {t.name}
            <span className="text-[9px] text-slate-600 font-mono">{t.layer}</span>
          </span>
        ))}
      </motion.div>

      {/* ── RAG PIPELINE DIAGRAM ─────────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="mb-6">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-4 h-px bg-slate-700" />
          The RAG Pipeline — How It Works
          <span className="flex-1 h-px bg-slate-700/50" />
        </p>
        <RagPipelineDiagram />
      </motion.div>

      {/* ── PROMPT ENGINEERING CALLOUT ───────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="mb-6">
        <div className="p-5 rounded-2xl glass border border-white/[0.07] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 100% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <p className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-4">Prompt Engineering Strategy</p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {[
                { label: "Role Injection",       desc: "'You are TripGenie, a travel architect'", color: "#6366f1" },
                { label: "RAG Context Blocks",   desc: "CLIP 1, CLIP 2... format — top-5 retrieved chunks", color: "#8b5cf6" },
                { label: "Budget Grounding",     desc: "Per-day per-category allocation injected as constraint", color: "#a78bfa" },
                { label: "Output Format Spec",   desc: "Strict JSON only — no markdown, no filler text", color: "#7c3aed" },
                { label: "Negative Instructions",desc: "No repetitions, factual accuracy, budget alignment required", color: "#6366f1" },
                { label: "Constraint Injection", desc: "Trip duration, interests, travel style enforced in prompt", color: "#8b5cf6" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02]">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: item.color }}>{item.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── FEATURES GRID ────────────────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="mb-6">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-4 h-px bg-slate-700" />
          15+ Features
          <span className="flex-1 h-px bg-slate-700/50" />
        </p>
        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {FEATURES.map((f, i) => (
            <motion.div key={f.label} variants={cardReveal}
              className="flex items-start gap-3 p-4 rounded-xl glass border border-white/[0.07] hover:border-indigo-400/20 transition-all duration-300 group"
              whileHover={{ y: -3 }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(99,102,241,0.15)" }}>
                <f.icon size={14} className="text-indigo-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">{f.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── ARCHITECTURAL DECISIONS ──────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="mb-6">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-4 h-px bg-slate-700" />
          Key Architectural Decisions
          <span className="flex-1 h-px bg-slate-700/50" />
          <span className="text-[10px] text-slate-600 normal-case font-sans">The "why" behind every choice — interview-ready answers</span>
        </p>
        <div className="flex flex-col gap-3">
          {ARCH_DECISIONS.map((d, i) => (
            <motion.div key={d.decision} variants={cardReveal}
              className="rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.12] transition-all duration-300">
              <button
                onClick={() => setExpandedDecision(expandedDecision === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 glass text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors font-mono">
                    {d.decision}
                  </span>
                </div>
                <motion.div animate={{ rotate: expandedDecision === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown size={16} className="text-slate-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedDecision === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-white/[0.05] grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider mb-2" style={{ color: d.color }}>Reasoning</p>
                        <p className="text-slate-400 text-xs leading-relaxed">{d.reasoning}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-amber-400/70 uppercase tracking-wider mb-2">Trade-off</p>
                        <p className="text-slate-400 text-xs leading-relaxed">{d.tradeoff}</p>
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
      <motion.div variants={fadeInUp} className="mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-slate-700" />
              RAG Core Logic
            </p>
            <CodeBlock label="ragPipeline.js — 7-step orchestrator" code={`// 7-step RAG pipeline orchestrator
async function generateItinerary(query, tripParams) {
  // Step 1: Embed the user's query
  const queryVector = await generateEmbedding(query);

  // Step 2: Retrieve top-5 semantically similar chunks
  const chunks = await searchSimilarChunks(queryVector, 5);

  // Step 3: Build augmented prompt
  const context = chunks
    .map((c, i) => \`CLIP \${i+1}: \${c.chunkText}\`)
    .join('\\n\\n');

  // Step 4: LLM cascade → structured JSON
  const itinerary = await callLLM({
    system: 'You are TripGenie, a travel architect...',
    context,
    tripParams,
    outputFormat: 'strict JSON only'
  });

  return JSON.parse(itinerary);
}`} />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-slate-700" />
              Cosine Similarity Search
            </p>
            <CodeBlock label="vectorSearch.js — brute-force O(n)" code={`// L2-normalised vectors → dot product = cosine sim
function cosineSimilarity(vecA, vecB) {
  let dot = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
  }
  return dot; // both vectors already normalised
}

async function searchSimilarChunks(queryVec, topK = 5) {
  const embeddings = await Embedding.find({});

  return embeddings
    .map(doc => ({
      chunkText: doc.chunkText,
      score: cosineSimilarity(queryVec, doc.vector),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}`} />
          </div>
        </div>
      </motion.div>

      {/* ── NUMBERS ROW ──────────────────────────────────────────────────── */}
      <motion.div variants={fadeInUp}
        className="p-6 rounded-2xl glass border border-white/[0.07] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-5 text-center">By the Numbers</p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {NUMBERS.map((n, i) => (
            <div key={n.label} className={`text-center ${i < 7 ? "md:border-r md:border-white/[0.05]" : ""}`}>
              <p className="text-xl md:text-2xl font-black" style={{
                background: "linear-gradient(135deg, #818cf8, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>{n.value}</p>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight">{n.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
