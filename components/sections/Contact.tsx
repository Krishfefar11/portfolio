"use client";

import { useState, useRef, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone, Send, ArrowRight, CheckCircle2 } from "lucide-react";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import GradientButton from "@/components/ui/GradientButton";
import { PERSONAL } from "@/constants";
import { staggerContainer, cardReveal, fadeInLeft, fadeInRight } from "@/lib/animations";

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: PERSONAL.email,
    href: `mailto:${PERSONAL.email}`,
    color: "#34d399",
    description: "Drop me a message anytime",
  },
  {
    icon: Github,
    label: "GitHub",
    value: `@${PERSONAL.github}`,
    href: `https://github.com/${PERSONAL.github}`,
    color: "#ffffff",
    description: "Explore my open source work",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: `in/${PERSONAL.linkedin}`,
    href: `https://linkedin.com/in/${PERSONAL.linkedin}`,
    color: "#0A66C2",
    description: "Connect professionally",
  },
  {
    icon: Phone,
    label: "Phone",
    value: PERSONAL.phone,
    href: `tel:${PERSONAL.phone.replace(/\s/g, "")}`,
    color: "#22d3ee",
    description: "Available during business hours",
  },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    setError(null);
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try emailing me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="contact" className="bg-surface/20" number="05">
      <SectionHeading
        overline="Let's connect"
        title="Get in"
        titleGradient="Touch"
        subtitle="Have a project in mind, want to collaborate, or just want to say hello? I'd love to hear from you."
      />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
        {/* ── Left: Contact info ── */}
        <motion.div variants={fadeInLeft} className="flex flex-col gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Let&apos;s build something{" "}
              <span className="gradient-text">great together</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              I&apos;m currently open to new opportunities — whether it&apos;s a full-time role,
              internship, or freelance project. My inbox is always open.
            </p>
          </div>

          {/* Contact cards */}
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-4">
            {CONTACT_CARDS.map((card) => (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.label !== "Phone" && card.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                variants={cardReveal}
                className="group p-4 rounded-2xl glass border border-white/[0.07] hover:border-white/[0.15] transition-all duration-300 overflow-hidden relative"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 0% 0%, ${card.color}10 0%, transparent 60%)`,
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${card.color}18` }}
                    >
                      <card.icon size={16} style={{ color: card.color }} />
                    </div>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {card.label}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                    {card.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{card.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Availability indicator */}
          <div className="flex items-center gap-3 p-4 rounded-xl glass border border-emerald-400/15">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Available for Work</p>
              <p className="text-xs text-slate-400">Open to full-time, internship & freelance roles</p>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Contact form ── */}
        <motion.div variants={fadeInRight}>
          <div className="relative p-8 rounded-2xl glass border border-white/[0.07] overflow-hidden">
            {/* Gradient corner */}
            <div
              className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 100% 0%, rgba(52,211,153,0.08) 0%, transparent 60%)",
              }}
            />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12 gap-5"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-400/15 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-sm">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }); }}
                  className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      placeholder="John Doe"
                      className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm transition-all duration-200 focus:border-emerald-400/50 focus:bg-white/[0.06]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      name="reply_to"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm transition-all duration-200 focus:border-emerald-400/50 focus:bg-white/[0.06]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))}
                    placeholder="Project inquiry / Job opportunity / Hello!"
                    className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm transition-all duration-200 focus:border-emerald-400/50 focus:bg-white/[0.06]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    placeholder="Tell me about your project or opportunity..."
                    className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm resize-none transition-all duration-200 focus:border-emerald-400/50 focus:bg-white/[0.06]"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}

                <GradientButton
                  variant="primary"
                  size="lg"
                  icon={loading ? undefined : <Send size={16} />}
                  className="w-full justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </GradientButton>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
