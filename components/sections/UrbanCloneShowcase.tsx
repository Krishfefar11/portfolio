"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Users,
  Shield,
  Wallet,
  Star,
  MapPin,
  MessageSquare,
  BarChart2,
  Settings,
  Smartphone,
  Zap,
  Lock,
  Database,
  CreditCard,
  RefreshCw,
  Check,
} from "lucide-react";
import { staggerContainer, cardReveal, fadeInUp } from "@/lib/animations";

/* ─────────────────────────── constants ─────────────────────────── */

const ACCENT = "#1AB64F";

const LINKS = {
  live: "https://urban-company-clone-taupe.vercel.app",
  api: "https://urban-company-clone.onrender.com",
  github: "https://github.com/Krishfefar11/urban-company-clone",
};

const FRONTEND_STACK = [
  { name: "React 19",         why: "Component-based SPA with Vite 8 — 10-100× faster HMR than CRA" },
  { name: "React Router v7",  why: "Nested routes, protected routes per role, file-style structure" },
  { name: "TanStack Query v5",why: "Server state caching, background refetch, optimistic updates — no Redux needed" },
  { name: "Framer Motion 12", why: "Page transitions (220ms), spring hover, stagger grids, whileInView" },
  { name: "Tailwind CSS v3",  why: "JIT — custom design system, neutral palette + brand green #1AB64F" },
  { name: "Firebase JS SDK",  why: "Google OAuth, email/password, phone OTP, auto token refresh" },
  { name: "React Hook Form",  why: "+ Zod v4 — schema validation, field-level errors across 30+ forms" },
  { name: "React Leaflet",    why: "Map-based address picker in booking flow" },
  { name: "Recharts",         why: "Earnings graphs on Professional dashboard" },
  { name: "vite-plugin-pwa",  why: "Workbox service worker, offline caching, installable on Android/iOS" },
  { name: "Razorpay JS",      why: "Inline payment sheet — UPI, cards, net banking, wallets" },
];

const BACKEND_STACK = [
  { name: "Node.js 26",           why: "ES Modules (import/export) — modern runtime syntax" },
  { name: "Express.js 4",         why: "REST API, modular route files, 25+ endpoints" },
  { name: "MongoDB Atlas",        why: "Varied service schemas — document model fits better than rigid relational" },
  { name: "Mongoose 8",           why: "8 data models, indexing, population chains" },
  { name: "Firebase Admin SDK",   why: "Verifies Firebase ID tokens on every protected route — no custom JWT issuer" },
  { name: "Socket.io 4",          why: "Room-based booking status updates + in-booking customer-pro chat" },
  { name: "Razorpay Node SDK",    why: "Order creation, payment verification, webhook handling" },
  { name: "Multer + Cloudinary",  why: "Image upload pipeline — professional photos, service images" },
  { name: "Resend SDK",           why: "Transactional emails — booking confirmation, OTP" },
  { name: "Helmet + rate-limit",  why: "CSP, HSTS, 200 req/15min global, 10 on auth/payment routes" },
  { name: "Winston + Morgan",     why: "Structured JSON logs in production, HTTP request logging" },
  { name: "Jest + Supertest",     why: "Unit/integration tests for auth, bookings, payments, role guards" },
];

