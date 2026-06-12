import type { NavLink, SocialLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Krishfefar11",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/patelkrish11",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:fefarkrish26@gmail.com",
    icon: "mail",
  },
];

export const PERSONAL = {
  name: "Krish Fefar",
  initials: "KF",
  title: "Full Stack Developer",
  email: "fefarkrish26@gmail.com",
  phone: "+91 7600493892",
  github: "Krishfefar11",
  linkedin: "patelkrish11",
  location: "India",
  university: "CHARUSAT",
  available: true,
  bio: "I'm a third-year IT student at CHARUSAT building production-grade full-stack and AI applications. My work sits at the intersection of clean frontend engineering and backend AI pipelines — I don't just experiment with models, I deploy them. Every project I ship is live, documented, and usable by anyone in the world right now.",
};

export const HERO_ROLES = [
  "Full Stack Developer",
  "MERN Stack Engineer",
  "React Developer",
  "Backend Developer",
  "Problem Solver",
];
