import type { Variants } from "framer-motion";

// ─── Easing Functions ─────────────────────────────────────────────────────────
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.22, 1, 0.36, 1] as const;
export const SPRING_SOFT = { type: "spring", stiffness: 200, damping: 20 };
export const SPRING_STIFF = { type: "spring", stiffness: 400, damping: 30 };

// ─── Fade Variants ────────────────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

// ─── Scale Variants ───────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

// ─── Container / Stagger ─────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

// ─── Text / Word Reveal ───────────────────────────────────────────────────────
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -30 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
};

// ─── Card Variants ────────────────────────────────────────────────────────────
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: SPRING_SOFT,
  },
};

// ─── Timeline Variants ────────────────────────────────────────────────────────
export const timelineItem: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const timelineDot: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 20, delay: 0.2 },
  },
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────
export const progressBar = (level: number): Variants => ({
  hidden: { width: 0 },
  visible: {
    width: `${level}%`,
    transition: { duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.3 },
  },
});

// ─── Navbar ───────────────────────────────────────────────────────────────────
export const navReveal: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export const mobileMenuReveal: Variants = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: { duration: 0.35, ease: EASE_IN_OUT },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: { duration: 0.25, ease: EASE_IN_OUT },
  },
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};
