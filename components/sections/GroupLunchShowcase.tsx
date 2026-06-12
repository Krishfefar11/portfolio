"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Users,
  Zap,
  Shield,
  Bot,
  Cpu,
  Network,
  Code2,
  Layers,
  GitBranch,
  Activity,
  UtensilsCrossed,
  ArrowRight,
  Check,
  Database,
  Server,
  RefreshCw,
} from "lucide-react";
import { staggerContainer, cardReveal, fadeInUp } from "@/lib/animations";

/* ─────────────────────────── constants ─────────────────────────── */

const LINKS = {
  live: "https://group-lunch.vercel.app",
  api: "https://group-lunch.onrender.com/api/health",
  github: "https://github.com/Krishfefar11/Group-Lunch",
};

const TECH_STACK = [
  { name: "React 18",       layer: "Frontend",       color: "#61DAFB", why: "Custom Webpack 5 — no CRA, full control over code splitting" },
  { name: "Webpack 5",      layer: "Build",          color: "#8DD6F9", why: "DefinePlugin + CompressionPlugin — 70% bundle reduction" },
  { name: "Express.js 5",   layer: "Backend",        color: "#aaaaaa", why: "11 route files — REST, SSE, Socket.IO server" },
  { name: "Socket.IO 4",    layer: "Real-Time",      color: "#010101", why: "WebSocket rooms per session — presence + order events" },
  { name: "MySQL 8",        layer: "Database",       color: "#4479A1", why: "Relational — sessions, members, preferences, orders" },
  { name: "Sequelize ORM",  layer: "ORM",            color: "#52B0E7", why: "6 models + auto-migrations on every deploy" },
  { name: "Groq LLM",       layer: "AI",             color: "#f97316", why: "llama-3.3-70b — same speed advantage as TripGenie" },
  { name: "TOPSIS AI",      layer: "Algorithm",      color: "#a855f7", why: "Multi-criteria decision + Nash Bargaining for group fairness" },
  { name: "Zod",            layer: "Validation",     color: "#3068b7", why: "Every LLM output validated before reaching business logic" },
  { name: "Aiven MySQL",    layer: "Infra",          color: "#FF3E00", why: "Managed cloud MySQL with SSL — free tier, 5GB" },
  { name: "PM2",            layer: "Process Mgr",    color: "#8b5cf6", why: "Crash recovery, 400MB guard, zero-downtime reload" },
  { name: "Vercel",         layer: "Frontend Host",  color: "#e2e8f0", why: "Edge CDN, 1-year cache headers, SPA rewrites" },
  { name: "Render",         layer: "Backend Host",   color: "#46E3B7", why: "Auto-deploy on push, health check endpoint" },
];

const AI_FEATURES = [
  {
    id: "A1",
    title: "Tool Use / Function Calling",
    Icon: Cpu,
    color: "#f97316",
    desc: "LLM invokes 6 structured tools during its reasoning loop — get_session_status, get_member_preferences, analyze_conflict, search_restaurants, rank_restaurants, generate_conflict_resolution. Each dispatched to real DB queries via a JSON schema executor.",
  },
  {
    id: "A2",
    title: "ReAct Reasoning Loop",
    Icon: GitBranch,
    color: "#fb923c",
    desc: "Full Reason + Act agent pattern. Loops up to 10 iterations. Each iteration the LLM either calls a tool (Act) or produces a final answer. Tool results fed back as observations. Implemented in server/ai/reactLoop.js.",
  },
  {
    id: "A3",
    title: "Streaming Visible Reasoning",
    Icon: Activity,
    color: "#f59e0b",
    desc: "Every agent step streamed live via SSE. Organiser sees thinking text, which tool is called, tool results, and the final recommendation in real time via the AgentPanel component. 15s keepalive ping prevents Render proxy timeout.",
  },
  {
    id: "A4",
    title: "NL Preference Extraction",
    Icon: Bot,
    color: "#f97316",
    desc: "Members type free-text ('I'm vegetarian, south Indian, ₹200 budget') and the LLM extracts structured preferences {cuisine[], diet[], budget} which auto-fill the form. Output validated with Zod ExtractedPreferenceSchema.",
  },
  {
    id: "A5",
    title: "Multi-Agent Architecture",
    Icon: Network,
    color: "#ea580c",
    desc: "4 specialised agents with single responsibility: PreferenceAgent (NL extraction + confidence scoring), ConflictAgent (conflict detection + resolution), SearchAgent (Foursquare + DB cache), RankingAgent (TOPSIS + LLM hybrid).",
  },
  {
    id: "A6",
    title: "Orchestrator",
    Icon: Layers,
    color: "#f97316",
    desc: "Pre-computes session context (members, preferences, conflicts, dietary constraints) into the LLM system prompt before the ReAct loop starts. Reduces tool calls per session by 40% and improves recommendation quality.",
  },
  {
    id: "A7",
    title: "LLM Conflict Resolution",
    Icon: Users,
    color: "#fb923c",
    desc: "When preferences conflict (one wants biryani, one is vegan), ConflictAgent first checks algorithmically (zero LLM cost if no conflict), then uses Groq to generate a diplomatic compromise with 3 concrete actionable suggestions.",
  },
  {
    id: "A8",
    title: "Zod Schema Validation",
    Icon: Shield,
    color: "#f59e0b",
    desc: "Every LLM output validated before business logic. safeParse() strips markdown fences, extracts JSON via bracket-balancing, validates schema, returns {data, error} — never throws. 4 schemas: ExtractedPreference, Recommendation, ConflictResolution, AgentStep.",
  },
];

