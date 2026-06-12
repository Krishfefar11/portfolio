"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import BackgroundBlobs from "@/components/ui/BackgroundBlobs";
import GradientButton from "@/components/ui/GradientButton";
import { heroContainer, heroItem } from "@/lib/animations";
import { PERSONAL, HERO_ROLES } from "@/constants";

// Build type sequence for react-type-animation: [text, delay, text, delay, ...]
const TYPE_SEQUENCE: (string | number)[] = HERO_ROLES.flatMap((role) => [role, 2200]);

const SOCIAL_ICONS = [
  {
    icon: Github,
    href: `https://github.com/${PERSONAL.github}`,
    label: "GitHub",
    color: "hover:text-white",
  },
  {
    icon: Linkedin,
    href: `https://linkedin.com/in/${PERSONAL.linkedin}`,
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    icon: Mail,
    href: `mailto:${PERSONAL.email}`,
    label: "Email",
    color: "hover:text-emerald-400",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background ── */}
      <BackgroundBlobs variant="hero" />

      {/* ── Content ── */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Available badge */}
        <motion.div variants={heroItem} className="mb-8">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-emerald-400/20 text-sm font-medium text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={heroItem}
          className="text-slate-400 text-lg md:text-xl font-medium mb-3"
        >
          Hi there, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={heroItem}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-4"
        >
          <span className="gradient-text glow-emerald">{PERSONAL.name}</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          variants={heroItem}
          className="flex items-center gap-3 mb-6 h-12 md:h-14"
        >
          <span className="text-slate-500 text-xl md:text-2xl font-light">&lt;</span>
          <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-200 font-mono min-w-[280px] text-left">
            <TypeAnimation
              sequence={TYPE_SEQUENCE}
              wrapper="span"
              speed={50}
              deletionSpeed={65}
              repeat={Infinity}
            />
          </span>
          <span className="text-slate-500 text-xl md:text-2xl font-light">/&gt;</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={heroItem}
          className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mb-10"
        >
          Building scalable{" "}
          <span className="text-emerald-400 font-medium">MERN stack</span> applications
          — from AI-powered travel planners to real-time feature flag platforms.
          Passionate about crafting experiences that matter.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={heroItem}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <GradientButton
            href="#projects"
            variant="primary"
            size="lg"
            icon={<ArrowRight size={18} />}
          >
            View Projects
          </GradientButton>
          <GradientButton
            href="https://drive.google.com/drive/folders/1vBEE_CDlPvkbsY62_fv7ZSBpRmFU_cC2"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            icon={<Download size={16} />}
          >
            Download Resume
          </GradientButton>
        </motion.div>

        {/* Social links */}
        <motion.div variants={heroItem} className="flex items-center gap-2">
          {SOCIAL_ICONS.map(({ icon: Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`w-11 h-11 rounded-xl glass border border-white/[0.08] flex items-center justify-center text-slate-400 ${color} transition-all duration-300`}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: "0 0 0 0 rgba(52,211,153,0)",
              }}
            >
              <Icon size={18} />
            </motion.a>
          ))}

          <span className="mx-3 h-px w-12 bg-gradient-to-r from-white/20 to-transparent" />

          <span className="text-slate-500 text-sm font-mono">
            {PERSONAL.github}
          </span>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* ── Decorative stat strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 border-t border-white/[0.04] hidden lg:flex"
      >
        <div className="max-w-7xl mx-auto px-8 w-full flex items-center justify-between py-4">
          {[
            { label: "Projects Built", value: "5+" },
            { label: "Technologies", value: "10+" },
            { label: "CGPA", value: "7.3" },
            { label: "CodeVita Rank", value: "#2931" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex items-center gap-4 ${i < 3 ? "border-r border-white/[0.06] pr-8 mr-8" : ""}`}
            >
              <span className="text-2xl font-black gradient-text">{stat.value}</span>
              <span className="text-slate-500 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
