"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  GraduationCap,
  Briefcase,
  FolderGit2,
  Trophy,
  MapPin,
  Mail,
  ExternalLink,
} from "lucide-react";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import GradientButton from "@/components/ui/GradientButton";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, cardReveal } from "@/lib/animations";
import { PERSONAL } from "@/constants";
import { TECH_STACK_DISPLAY } from "@/data/skills";
import { STATS } from "@/data/experience";

const STAT_ICONS = { FolderGit2, Briefcase, GraduationCap, Trophy };

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <SectionWrapper id="about" number="01" blobVariant="subtle">
      <SectionHeading
        overline="Who I am"
        title="About"
        titleGradient="Me"
        subtitle="A passionate developer building the future, one commit at a time."
      />

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* ── Left: Visual Column ── */}
        <motion.div
          variants={fadeInLeft}
          className="flex flex-col items-center lg:items-start gap-8"
        >
          {/* Profile Avatar with animated ring */}
          <div className="relative">
            <motion.div
              className="w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Gradient placeholder (replace with actual image) */}
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(52,211,153,0.15) 0%, rgba(59,130,246,0.15) 100%)",
                }}
              >
                <span className="text-8xl font-black gradient-text">{PERSONAL.initials}</span>
              </div>

              {/* Inner glow overlay */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(52,211,153,0.05) 0%, rgba(59,130,246,0.05) 100%)",
                }}
              />
            </motion.div>

            {/* Animated border ring */}
            <motion.div
              className="absolute -inset-[2px] rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(52,211,153,0.5), rgba(59,130,246,0.5))",
                zIndex: -1,
              }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating corner badges */}
            <motion.div
              className="absolute -top-4 -right-4 glass border border-emerald-400/20 rounded-xl px-3 py-1.5 text-xs font-mono text-emerald-400"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              &lt;Krish /&gt;
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 glass border border-blue-500/20 rounded-xl px-3 py-1.5 text-xs font-mono text-blue-400"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              MERN Stack
            </motion.div>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            {[
              { icon: MapPin, text: "Gujarat, India", color: "text-emerald-400" },
              { icon: Mail, text: PERSONAL.email, color: "text-blue-400" },
              { icon: GraduationCap, text: "CHARUSAT, Expected 2027", color: "text-cyan-400" },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-slate-400">
                <span className={`${color} flex-shrink-0`}>
                  <Icon size={15} />
                </span>
                <span className="truncate">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: Content Column ── */}
        <motion.div variants={fadeInRight} className="flex flex-col gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Full Stack Developer &{" "}
              <span className="gradient-text">MERN Enthusiast</span>
            </h3>
            <p className="text-slate-400 leading-relaxed text-base md:text-lg">
              {PERSONAL.bio}
            </p>
            <p className="text-slate-400 leading-relaxed text-base md:text-lg mt-3">
              My work spans from building{" "}
              <span className="text-emerald-400 font-medium">real-time dashboards</span> with
              Server-Sent Events to engineering{" "}
              <span className="text-blue-400 font-medium">AI-powered platforms</span> using
              RAG and vector search. I care deeply about clean architecture, performance, and
              developer experience.
            </p>
          </div>

          {/* Tech stack display */}
          <div>
            <p className="text-slate-500 text-sm font-mono uppercase tracking-widest mb-4">
              Tech Stack
            </p>
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap gap-2"
            >
              {TECH_STACK_DISPLAY.map((tech) => (
                <motion.span
                  key={tech.name}
                  variants={cardReveal}
                  className="px-3 py-1.5 rounded-lg glass border border-white/[0.08] text-sm font-medium text-slate-300 transition-all duration-300 hover:border-emerald-400/30 hover:text-white cursor-default"
                  style={{
                    boxShadow: "inset 0 0 0 0 transparent",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 15px ${tech.color}25`,
                  }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{ background: tech.color }}
                  />
                  {tech.name}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap gap-3">
            <GradientButton
              href="#projects"
              variant="primary"
              size="md"
              icon={<ExternalLink size={16} />}
            >
              View Projects
            </GradientButton>
            <GradientButton
              href={`mailto:${PERSONAL.email}`}
              variant="outline"
              size="md"
              icon={<Mail size={16} />}
              iconPosition="left"
            >
              Get in Touch
            </GradientButton>
          </div>
        </motion.div>
      </div>

      {/* ── Stats Row ── */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {STATS.map((stat) => {
          const Icon = STAT_ICONS[stat.icon as keyof typeof STAT_ICONS];
          return (
            <motion.div
              key={stat.label}
              variants={cardReveal}
              className="relative group p-6 rounded-2xl glass border border-white/[0.06] text-center overflow-hidden transition-all duration-300 hover:border-emerald-400/20"
              whileHover={{ y: -4 }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-blue-500/0 group-hover:from-emerald-400/5 group-hover:to-blue-500/5 transition-all duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/15 to-blue-500/15 flex items-center justify-center mx-auto mb-4">
                  {Icon && <Icon size={18} className="text-emerald-400" />}
                </div>
                <div className="text-3xl md:text-4xl font-black gradient-text">
                  {inView ? (
                    <>
                      <CountUp
                        end={stat.value}
                        duration={2}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                      />
                      <span>{stat.suffix}</span>
                    </>
                  ) : (
                    <>0{stat.suffix}</>
                  )}
                </div>
                <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
