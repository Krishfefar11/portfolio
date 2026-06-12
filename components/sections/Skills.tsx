"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Server,
  Database,
  Code2,
  Wrench,
  Brain,
  ChevronRight,
} from "lucide-react";
import {
  SiReact, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiNodedotjs, SiExpress, SiPostman,
  SiMongodb, SiMysql, SiPython, SiCplusplus,
  SiGit, SiKaggle,
} from "react-icons/si";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { SKILL_CATEGORIES } from "@/data/skills";
import { staggerContainer, cardReveal, progressBar } from "@/lib/animations";
import type { SkillCategory } from "@/types";

// Icon mapping — only include verified exports
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  SiReact, SiJavascript, SiHtml5,
  SiCss3: SiCss, SiCss,
  SiTailwindcss, SiNodedotjs, SiExpress, SiPostman,
  SiMongodb, SiMysql, SiPython, SiCplusplus,
  SiGit, SiKaggle,
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  frontend:  Monitor,
  backend:   Server,
  database:  Database,
  languages: Code2,
  aiml:      Brain,
  tools:     Wrench,
};

const CATEGORY_GRADIENT: Record<string, string> = {
  frontend:  "from-emerald-500 to-teal-500",
  backend:   "from-blue-500 to-indigo-500",
  database:  "from-cyan-500 to-blue-500",
  languages: "from-violet-500 to-purple-500",
  aiml:      "from-indigo-500 to-violet-500",
  tools:     "from-orange-500 to-amber-500",
};

const CATEGORY_GLOW: Record<string, string> = {
  frontend:  "rgba(52,211,153,0.25)",
  backend:   "rgba(59,130,246,0.25)",
  database:  "rgba(34,211,238,0.25)",
  languages: "rgba(139,92,246,0.25)",
  aiml:      "rgba(99,102,241,0.25)",
  tools:     "rgba(251,146,60,0.25)",
};

function SkillCard({ skill, index }: { skill: SkillCategory["skills"][0]; index: number }) {
  const IconComponent = ICON_MAP[skill.iconKey];

  return (
    <motion.div
      variants={cardReveal}
      custom={index}
      className="group relative p-4 rounded-2xl glass border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 overflow-hidden cursor-default"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Hover glow bg */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${skill.color}12 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon + Name row */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${skill.color}18` }}
          >
            {IconComponent ? (
              <IconComponent size={18} color={skill.color} />
            ) : (
              <span
                className="text-sm font-bold"
                style={{ color: skill.color }}
              >
                {skill.name[0]}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">{skill.name}</p>
            <p className="text-xs text-slate-500">{skill.level}%</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: skill.color }}
            variants={progressBar(skill.level)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function CategoryTab({
  category,
  isActive,
  onClick,
}: {
  category: SkillCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = CATEGORY_ICONS[category.id] || Code2;
  const gradient = CATEGORY_GRADIENT[category.id];

  return (
    <motion.button
      onClick={onClick}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full text-left ${
        isActive
          ? "glass border border-white/[0.12] text-white"
          : "text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
      }`}
      whileHover={{ x: isActive ? 0 : 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
          isActive ? `bg-gradient-to-br ${gradient}` : "bg-white/[0.05] group-hover:bg-white/[0.08]"
        }`}
      >
        <Icon size={15} className="text-white" />
      </span>
      <span className="flex-1">{category.label}</span>
      {isActive && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-emerald-400"
        >
          <ChevronRight size={14} />
        </motion.span>
      )}
    </motion.button>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(SKILL_CATEGORIES[0].id);
  const currentCategory = SKILL_CATEGORIES.find((c) => c.id === activeCategory)!;
  const gradient = CATEGORY_GRADIENT[activeCategory];
  const glow = CATEGORY_GLOW[activeCategory];

  return (
    <SectionWrapper id="skills" className="bg-surface/30" number="02" blobVariant="subtle">
      <SectionHeading
        overline="What I work with"
        title="Technical"
        titleGradient="Skills"
        subtitle="A curated toolkit built from real projects — not just tutorials."
      />

      <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
        {/* ── Sidebar: Category Tabs ── */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide"
        >
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex-shrink-0 lg:flex-shrink-[unset] w-auto lg:w-full">
              <CategoryTab
                category={cat}
                isActive={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            </div>
          ))}
        </motion.div>

        {/* ── Main: Skills Grid ── */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8 p-5 rounded-2xl glass border border-white/[0.06] overflow-hidden relative">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(circle at 0% 50%, ${glow} 0%, transparent 60%)`,
                  }}
                />
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} relative z-10 flex-shrink-0`}
                >
                  {(() => {
                    const Icon = CATEGORY_ICONS[activeCategory] || Code2;
                    return <Icon size={22} className="text-white" />;
                  })()}
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white">{currentCategory.label}</h3>
                  <p className="text-sm text-slate-400">
                    {currentCategory.skills.length} technologies
                  </p>
                </div>
              </div>

              {/* Skills grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {currentCategory.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Bottom: All skills cloud ── */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } },
        }}
        className="mt-16 pt-12 border-t border-white/[0.05]"
      >
        <p className="text-center text-slate-500 text-sm font-mono uppercase tracking-widest mb-8">
          All Technologies
        </p>
        <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-3">
          {SKILL_CATEGORIES.flatMap((cat) =>
            cat.skills.map((skill) => (
              <motion.span
                key={`${cat.id}-${skill.name}`}
                variants={cardReveal}
                className="px-4 py-2 rounded-xl glass border border-white/[0.06] text-sm text-slate-300 font-medium transition-all duration-200 hover:text-white hover:border-white/[0.15] cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {skill.name}
              </motion.span>
            ))
          )}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
