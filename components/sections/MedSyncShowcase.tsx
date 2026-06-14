"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Video, Brain, MessageSquare } from "lucide-react";
import { staggerContainer, fadeInUp, cardReveal } from "@/lib/animations";

const ACCENT = "#2563eb";

const LINKS = {
  live:   "https://medsync-topaz.vercel.app",
  github: "https://github.com/Krishfefar11/MedSync",
};

const HIGHLIGHTS = [
  {
    icon: Video,
    title: "Zoom Integration",
    desc: "Server-to-Server OAuth auto-creates a Zoom meeting URL on appointment confirmation and emails the patient — no manual scheduling, zero friction.",
  },
  {
    icon: Brain,
    title: "AI Record Parsing",
    desc: "Patients upload lab reports or medical docs; Gemini AI extracts structured findings and stores them against the appointment — readable by doctors instantly.",
  },
  {
    icon: MessageSquare,
    title: "Real-time EMR Workflow",
    desc: "Socket.io chat scoped per appointment, full EMR authoring with diagnosis tags and medicines table, and PDF-downloadable prescriptions for patients.",
  },
];

const STATS = [
  { value: "3",    label: "User Roles" },
  { value: "15+",  label: "Route Groups" },
  { value: "11",   label: "Prisma Models" },
  { value: "10+",  label: "Core Features" },
];

const TECH = [
  "Next.js 16", "TypeScript", "Tailwind CSS", "shadcn/ui",
  "Node.js", "Express 5", "Prisma", "PostgreSQL",
  "Socket.io", "Zoom API", "Gemini AI", "Cloudinary", "Resend",
];

export default function MedSyncShowcase() {
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
            "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(10,10,20,0) 60%)",
        }}
      >
        <div className="p-8 md:p-12">

          {/* ── Overline ── */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              Project 02
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
                background: "rgba(37,99,235,0.15)",
                color: "#93c5fd",
                border: "1px solid rgba(37,99,235,0.25)",
              }}
            >
              Full-Stack · Healthcare SaaS
            </span>
          </div>

          {/* ── Title ── */}
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-3">
            Med<span style={{ color: ACCENT }}>Sync</span>
          </h2>
          <p className="text-lg font-medium text-slate-300 mb-4">
            Telehealth Platform with Three-Role Portals
          </p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mb-10">
            Full-stack telehealth platform for Patients, Doctors, and Admins. Patients book
            appointments and upload health records; doctors write EMRs and launch Zoom calls;
            admins manage approvals and platform analytics — all in one cohesive system.
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
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #3b82f6)` }}
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
