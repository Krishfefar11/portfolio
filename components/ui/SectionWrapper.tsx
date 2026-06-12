"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import BackgroundBlobs from "./BackgroundBlobs";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  blobs?: boolean;
  blobVariant?: "section" | "subtle";
  number?: string;
}

export default function SectionWrapper({
  id,
  children,
  className,
  blobs = true,
  blobVariant = "section",
  number,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("relative py-24 md:py-32 overflow-hidden", className)}
    >
      {blobs && <BackgroundBlobs variant={blobVariant} />}
      {number && <span className="section-number">{number}</span>}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  );
}

// ─── Section Heading Component ────────────────────────────────────────────────
interface SectionHeadingProps {
  overline?: string;
  title: string;
  titleGradient?: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  overline,
  title,
  titleGradient,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn("mb-16 md:mb-20", centered && "text-center")}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {overline && (
        <p className="text-emerald-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3 font-mono">
          {overline}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
        {title}{" "}
        {titleGradient && <span className="gradient-text">{titleGradient}</span>}
      </h2>
      {subtitle && (
        <p className="mt-5 text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {/* Decorative underline */}
      <div className={cn("mt-6 flex gap-2", centered && "justify-center")}>
        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500" />
        <div className="h-1 w-6 rounded-full bg-gradient-to-r from-blue-500 to-transparent" />
        <div className="h-1 w-3 rounded-full bg-blue-500/30" />
      </div>
    </motion.div>
  );
}
