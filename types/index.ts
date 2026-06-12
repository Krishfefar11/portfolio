// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  featured: boolean;
  gradient: string;
  accentColor: string;
  stats: string[];
  number: string;
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  iconKey: string;
  level: number;
  color: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  glow: string;
  skills: Skill[];
}

// ─── Experience ───────────────────────────────────────────────────────────────
export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  location: string;
  type: "internship" | "fulltime" | "contract" | "freelance";
  description: string[];
  skills: string[];
  certificate?: boolean;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  shortName: string;
  duration: string;
  cgpa: string;
  relevant: string[];
  location: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  year?: string;
  certificate?: boolean;
}

// ─── About Stats ──────────────────────────────────────────────────────────────
export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href: string;
  color: string;
}

// ─── Animation Variants ───────────────────────────────────────────────────────
export interface AnimationVariants {
  hidden: Record<string, number | string>;
  visible: Record<string, number | string | object>;
}
