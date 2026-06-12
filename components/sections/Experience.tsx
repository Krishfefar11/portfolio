"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  ExternalLink,
  CheckCircle2,
  Trophy,
  Star,
} from "lucide-react";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { EXPERIENCES, EDUCATION, ACHIEVEMENTS } from "@/data/experience";
import { staggerContainer, cardReveal, timelineItem, timelineDot } from "@/lib/animations";

const ACHIEVEMENT_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Trophy, Award, Star,
};

const ACHIEVEMENT_COLORS: Record<string, string> = {
  emerald: "#34d399",
  blue: "#3b82f6",
  cyan: "#22d3ee",
};

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="bg-surface/20" number="04" blobVariant="subtle">
      <SectionHeading
        overline="My journey"
        title="Experience &"
        titleGradient="Education"
        subtitle="Building expertise through real-world projects, internships, and continuous learning."
      />

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
        {/* ── Left: Work Experience + Education ── */}
        <div className="flex flex-col gap-8">
          <motion.h3
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
            }}
            className="flex items-center gap-3 text-lg font-bold text-white"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Briefcase size={15} className="text-white" />
            </span>
            Work Experience
          </motion.h3>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-2 bottom-2 w-px timeline-line" />

            <motion.div variants={staggerContainer} className="flex flex-col gap-8">
              {EXPERIENCES.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={timelineItem}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <motion.div
                    variants={timelineDot}
                    className="absolute left-0 top-6 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.4)] flex-shrink-0"
                  >
                    <Briefcase size={13} className="text-white" />
                  </motion.div>

                  {/* Card */}
                  <div className="p-6 rounded-2xl glass border border-white/[0.07] hover:border-emerald-400/20 transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {exp.role}
                        </h4>
                        <p className="text-emerald-400 text-sm font-medium">{exp.company}</p>
                      </div>
                      {exp.certificate && (
                        <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-mono flex items-center gap-1">
                          <Award size={10} />
                          Certified
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.05] capitalize">
                        {exp.type}
                      </span>
                    </div>

                    {/* Bullets */}
                    <ul className="flex flex-col gap-2 mb-5">
                      {exp.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                          <CheckCircle2
                            size={13}
                            className="text-emerald-400 flex-shrink-0 mt-0.5"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-xs text-slate-400 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Education in timeline */}
              {EDUCATION.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={timelineItem}
                  className="relative pl-12"
                >
                  <motion.div
                    variants={timelineDot}
                    className="absolute left-0 top-6 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)] flex-shrink-0"
                  >
                    <GraduationCap size={13} className="text-white" />
                  </motion.div>

                  <div className="p-6 rounded-2xl glass border border-white/[0.07] hover:border-blue-400/20 transition-all duration-300 group">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                          {edu.shortName}
                        </h4>
                        <p className="text-blue-400 text-sm font-medium">{edu.degree}</p>
                      </div>
                      <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-blue-400/10 border border-blue-400/20 text-blue-400 text-xs font-mono font-bold">
                        {edu.cgpa}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} />
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={11} />
                        {edu.location}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mb-3">Relevant coursework:</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevant.map((course) => (
                        <span
                          key={course}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-xs text-slate-400"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Right: Achievements ── */}
        <div className="flex flex-col gap-8">
          <motion.h3
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
            }}
            className="flex items-center gap-3 text-lg font-bold text-white"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Trophy size={15} className="text-white" />
            </span>
            Achievements
          </motion.h3>

          <motion.div variants={staggerContainer} className="flex flex-col gap-5">
            {ACHIEVEMENTS.map((achievement) => {
              const Icon = ACHIEVEMENT_ICONS[achievement.icon] || Trophy;
              const color = ACHIEVEMENT_COLORS[achievement.color] || "#34d399";

              return (
                <motion.div
                  key={achievement.id}
                  variants={cardReveal}
                  className="group p-6 rounded-2xl glass border border-white/[0.07] hover:border-white/[0.15] transition-all duration-300 relative overflow-hidden"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Background glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 0% 0%, ${color}12 0%, transparent 60%)`,
                    }}
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300"
                      style={{ background: `${color}18`, boxShadow: `0 0 20px ${color}20` }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-white text-sm leading-tight">
                          {achievement.title}
                        </h4>
                        {achievement.year && (
                          <span className="text-xs text-slate-500 flex-shrink-0 font-mono">
                            {achievement.year}
                          </span>
                        )}
                        {achievement.certificate && !achievement.year && (
                          <span
                            className="flex items-center gap-1 text-xs flex-shrink-0 px-2 py-0.5 rounded"
                            style={{
                              color,
                              background: `${color}12`,
                              border: `1px solid ${color}25`,
                            }}
                          >
                            <ExternalLink size={9} />
                            Cert
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Extracurricular activities */}
          <motion.div
            variants={cardReveal}
            className="p-6 rounded-2xl glass border border-white/[0.07]"
          >
            <h4 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Extracurricular
            </h4>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: "Team Captain – Volleyball",
                  org: "Nirmal Science School",
                  period: "2018 – 2020",
                  desc: "Led training drills and represented school at competitive tournaments.",
                },
                {
                  title: "Community Outreach",
                  org: "Local NGO",
                  period: "2022 – 2023",
                  desc: "Conducted skill-development workshops for women in villages.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0 mt-1.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-200">{item.title}</p>
                    <p className="text-xs text-slate-500">
                      {item.org} · {item.period}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
