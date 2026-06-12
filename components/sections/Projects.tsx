"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import SwitchOnShowcase from "@/components/sections/SwitchOnShowcase";
import MedSyncShowcase from "@/components/sections/MedSyncShowcase";
import TripGenieShowcase from "@/components/sections/TripGenieShowcase";
import GroupLunchShowcase from "@/components/sections/GroupLunchShowcase";
import UrbanCloneShowcase from "@/components/sections/UrbanCloneShowcase";
import { PERSONAL } from "@/constants";
import { staggerContainer, cardReveal } from "@/lib/animations";

function ProjectDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-14">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <span className="text-xs font-mono text-slate-600 uppercase tracking-widest px-3 whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" number="03">
      <SectionHeading
        overline="What I've built"
        title="Featured"
        titleGradient="Projects"
        subtitle="Five production-grade systems — feature flags, healthcare SaaS, AI travel planning, collaborative AI ordering, home services marketplace. Real architecture, all live."
      />

      {/* ── 01 · SwitchOn ── */}
      <SwitchOnShowcase />

      <ProjectDivider label="Project 02" />

      {/* ── 02 · MedSync ── */}
      <MedSyncShowcase />

      <ProjectDivider label="Project 03 · Flagship" />

      {/* ── 03 · TripGenie ── */}
      <TripGenieShowcase />

      <ProjectDivider label="Project 04" />

      {/* ── 04 · Group Lunch ── */}
      <GroupLunchShowcase />

      <ProjectDivider label="Project 05" />

      {/* ── 05 · Urban Company Clone ── */}
      <UrbanCloneShowcase />

      {/* ── GitHub CTA ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="mt-14"
      >
        <motion.div
          variants={cardReveal}
          className="p-8 rounded-2xl glass border border-dashed border-white/[0.1] hover:border-emerald-400/20 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 group"
          whileHover={{ y: -3 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] group-hover:bg-emerald-400/10 border border-white/[0.08] group-hover:border-emerald-400/20 flex items-center justify-center transition-all duration-300 flex-shrink-0">
              <Github size={20} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </div>
            <div>
              <p className="text-white font-semibold">More projects on GitHub</p>
              <p className="text-slate-500 text-sm mt-0.5">
                Experiments, contributions, and work-in-progress — all public.
              </p>
            </div>
          </div>
          <motion.a
            href={`https://github.com/${PERSONAL.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-emerald-400 border border-emerald-400/20 hover:bg-emerald-400/8 transition-all"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            @{PERSONAL.github}
            <ExternalLink size={13} />
          </motion.a>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