const ARCH_DECISIONS = [
  {
    title: "TOPSIS + Nash Bargaining Group Ranking",
    tag: "Algorithm Design",
    tagColor: "#a855f7",
    problem:
      "Naive majority-vote lets 5 biryani fans override 1 vegan member — unfair and unusable for real groups with dietary constraints.",
    solution:
      "TOPSIS scores each restaurant on 6 criteria: cuisine match, dietary compliance, budget fit, rating, delivery speed, group satisfaction. Nash Bargaining enforces fairness — no single member's preference dominates. Cuisine diversity enforcement is applied as a hard constraint.",
    tradeoff:
      "TOPSIS is O(n×m) — acceptable for 3-15 members with <20 restaurant options. For larger Foursquare results, dietary pre-filtering reduces candidates before ranking.",
    code: null,
  },
  {
    title: "Webpack 5 Manual Config — No CRA",
    tag: "Build Engineering",
    tagColor: "#3b82f6",
    problem:
      "Create React App is a black box — no control over chunk naming, compression, or env baking. The original bundle was 429KB uncompressed.",
    solution:
      "Hand-crafted webpack.config.js: DefinePlugin bakes env vars at build time (no runtime exposure), CompressionPlugin generates .gz pre-compressed files, SplitChunksPlugin creates vendor.react + vendor + main chunks. Result: 429KB → 130KB on wire (70% reduction).",
    tradeoff:
      "Manual webpack config requires maintenance on major React/Babel upgrades. Mitigated by locking major versions and documenting the config intent inline.",
    code: `// webpack.config.js — key plugins
new webpack.DefinePlugin({
  'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL)
}),
new CompressionPlugin({ algorithm: 'gzip', threshold: 10240 }),
optimization: {
  splitChunks: {
    cacheGroups: {
      reactVendor: {
        test: /[\\/]node_modules[\\/](react|react-dom)/,
        name: 'vendor.react', priority: 20
      },
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor', priority: -10
      }
    }
  }
}`,
  },
  {
    title: "SSE Streaming Agent Reasoning",
    tag: "Real-time AI",
    tagColor: "#f97316",
    problem:
      "LLM responses take 3–8 seconds. A blank loading spinner creates anxiety — users don't know if the AI is working or stuck.",
    solution:
      "Agent endpoint responds with Content-Type: text/event-stream. Each ReAct step (thinking, tool_call, tool_result, done) is written as a data: JSON line. useAgentStream hook reads via fetch() + ReadableStream, accumulating into steps[] that renders live. 15s keepalive ping prevents Render proxy from closing idle SSE connections.",
    tradeoff:
      "SSE is one-directional — user can't cancel mid-stream without closing the connection. Acceptable UX tradeoff since the agent runs ≤10 iterations (~5s max). AbortController support added for page navigations.",
    code: `// server/ai/reactLoop.js — streaming each step
async function reactLoop(sessionId, onStep) {
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const response = await groq.chat.completions.create({ ... });
    const choice = response.choices[0];

    if (choice.finish_reason === 'tool_calls') {
      const tool = choice.message.tool_calls[0].function;
      onStep({ type: 'tool_call', tool: tool.name });
      const result = await executeTool(tool);
      onStep({ type: 'tool_result', result });
      messages.push({ role: 'tool', content: JSON.stringify(result) });
    } else {
      onStep({ type: 'done', answer: choice.message.content });
      return;
    }
  }
}`,
  },
  {
    title: "Auto-Migration on Deploy (No Shell Required)",
    tag: "DevOps",
    tagColor: "#10b981",
    problem:
      "Render's free tier has no shell access — can't manually run migrations after schema changes. Teams normally pay for shell access or maintain a separate migration runner.",
    solution:
      "sequelize-cli listed as a production dependency (not devDependency). Start command is 'sequelize db:migrate && node server.js'. Every deploy automatically runs pending migrations before the server starts. Idempotent — already-run migrations skipped silently. Zero human intervention.",
    tradeoff:
      "Adds ~2s to cold-start time. Acceptable since Render free-tier cold starts already take 30–50s after inactivity. sequelize-cli adds ~15MB to the deployed bundle.",
    code: `// package.json (server) — production dep, not devDep
{
  "scripts": {
    "start": "sequelize db:migrate && node server.js"
  },
  "dependencies": {
    "sequelize": "^6.37.3",
    "sequelize-cli": "^6.6.2"  // ← prod dep so Render can run it
  }
}`,
  },
  {
    title: "Organiser Handoff with Socket.IO",
    tag: "Real-time",
    tagColor: "#8b5cf6",
    problem:
      "If the organiser closes the browser mid-session, the group is stuck — no one can trigger the AI recommendation or place the order.",
    solution:
      "Any member can claim organiser via 'Become Organiser' button. Server verifies current organiser is absent from in-memory presence map, updates the DB, and broadcasts organizer_changed to all session members. JoinSession uses functional setState (prev => ...) to avoid stale closure issues in the socket event handler.",
    tradeoff:
      "Race condition possible if two members click simultaneously. Resolved with a DB transaction — first write wins, second gets a 409 Conflict from the API. No distributed lock needed at this scale.",
    code: null,
  },
  {
    title: "Token-Based Design System (No CSS Files)",
    tag: "Frontend Architecture",
    tagColor: "#06b6d4",
    problem:
      "Without a shared design system, 8 pages and 15+ components develop inconsistent spacing, colours, and typography. CSS files create specificity conflicts and dead-code accumulation.",
    solution:
      "Single tokens.js defines: colour palette (dark/light mode ready), typography scale (10 sizes), 8-point spacing grid, border radius tokens, box shadow presets, and transition speeds. All styles are inline React style objects referencing tokens. No CSS files — zero style conflicts, fully tree-shakeable.",
    tradeoff:
      "Inline styles can't use CSS pseudo-selectors (:hover, :focus) natively. Handled with React onMouseEnter/onMouseLeave state for interactive hover states. Minor verbosity tradeoff for zero-conflict guarantee.",
    code: null,
  },
];

