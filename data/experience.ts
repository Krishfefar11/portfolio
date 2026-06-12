import type { Experience, Education, Achievement } from "@/types";

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Software Developer Intern",
    company: "Nexians Technology",
    duration: "May 2025 – June 2025",
    location: "Remote",
    type: "internship",
    description: [
      "Contributed to production-grade web applications across the full MERN stack, gaining hands-on exposure to real-world frontend and backend workflows under mentorship.",
      "Applied React performance best practices — including memoization and component decomposition — while working on live UI modules used by end users.",
      "Built and consumed REST APIs with Node.js and Express, focusing on request validation, error handling, and MongoDB integration.",
    ],
    skills: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    certificate: true,
  },
];

export const EDUCATION: Education[] = [
  {
    id: 1,
    degree: "Bachelor's Degree, Information Technology",
    institution: "Charotar University of Science and Technology",
    shortName: "CHARUSAT",
    duration: "2023 – Expected 2027",
    cgpa: "7.30 / 10.0",
    location: "Gujarat, India",
    relevant: [
      "Data Structures & Algorithms",
      "Web Development",
      "Database Management Systems",
      "Machine Learning",
      "Operating Systems",
      "Object-Oriented Programming",
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "TCS CodeVita Season 12",
    description:
      "Secured Global Rank 2931 among 100,000+ national and international participants in one of the world's largest coding competitions.",
    icon: "Trophy",
    color: "emerald",
    certificate: true,
  },
  {
    id: 2,
    title: "IBM Machine Learning Certificate",
    description:
      "Hands-on expertise in supervised, unsupervised, and deep learning including time series analysis and reinforcement learning.",
    icon: "Award",
    color: "blue",
    certificate: true,
  },
  {
    id: 3,
    title: "Community Scholar",
    description:
      "Awarded for highest academic performance in SSC Examination — recognized for academic excellence across the district.",
    icon: "Star",
    color: "cyan",
    year: "Jun 2021",
  },
];

export const STATS = [
  { value: 5, suffix: "+", label: "Projects Built", icon: "FolderGit2" },
  { value: 1, suffix: "", label: "Internship", icon: "Briefcase" },
  { value: 7.3, suffix: "/10", label: "CGPA", icon: "GraduationCap" },
  { value: 100000, suffix: "+", label: "CodeVita Contestants", icon: "Trophy" },
];