const ROLE_TABS = [
  {
    id: "customer",
    label: "Customer",
    color: ACCENT,
    icon: Users,
    tagline: "Browse, book, track, pay",
    features: [
      { name: "Home Page",          desc: "Hero + 7 live API service sections, animated category grid, offers" },
      { name: "Service Browse",     desc: "Category filter, search, sort (popular/price/rating), pagination, availability badges" },
      { name: "Service Detail",     desc: "Pricing plans, quantity selector, includes/excludes, real customer reviews" },
      { name: "Booking Flow",       desc: "Map address picker, date/time slot, plan selection, promo code, Razorpay payment" },
      { name: "Real-time Tracking", desc: "Socket.io — confirmed → en route → arrived → completed, instant status push" },
      { name: "Wallet",             desc: "Balance display, credit/debit history, add money via Razorpay, pay at checkout" },
      { name: "Wishlist",           desc: "Heart button saves to localStorage, persists across sessions" },
      { name: "Booking History",    desc: "Status timeline, cancel/reschedule, leave review on completed bookings" },
      { name: "City Selector",      desc: "10 Indian cities — Ahmedabad, Mumbai, Bengaluru, Delhi, Hyderabad and more" },
      { name: "PWA",                desc: "Installable on Android/iOS, offline browsing via Workbox, push notifications" },
    ],
  },
  {
    id: "professional",
    label: "Professional",
    color: "#3b82f6",
    icon: Star,
    tagline: "Manage jobs, earnings, chat",
    features: [
      { name: "Registration",     desc: "Multi-step onboarding — personal details, skills, document upload (Cloudinary), bank details" },
      { name: "Dashboard",        desc: "Today's bookings, earnings summary, rating overview, quick stats panel" },
      { name: "Bookings",         desc: "Upcoming/completed tabs, accept/reject new requests, update status in real-time" },
      { name: "Earnings",         desc: "Monthly earnings chart (Recharts), transaction breakdown, payout history" },
      { name: "In-booking Chat",  desc: "Real-time Socket.io chat with customer during active booking" },
      { name: "Profile",          desc: "Edit bio, skills, service areas, availability toggle, photo upload to Cloudinary" },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    color: "#a855f7",
    icon: Shield,
    tagline: "Full platform control",
    features: [
      { name: "Dashboard",            desc: "Platform-wide KPIs — total users, bookings, revenue, professionals, recent activity" },
      { name: "User Management",      desc: "List all users, search/filter by role, view profile, ban/activate accounts" },
      { name: "Professional Mgmt",    desc: "Verify/reject professionals, view uploaded documents, manage availability" },
      { name: "Booking Management",   desc: "All bookings across platform, filter by status/date/service, force-update status" },
      { name: "Service Management",   desc: "Add/edit/delete services, manage pricing tiers, toggle city availability, upload images" },
    ],
  },
];

const DATA_MODELS = [
  { name: "User",              fields: "name, email, phone, role, avatar, address[], walletBalance, fcmToken" },
  { name: "Service",           fields: "title, slug, category, pricing[], rating, availableCities[], isActive" },
  { name: "Booking",           fields: "user, service, professional, status, scheduledAt, paymentStatus, totalAmount" },
  { name: "Professional",      fields: "user (ref), skills[], bio, rating, totalJobs, earnings, isVerified, isAvailable" },
  { name: "Review",            fields: "user, service, booking, professional, rating, comment, tags[], reply" },
  { name: "WalletTransaction", fields: "user, type (credit/debit), amount, description, bookingRef, balance" },
  { name: "Message",           fields: "booking, sender, senderRole, content, createdAt" },
  { name: "PromoCode",         fields: "code, discountType, discountValue, minOrderValue, maxUses, usedCount, expiresAt" },
];

const TECH_DECISIONS = [
  {
    title: "React Query over Redux",
    tag: "State Management",
    tagColor: "#3b82f6",
    problem: "Redux forces you to manually manage loading, error, and success states for every API call — 90% of the code is boilerplate that reinvents caching.",
    solution: "TanStack React Query v5 treats server state as a first-class citizen. Automatic caching (5min staleTime), background refetch, optimistic updates, and deduplication are built-in. Redux is reserved for pure client state (modals, UI toggles) — not server data.",
    tradeoff: "React Query adds ~13KB to the bundle. Acceptable given it replaces hundreds of lines of Redux boilerplate and eliminates an entire class of stale data bugs.",
    code: null,
  },
  {
    title: "Firebase Auth over Custom JWT",
    tag: "Authentication",
    tagColor: ACCENT,
    problem: "Custom JWT auth requires: issuing tokens, managing refresh rotation, building Google OAuth, building phone OTP, handling token revocation. That's 400+ lines of security-critical code.",
    solution: "Firebase handles token issuance, refresh, Google OAuth, and phone OTP. The backend only verifies tokens via Firebase Admin SDK — a single middleware call. The 401 retry pattern in the custom apiFetch wrapper handles token refresh transparently.",
    tradeoff: "Firebase lock-in — migrating to custom auth later requires rewriting all auth flows. Acceptable for a portfolio project; Firebase's reliability and features outweigh the vendor dependency.",
    code: `// apiFetch wrapper — auto token refresh on 401
async function apiFetch(url, options = {}) {
  const token = await auth.currentUser?.getIdToken();
  const res = await fetch(url, {
    ...options,
    headers: { Authorization: \`Bearer \${token}\`, ...options.headers }
  });

  if (res.status === 401) {
    // Token expired — force refresh and retry once
    const freshToken = await auth.currentUser?.getIdToken(true);
    return fetch(url, {
      ...options,
      headers: { Authorization: \`Bearer \${freshToken}\`, ...options.headers }
    });
  }
  return res;
}`,
  },
  {
    title: "MongoDB over PostgreSQL",
    tag: "Database",
    tagColor: "#10b981",
    problem: "Home services have varied schemas — a cleaning service has room count, a massage service has therapist gender preference, a plumbing service has pipe type. Forcing all into a rigid relational schema requires many nullable columns or complex joins.",
    solution: "MongoDB's document model lets each service have its own shape. Mongoose provides schema validation where needed (bookings, payments) while allowing flexibility elsewhere (service metadata). MongoDB Atlas M0 is free with connection pooling built in.",
    tradeoff: "No foreign key constraints — referential integrity is enforced at the application layer (Mongoose populate + middleware). Requires disciplined model design to avoid orphaned documents.",
    code: null,
  },
  {
    title: "Socket.io for Real-time Booking Status",
    tag: "Real-time",
    tagColor: "#8b5cf6",
    problem: "Booking status changes (confirmed → en route → arrived → completed) require the customer to see updates instantly — polling every 5s creates lag and unnecessary server load.",
    solution: "Socket.io uses room-based events. Each booking gets its own room (booking:{id}). When a professional updates their status, the server emits a booking_status_update to that room. The customer's UI updates in real time with no refresh. WebSocket with automatic long-polling fallback handles unstable connections.",
    tradeoff: "Socket.io adds stateful connections — Render's free tier limits concurrent connections. Fork mode (not cluster) required to avoid Socket.io incompatibility with multi-process setups.",
    code: `// server — emit on status update
socket.join(\`booking:\${bookingId}\`);
io.to(\`booking:\${bookingId}\`).emit('booking_status_update', {
  bookingId, status, updatedAt: new Date()
});

// client — useBookingStatus hook
useEffect(() => {
  socket.emit('join_booking', bookingId);
  socket.on('booking_status_update', ({ status }) => {
    queryClient.setQueryData(['booking', bookingId],
      old => ({ ...old, status })
    );
  });
  return () => socket.off('booking_status_update');
}, [bookingId]);`,
  },
  {
    title: "Three-Role Middleware Architecture",
    tag: "Auth / RBAC",
    tagColor: "#f97316",
    problem: "A single app serving Customer, Professional, and Admin users needs route-level access control. Mixing role checks inline in route handlers creates duplicated, fragile logic.",
    solution: "Two middleware layers: verifyFirebaseToken decodes and attaches req.user on every protected route. requireRole(['admin']) or requireRole(['professional', 'admin']) gates specific routes. The role is stored in MongoDB User model, returned by the auth middleware — no need to decode from the JWT.",
    tradeoff: "DB lookup on every request to fetch the role. Mitigated by lightweight Mongoose lean() query. Could be cached in Redis for high-traffic production, but unnecessary at this scale.",
    code: `// middleware/auth.js
export const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  const decoded = await admin.auth().verifyIdToken(token);
  const user = await User.findOne({ uid: decoded.uid }).lean();
  req.user = user; // includes role
  next();
};

export const requireRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ error: 'Forbidden' });
  next();
};`,
  },
  {
    title: "Vite over Create React App",
    tag: "Build Tooling",
    tagColor: "#06b6d4",
    problem: "CRA uses webpack under the hood with slow startup (~30s cold start), no native ES module support in dev, and opaque configuration. Bundle analysis and optimisation are blocked.",
    solution: "Vite uses native ES modules in development (no bundling — instant server start), esbuild for fast transforms, and Rollup for production with tree-shaking. vite-plugin-pwa adds PWA support with Workbox without any extra config. HMR is sub-100ms.",
    tradeoff: "Some CRA-specific assumptions (process.env.REACT_APP_* prefix) need updating. Minor migration cost for a large performance gain.",
    code: null,
  },
];

/* ─────────────────────────── sub-components ─────────────────────── */

function AccordionCard({ item, index }: { item: (typeof TECH_DECISIONS)[0]; index: number }) {
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
            style={{ background: `${item.tagColor}18`, color: item.tagColor }}
          >
            {item.tag}
          </span>
          <span className="text-sm font-semibold text-slate-200 leading-snug">{item.title}</span>
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
                  <p className="text-xs font-mono text-red-400 mb-1.5">⚠ Problem</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.problem}</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/[0.1]">
                  <p className="text-xs font-mono text-emerald-400 mb-1.5">✓ Solution</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.solution}</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-xs font-mono text-slate-500 mb-1.5">⚖ Trade-off</p>
                <p className="text-sm text-slate-400 leading-relaxed">{item.tradeoff}</p>
              </div>
              {item.code && (
                <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border-b border-white/[0.06]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono ml-2">code</span>
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

export default function UrbanCloneShowcase() {
  const [activeRole, setActiveRole] = useState("customer");
  const currentRole = ROLE_TABS.find((r) => r.id === activeRole)!;

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
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${ACCENT} 0%, transparent 70%)` }}
        />
        <div
          className="absolute inset-0 rounded-3xl"
          style={{ border: `1px solid ${ACCENT}1f` }}
        />

        <div className="relative p-8 md:p-12">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full"
              style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, color: ACCENT }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
              LIVE 24/7
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400">
              3 User Roles
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400">
              Firebase Auth + Razorpay
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400">
              PWA · Installable
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-4xl md:text-5xl font-black mb-3 tracking-tight"
            style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #34d399 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Urban Company Clone
          </h3>
          <p className="text-slate-400 text-lg mb-2">
            Production-Grade Full-Stack Home Services Marketplace
          </p>
          <p className="text-slate-500 text-sm max-w-2xl mb-8">
            Not a tutorial clone — architected from scratch with real-world patterns. Three distinct user portals
            (Customer · Professional · Admin), Firebase authentication with three sign-in methods, Razorpay
            payment gateway, Socket.io real-time tracking, and a PWA that installs on mobile. All live.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            {[
              { value: "30+",   label: "Pages & Views" },
              { value: "25+",   label: "API Endpoints" },
              { value: "3",     label: "User Roles" },
              { value: "8+",    label: "DB Models" },
              { value: "100%",  label: "Mobile Ready" },
            ].map((m) => (
              <div
                key={m.label}
                className="p-3 rounded-xl text-center"
                style={{ background: `${ACCENT}0a`, border: `1px solid ${ACCENT}20` }}
              >
                <div className="text-xl font-black" style={{ color: ACCENT }}>{m.value}</div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{m.label}</div>
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
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #16a34a)` }}
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
              href={`${LINKS.api}/api/health`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 glass border border-white/[0.07] hover:border-white/[0.12] transition-all"
            >
              <Zap size={14} />
              API Docs
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Standout callouts ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: `${ACCENT}99` }}>
          What Makes This Stand Out
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Lock,        title: "Firebase Auth",    desc: "Google OAuth + Email + Phone OTP, auto token refresh, 401 retry pattern" },
            { icon: CreditCard,  title: "Razorpay",         desc: "Full payment gateway — UPI, cards, wallets, webhooks, promo codes" },
            { icon: RefreshCw,   title: "Real-time",        desc: "Socket.io booking status — confirmed → en route → arrived → completed" },
            { icon: Smartphone,  title: "PWA",              desc: "Installable on Android/iOS, Workbox offline caching, push notifications" },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-4 rounded-2xl glass border border-white/[0.06] hover:border-white/[0.1] transition-all"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${ACCENT}15` }}
              >
                <Icon size={16} style={{ color: ACCENT }} />
              </div>
              <p className="text-sm font-bold text-white mb-1">{title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Tech Stack ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: `${ACCENT}99` }}>
          Technology Stack
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Frontend */}
          <div className="p-5 rounded-2xl glass border border-white/[0.06] space-y-3">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Frontend</p>
            {FRONTEND_STACK.map((t) => (
              <div key={t.name} className="flex items-start gap-3 group cursor-default" title={t.why}>
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: ACCENT }}
                />
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {t.name}
                  </span>
                  <p className="text-xs text-slate-600 leading-snug">{t.why}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Backend */}
          <div className="p-5 rounded-2xl glass border border-white/[0.06] space-y-3">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Backend</p>
            {BACKEND_STACK.map((t) => (
              <div key={t.name} className="flex items-start gap-3 group cursor-default" title={t.why}>
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: "#3b82f6" }}
                />
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {t.name}
                  </span>
                  <p className="text-xs text-slate-600 leading-snug">{t.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── 3-Role Portal Tabs ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: `${ACCENT}99` }}>
          Three User Portals
        </p>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {ROLE_TABS.map((role) => {
            const Icon = role.icon;
            const isActive = activeRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: isActive ? `${role.color}15` : "transparent",
                  border: isActive ? `1px solid ${role.color}30` : "1px solid rgba(255,255,255,0.06)",
                  color: isActive ? role.color : "#94a3b8",
                }}
              >
                <Icon size={15} />
                {role.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-4 mb-5 p-4 rounded-2xl glass border overflow-hidden relative"
              style={{ borderColor: `${currentRole.color}20` }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at 0% 50%, ${currentRole.color}30 0%, transparent 60%)`,
                }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                style={{ background: `${currentRole.color}18` }}
              >
                {(() => { const Icon = currentRole.icon; return <Icon size={20} style={{ color: currentRole.color }} />; })()}
              </div>
              <div className="relative z-10">
                <h4 className="text-base font-bold text-white">{currentRole.label} Portal</h4>
                <p className="text-sm" style={{ color: currentRole.color }}>{currentRole.tagline}</p>
              </div>
              <div
                className="ml-auto relative z-10 px-3 py-1 rounded-lg text-xs font-mono"
                style={{ background: `${currentRole.color}10`, color: currentRole.color }}
              >
                {currentRole.features.length} features
              </div>
            </div>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {currentRole.features.map((f) => (
                <div
                  key={f.name}
                  className="flex items-start gap-3 p-3 rounded-xl glass border border-white/[0.05] hover:border-white/[0.09] transition-all"
                >
                  <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: currentRole.color }} />
                  <div>
                    <p className="text-xs font-semibold text-slate-300">{f.name}</p>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── System Architecture ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: `${ACCENT}99` }}>
          System Architecture
        </p>
        <div className="p-6 rounded-2xl glass border border-white/[0.06]">
          {/* Flow diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Browser */}
            <div
              className="p-4 rounded-xl text-center"
              style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}20` }}
            >
              <p className="text-xs font-mono mb-1" style={{ color: ACCENT }}>BROWSER</p>
              <p className="text-sm font-bold text-white">React SPA</p>
              <p className="text-xs text-slate-500 mt-1">Vercel · Edge CDN</p>
              <div className="mt-2 space-y-1">
                {["TanStack Query", "Socket.io client", "Firebase JS SDK", "Razorpay Checkout"].map(t => (
                  <div key={t} className="text-[10px] font-mono text-slate-600">{t}</div>
                ))}
              </div>
            </div>
            {/* API */}
            <div
              className="p-4 rounded-xl text-center"
              style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }}
            >
              <p className="text-xs font-mono text-blue-400 mb-1">API SERVER</p>
              <p className="text-sm font-bold text-white">Express.js</p>
              <p className="text-xs text-slate-500 mt-1">Render · Node 26</p>
              <div className="mt-2 space-y-1">
                {["25+ REST endpoints", "Firebase Admin verify", "Socket.io server", "Razorpay SDK", "Helmet + rate-limit"].map(t => (
                  <div key={t} className="text-[10px] font-mono text-slate-600">{t}</div>
                ))}
              </div>
            </div>
            {/* Services */}
            <div
              className="p-4 rounded-xl text-center"
              style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)" }}
            >
              <p className="text-xs font-mono text-purple-400 mb-1">SERVICES</p>
              <p className="text-sm font-bold text-white">Cloud</p>
              <p className="text-xs text-slate-500 mt-1">Managed · Free tier</p>
              <div className="mt-2 space-y-1">
                {["MongoDB Atlas", "Firebase Auth", "Cloudinary", "Razorpay", "Resend"].map(t => (
                  <div key={t} className="text-[10px] font-mono text-slate-600">{t}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Auth flow */}
          <div className="pt-4 border-t border-white/[0.05]">
            <p className="text-xs font-mono text-slate-600 mb-3 uppercase tracking-wider">Authentication Flow</p>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {[
                { text: "Firebase sign-in", color: ACCENT },
                { text: "→", color: "#475569" },
                { text: "ID Token (1h TTL)", color: "#94a3b8" },
                { text: "→", color: "#475569" },
                { text: "Bearer header", color: "#94a3b8" },
                { text: "→", color: "#475569" },
                { text: "Firebase Admin verify", color: "#3b82f6" },
                { text: "→", color: "#475569" },
                { text: "Role from MongoDB", color: "#a855f7" },
                { text: "→", color: "#475569" },
                { text: "401 → refresh + retry", color: "#f59e0b" },
              ].map((s, i) => (
                <span key={i} style={{ color: s.color }} className="font-mono">{s.text}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Data Models ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: `${ACCENT}99` }}>
          8 MongoDB Data Models
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {DATA_MODELS.map((m, i) => (
            <div key={m.name} className="p-3 rounded-xl glass border border-white/[0.05] flex items-start gap-3">
              <span
                className="text-xs font-mono font-bold px-2 py-0.5 rounded flex-shrink-0 mt-0.5"
                style={{ background: `${ACCENT}10`, color: ACCENT }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white mb-0.5">{m.name}</p>
                <p className="text-xs text-slate-500 font-mono leading-snug break-all">{m.fields}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Technical Decisions ── */}
      <motion.div variants={fadeInUp}>
        <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: `${ACCENT}99` }}>
          Key Technical Decisions
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {TECH_DECISIONS.map((item, i) => (
            <AccordionCard key={item.title} item={item} index={i} />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Numbers Bar ── */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "30+",   label: "Pages & Routes" },
            { value: "25+",   label: "API Endpoints" },
            { value: "8",     label: "MongoDB Models" },
            { value: "3",     label: "Auth Methods" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-2xl text-center glass border border-white/[0.06]">
              <div
                className="text-2xl font-black mb-1"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #34d399)`,
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