/* ─────────────────────────── sub-components ─────────────────────── */

function AccordionCard({
  item,
  index,
}: {
  item: (typeof ARCH_DECISIONS)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={cardReveal}
      custom={index}
      className="rounded-2xl glass border border-white/[0.06] overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-md flex-shrink-0 mt-0.5 whitespace-nowrap"
            style={{
              background: `${item.tagColor}18`,
              color: item.tagColor,
            }}
          >
            {item.tag}
          </span>
          <span className="text-sm font-semibold text-slate-200 leading-snug">
            {item.title}
          </span>
        </div>
        <span className="text-slate-500 ml-3 flex-shrink-0">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-5 space-y-4 border-t border-white/[0.05]">
              <div className="pt-4 grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-red-500/[0.05] border border-red-500/[0.1]">
                  <p className="text-xs font-mono text-red-400 mb-1.5">
                    ⚠ Problem
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.problem}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/[0.1]">
                  <p className="text-xs font-mono text-emerald-400 mb-1.5">
                    ✓ Solution
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-xs font-mono text-slate-500 mb-1.5">
                  ⚖ Trade-off
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.tradeoff}
                </p>
              </div>

              {item.code && (
                <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border-b border-white/[0.06]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono ml-2">
                      code
                    </span>
                  </div>
                  <pre className="p-4 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed bg-black/20">
                    <code>{item.code}</code>
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────── main export ────────────────────────── */

export default function GroupLunchShowcase() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="space-y-16"
    >
      {/* ── Hero ── */}
      <motion.div variants={fadeInUp} className="relative rounded-3xl overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #f97316 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 rounded-3xl border border-orange-500/[0.12]" />

        <div className="relative p-8 md:p-12">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              LIVE 24/7
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400">
              Multi-Agent ReAct Architecture
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400">
              TOPSIS + Nash Bargaining
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400">
              $0 / month infra
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-4xl md:text-5xl font-black mb-3 tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, #f97316 0%, #fb923c 40%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Group Lunch
          </h3>
          <p className="text-slate-400 text-lg mb-2">
            AI-Powered Collaborative Group Food Ordering Platform
          </p>
          <p className="text-slate-500 text-sm max-w-2xl mb-8">
            Not just a food app — a production-grade multi-agent AI system. Custom ReAct
            reasoning loop, SSE live-streaming agent thoughts, TOPSIS + Nash Bargaining
            for fair group decisions, and 10 senior-developer improvements. Fully live on
            free-tier infrastructure — zero paid services.
          </p>

          {/* Metrics bar */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { value: "8",    label: "AI Agent Features" },
              { value: "70%",  label: "Bundle Size Reduction" },
              { value: "3",    label: "Free-Tier Deployments" },
            ].map((m) => (
              <div
                key={m.label}
                className="p-3 rounded-xl text-center"
                style={{
                  background: "rgba(249,115,22,0.06)",
                  border: "1px solid rgba(249,115,22,0.14)",
                }}
              >
                <div className="text-xl font-black text-orange-400">{m.value}</div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href={LINKS.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 glass border border-white/[0.1] hover:border-white/[0.2] transition-all"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href={LINKS.api}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 glass border border-white/[0.07] hover:border-white/[0.12] transition-all"
            >
              <Activity size={14} />
              API Health
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Problem / Solution ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono text-orange-500/60 uppercase tracking-widest mb-5">
          The Problem It Solves
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-red-500/[0.04] border border-red-500/[0.1]">
            <p className="text-xs font-mono text-red-400 mb-2">BEFORE</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Group chats asking "what does everyone want?" → no consensus, someone orders
              the wrong thing, dietary needs ignored. Chaos every time for 5–10 people.
            </p>
          </div>
          <div
            className="p-5 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(249,115,22,0.05)",
              border: "1px solid rgba(249,115,22,0.15)",
            }}
          >
            <div className="text-center">
              <UtensilsCrossed
                size={28}
                className="mx-auto mb-2"
                style={{ color: "#f97316" }}
              />
              <p className="text-orange-400 font-bold text-sm">Group Lunch</p>
              <ArrowRight
                size={16}
                className="mx-auto mt-1"
                style={{ color: "rgba(249,115,22,0.5)" }}
              />
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/[0.1]">
            <p className="text-xs font-mono text-emerald-400 mb-2">AFTER</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Organiser creates session, members join via link, submit preferences in seconds,
              AI picks the best restaurant for the group, shared cart, live order tracking.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Tech Stack ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono text-orange-500/60 uppercase tracking-widest mb-5">
          Technology Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((t) => (
            <div
              key={t.name}
              className="group relative flex items-center gap-2 px-3 py-2 rounded-xl glass border border-white/[0.06] hover:border-white/[0.12] transition-all cursor-default"
              title={t.why}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background:
                    t.color === "#010101" ? "#ffffff" : t.color,
                }}
              />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {t.name}
              </span>
              <span className="text-[10px] text-slate-600 font-mono hidden group-hover:inline">
                {t.layer}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Multi-Agent ReAct Diagram ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono text-orange-500/60 uppercase tracking-widest mb-5">
          Multi-Agent ReAct Architecture
        </p>
        <div className="p-6 rounded-2xl glass border border-white/[0.06] overflow-x-auto">
          <div className="min-w-[580px] space-y-4">
            {/* Orchestrator */}
            <div className="flex justify-center">
              <div
                className="px-8 py-3 rounded-xl text-center"
                style={{
                  background: "rgba(249,115,22,0.08)",
                  border: "1px solid rgba(249,115,22,0.22)",
                }}
              >
                <p className="text-xs font-mono text-orange-400 mb-0.5 uppercase tracking-wider">
                  Orchestrator
                </p>
                <p className="text-sm font-bold text-white">
                  Pre-computes Session Context
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  members · preferences · conflicts · dietary constraints → LLM system prompt
                </p>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center">
              <div className="w-px h-5 bg-orange-500/20" />
            </div>

            {/* ReAct Loop */}
            <div className="flex justify-center">
              <div
                className="px-8 py-3 rounded-xl text-center"
                style={{
                  background: "rgba(168,85,247,0.07)",
                  border: "1px solid rgba(168,85,247,0.18)",
                }}
              >
                <p className="text-xs font-mono text-purple-400 mb-0.5 uppercase tracking-wider">
                  ReAct Loop · max 10 iterations
                </p>
                <p className="text-sm font-bold text-white">
                  Groq LLM (llama-3.3-70b) ↔ Tool Executor
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reason → Act → Observe → Reason → …
                </p>
              </div>
            </div>

            {/* 6 Tools */}
            <div>
              <p className="text-xs font-mono text-slate-600 text-center mb-2">
                6 LLM TOOLS (JSON schema function calling)
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "get_session_status",
                  "get_member_preferences",
                  "analyze_conflict",
                  "search_restaurants",
                  "rank_restaurants",
                  "generate_conflict_resolution",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-1 rounded-lg text-slate-500"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center">
              <div className="w-px h-5 bg-purple-500/20" />
            </div>

            {/* 4 Agents */}
            <div className="grid grid-cols-4 gap-3">
              {[
                {
                  name: "PreferenceAgent",
                  desc: "NL extraction + confidence scoring",
                  color: "#f97316",
                },
                {
                  name: "ConflictAgent",
                  desc: "Dietary/budget conflict detection",
                  color: "#fb923c",
                },
                {
                  name: "SearchAgent",
                  desc: "Foursquare + DB cache search",
                  color: "#f59e0b",
                },
                {
                  name: "RankingAgent",
                  desc: "TOPSIS + LLM hybrid ranking",
                  color: "#a855f7",
                },
              ].map((a) => (
                <div
                  key={a.name}
                  className="p-3 rounded-xl text-center"
                  style={{
                    background: `${a.color}0a`,
                    border: `1px solid ${a.color}22`,
                  }}
                >
                  <p
                    className="text-xs font-bold mb-1"
                    style={{ color: a.color }}
                  >
                    {a.name}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* SSE stream out */}
            <div className="pt-3 border-t border-white/[0.05]">
              <div className="flex items-center justify-center gap-3">
                <span className="text-xs font-mono text-slate-600">
                  SSE stream →
                </span>
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-mono"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    color: "#10b981",
                    border: "1px solid rgba(16,185,129,0.15)",
                  }}
                >
                  AgentPanel — live visible reasoning in browser
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── TOPSIS Algorithm ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono text-orange-500/60 uppercase tracking-widest mb-5">
          TOPSIS Restaurant Ranking
        </p>
        <div className="p-5 rounded-2xl glass border border-white/[0.06] space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-bold text-white mb-1">6 Scoring Criteria</p>
              <p className="text-xs text-slate-500 max-w-lg">
                TOPSIS finds the restaurant closest to the theoretical best and furthest
                from the worst across all criteria simultaneously. Combined with Nash
                Bargaining for group fairness — no single member&apos;s preference dominates.
              </p>
            </div>
            <div
              className="px-3 py-1.5 rounded-lg text-xs font-mono flex-shrink-0"
              style={{
                background: "rgba(168,85,247,0.06)",
                border: "1px solid rgba(168,85,247,0.15)",
                color: "#c084fc",
              }}
            >
              Nash Bargaining: max ∏ᵢ (uᵢ(x) − dᵢ)
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-2">
            {[
              { c: "Cuisine Match Score",       w: "High" },
              { c: "Dietary Filter Compliance", w: "Critical" },
              { c: "Budget Fit",                w: "High" },
              { c: "Restaurant Rating",         w: "Medium" },
              { c: "Delivery Speed",            w: "Medium" },
              { c: "Group Satisfaction Score",  w: "High" },
            ].map(({ c, w }) => (
              <div key={c} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <Check size={11} style={{ color: "#f97316" }} />
                  <span className="text-xs text-slate-400">{c}</span>
                </div>
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded ml-2 flex-shrink-0"
                  style={{
                    background:
                      w === "Critical" ? "rgba(239,68,68,0.1)"
                      : w === "High"   ? "rgba(249,115,22,0.1)"
                      :                  "rgba(148,163,184,0.08)",
                    color:
                      w === "Critical" ? "#ef4444"
                      : w === "High"   ? "#f97316"
                      :                  "#94a3b8",
                  }}
                >
                  {w}
                </span>
              </div>
            ))}
          </div>
          <div
            className="p-3 rounded-xl text-xs text-slate-400 leading-relaxed"
            style={{
              background: "rgba(249,115,22,0.04)",
              border: "1px solid rgba(249,115,22,0.1)",
            }}
          >
            <span className="text-orange-400 font-mono">Diversity enforcement:</span>{" "}
            If 5 people want biryani but 1 member is vegan, the algorithm finds a
            restaurant that serves both — not one that satisfies only the majority.
          </div>
        </div>
      </motion.div>

      {/* ── 8 AI Features Grid ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono text-orange-500/60 uppercase tracking-widest mb-5">
          8 AI Features
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {AI_FEATURES.map((f, i) => {
            const { Icon } = f;
            return (
              <motion.div
                key={f.id}
                variants={cardReveal}
                custom={i}
                className="p-4 rounded-2xl glass border border-white/[0.06] hover:border-white/[0.1] transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${f.color}15` }}
                  >
                    <Icon size={15} style={{ color: f.color }} />
                  </div>
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: f.color }}
                  >
                    {f.id}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mb-2">
                  {f.title}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ── System Architecture Table ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono text-orange-500/60 uppercase tracking-widest mb-5">
          System Architecture · Request Flow
        </p>
        <div className="rounded-2xl glass border border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  <th className="text-left px-5 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Layer
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Technology
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Responsibility
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    layer: "Browser",
                    tech: "React 18 + Webpack 5",
                    resp: "SPA — all UI, routing, state, WebSocket client",
                  },
                  {
                    layer: "CDN / Host",
                    tech: "Vercel Edge Network",
                    resp: "Serves static JS/CSS/HTML with global edge caching",
                  },
                  {
                    layer: "API Gateway",
                    tech: "Express.js 5",
                    resp: "REST routes, rate limiting, helmet security, CORS",
                  },
                  {
                    layer: "Real-Time",
                    tech: "Socket.IO 4",
                    resp: "WebSocket rooms per session — presence, order events",
                  },
                  {
                    layer: "AI Layer",
                    tech: "Groq LLM + 4 Agents",
                    resp: "ReAct loop, tool use, NL extraction, conflict resolution",
                  },
                  {
                    layer: "ORM",
                    tech: "Sequelize 6",
                    resp: "Model definitions, migrations, query building",
                  },
                  {
                    layer: "Database",
                    tech: "MySQL 8 (Aiven)",
                    resp: "Persistent storage — sessions, preferences, orders",
                  },
                  {
                    layer: "External APIs",
                    tech: "Foursquare Places",
                    resp: "Live restaurant search by city (cached in DB to reduce API calls)",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.layer}
                    className={`border-b border-white/[0.03] ${
                      i % 2 !== 0 ? "bg-white/[0.01]" : ""
                    } hover:bg-white/[0.02] transition-colors`}
                  >
                    <td className="px-5 py-3 font-mono text-xs text-orange-400">
                      {row.layer}
                    </td>
                    <td className="px-5 py-3 text-xs font-semibold text-slate-300">
                      {row.tech}
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-500 hidden sm:table-cell">
                      {row.resp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* ── Notable Implementations ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono text-orange-500/60 uppercase tracking-widest mb-5">
          Notable Technical Implementations
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {ARCH_DECISIONS.map((item, i) => (
            <AccordionCard key={item.title} item={item} index={i} />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Numbers Bar ── */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "3–15",  label: "Concurrent Users / Session" },
            { value: "<2s",   label: "Avg API Response Time" },
            { value: "99%",   label: "Production Uptime" },
            { value: "$0",    label: "Monthly Infra Cost" },
          ].map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-2xl text-center glass border border-white/[0.06]"
            >
              <div
                className="text-2xl font-black mb-1"
                style={{
                  background: "linear-gradient(135deg, #f97316, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.value}
              </div>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
