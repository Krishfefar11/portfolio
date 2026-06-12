"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  target?: string;
  rel?: string;
  download?: boolean | string;
  disabled?: boolean;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function GradientButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  icon,
  iconPosition = "right",
  target,
  rel,
  download,
  disabled,
}: GradientButtonProps) {
  const baseClasses = cn(
    "relative inline-flex items-center gap-2.5 rounded-xl font-semibold",
    "transition-all duration-300 overflow-hidden group cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50",
    sizeClasses[size],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  const variantContent = {
    primary: (
      <>
        {/* Gradient background */}
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-100 group-hover:opacity-90 transition-opacity" />
        {/* Shine effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        {/* Glow */}
        <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: "0 0 30px rgba(52,211,153,0.5)" }} />
      </>
    ),
    outline: (
      <>
        {/* Gradient border */}
        <span className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-emerald-400/60 to-blue-500/60">
          <span className="absolute inset-[1px] rounded-[11px] bg-[#050505] group-hover:bg-white/5 transition-colors" />
        </span>
      </>
    ),
    ghost: (
      <>
        <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors" />
      </>
    ),
  };

  const textColor = {
    primary: "text-white",
    outline: "text-slate-200 group-hover:text-white",
    ghost: "text-slate-400 group-hover:text-white",
  };

  const content = (
    <>
      {variantContent[variant]}
      <span className={cn("relative z-10 flex items-center gap-2.5", textColor[variant])}>
        {icon && iconPosition === "left" && (
          <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={baseClasses}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {content}
    </motion.button>
  );
}
