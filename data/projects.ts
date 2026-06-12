import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: 1,
    number: "01",
    title: "SwitchOn",
    subtitle: "Feature Flag Management Platform",
    description:
      "A production-grade feature flag management platform — mirrors LaunchDarkly. 4 independently deployed services, real-time SSE, multi-tenant RBAC, JavaScript SDK, and a live demo e-commerce store (VOLT). 12,692 lines of code.",
    tech: ["Node.js", "Express", "MongoDB Atlas", "React", "Vite", "SSE", "JWT", "Docker"],
    github: "https://github.com/Krishfefar11/Switch-On",
    demo: "https://switchon-dashboard.vercel.app",
    featured: true,
    gradient: "from-indigo-500 via-violet-500 to-blue-500",
    accentColor: "#6366f1",
    stats: ["< 50ms SSE", "Multi-tenant", "12,692 LOC"],
  },
  {
    id: 2,
    number: "02",
    title: "TripGenie",
    subtitle: "AI-Powered Travel Planner",
    description:
      "An intelligent travel planning platform powered by the MERN stack and Retrieval-Augmented Generation (RAG). Generates personalized day-wise itineraries based on user preferences, budget, and duration. MongoDB Atlas Vector Search delivers sub-2-second generation times.",
    tech: ["React", "Node.js", "MongoDB Atlas", "Vector Search", "RAG", "Express.js"],
    github: "https://github.com/Krishfefar11",
    demo: "#",
    featured: true,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    accentColor: "#3b82f6",
    stats: ["< 2s generation", "RAG + Vector Search", "Multi-destination"],
  },
];
