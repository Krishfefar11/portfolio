import type { SkillCategory } from "@/types";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "Monitor",
    color: "emerald",
    glow: "rgba(52,211,153,0.3)",
    skills: [
      { name: "React.js", iconKey: "SiReact", level: 88, color: "#61DAFB" },
      { name: "JavaScript", iconKey: "SiJavascript", level: 87, color: "#F7DF1E" },
      { name: "HTML5", iconKey: "SiHtml5", level: 95, color: "#E34F26" },
      { name: "CSS3", iconKey: "SiCss", level: 90, color: "#1572B6" },
      { name: "Tailwind CSS", iconKey: "SiTailwindcss", level: 82, color: "#38BDF8" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "Server",
    color: "blue",
    glow: "rgba(59,130,246,0.3)",
    skills: [
      { name: "Node.js", iconKey: "SiNodedotjs", level: 85, color: "#339933" },
      { name: "Express.js", iconKey: "SiExpress", level: 83, color: "#ffffff" },
      { name: "REST APIs", iconKey: "SiPostman", level: 86, color: "#FF6C37" },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: "Database",
    color: "cyan",
    glow: "rgba(34,211,238,0.3)",
    skills: [
      { name: "MongoDB", iconKey: "SiMongodb", level: 84, color: "#47A248" },
      { name: "MySQL", iconKey: "SiMysql", level: 78, color: "#4479A1" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    icon: "Code2",
    color: "violet",
    glow: "rgba(139,92,246,0.3)",
    skills: [
      { name: "JavaScript", iconKey: "SiJavascript", level: 87, color: "#F7DF1E" },
      { name: "Python", iconKey: "SiPython", level: 79, color: "#3776AB" },
      { name: "Java", iconKey: "JAVA", level: 74, color: "#ED8B00" },
      { name: "C++", iconKey: "SiCplusplus", level: 72, color: "#00599C" },
    ],
  },
  {
    id: "aiml",
    label: "AI / ML",
    icon: "Brain",
    color: "violet",
    glow: "rgba(139,92,246,0.3)",
    skills: [
      { name: "RAG Pipeline",             iconKey: "SiOpenai",   level: 85, color: "#6366f1" },
      { name: "Vector Search",            iconKey: "SiMongodb",  level: 82, color: "#8b5cf6" },
      { name: "Groq API (llama-3.3-70b)", iconKey: "SiOpenai",   level: 80, color: "#a78bfa" },
      { name: "all-MiniLM-L6-v2",         iconKey: "SiOpenai",   level: 78, color: "#7c3aed" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Analytics",
    icon: "Wrench",
    color: "orange",
    glow: "rgba(251,146,60,0.3)",
    skills: [
      { name: "Git", iconKey: "SiGit", level: 88, color: "#F05032" },
      { name: "Power BI", iconKey: "PBI", level: 70, color: "#F2C811" },
      { name: "Tableau", iconKey: "TAB", level: 68, color: "#E97627" },
      { name: "Kaggle", iconKey: "SiKaggle", level: 72, color: "#20BEFF" },
    ],
  },
];

export const TECH_STACK_DISPLAY = [
  { name: "React", color: "#61DAFB" },
  { name: "Node.js", color: "#339933" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Express.js", color: "#ffffff" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "Python", color: "#3776AB" },
  { name: "MySQL", color: "#4479A1" },
  { name: "Git", color: "#F05032" },
];
