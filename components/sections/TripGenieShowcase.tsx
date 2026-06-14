"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Database, Brain, Zap } from "lucide-react";
import { staggerContainer, fadeInUp, cardReveal } from "@/lib/animations";

const ACCENT = "#6366f1";
const ACCENT2 = "#8b5cf6";

const LINKS = {
  live:   "https://tripgenie-psi.vercel.app",
  github: "https://github.com/Krishfefar11/TripGenie",
};

const HIGHLIGHTS = [
  {
    icon: Database,
    title: "In-process RAG Pipeline",
    desc: "all-MiniLM-L6-v2 runs inside Node.js via @xenova/transformers — no Python microservice, no Pinecone. 384-dim embeddings with Top-5 cosine retrieval from uploaded travel guides.",
  },
  {
    icon: Zap,
    title: "Groq LLM · < 8s Generation",
    desc: "llama-3.3-70b generates a full day-by-day itinerary in under 8 seconds. LLM cascade: Groq → Ollama → Mock fallback — always returns valid Zod-validated output.",
  },
  {
    icon: Brain,
    title: "15+ Itinerary Features",
    desc: "Budget breakdown, local food picks, hidden gems, weather, packing list, AI chat, save trips, PDF download, and RAG-powered travel tips grounded in real uploaded documents.",
  },
];

const STATS = [
  { value: "<8s",    label: "Itinerary Generation" },
  { value: "384",    label: "Embedding Dimensions" },
  { value: "Top-5",  label: "RAG Retrieval" },
  { value: "15+",    label: "Output Features" },
];

const TECH = [
  "React 18", "Vite", "Tailwind CSS", "Framer Motion",
  "Node.js", "Express", "MongoDB", "Groq LLM",
  "@xenova/transformers", "Vercel", "Render",
];

export default function TripGenieShowcase() {
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
            "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 50%, rgba(10,10,20,0) 80%)",
        }}
      >
        <div className="p-8 md:p-12">

          {/* ── Overline ── */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              Project 03 · Flagship
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
                color: "#a5b4fc",
                border: "1px solid rgba(99,102,241,0.25)",
              }}
            >
              Full-Stack · AI / RAG
            </span>
          </div>

          {/* ── Title ── */}
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-3">
            Trip<span style={{ color: ACCENT }}>Genie</span>
          </h2>
          <p className="text-lg font-medium text-slate-300 mb-4">
            AI-Powered Travel Planner with In-process RAG
          </p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mb-10">
            Upload your travel guides, ask for a trip — TripGenie embeds your documents
            in-process, retrieves the most relevant passages, and generates a complete
            day-by-day itinerary grounded in your own content. No hallucinated tips, no
            vector database bill, no Python service.
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
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}20, ${ACCENT2}20)`,
                  }}
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
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
              }}
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
