import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaDocker,
  FaAws,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiExpress,
  SiPrisma,
  SiTailwindcss,
  SiDjango,
  SiFastapi,
  SiRedux,
  SiGraphql,
  SiKubernetes,
  SiJenkins,
} from "react-icons/si";

import { TbBrandReactNative } from "react-icons/tb";
import { FaFlutter } from "react-icons/fa6";

export interface Skill {
  name: string;
  category: string;
  ring: "inner" | "outer";
  icon: React.ReactNode;
}

export const skillsData: Skill[] = [
  // ================= CORE (INNER RING) =================
  { name: "React.js", category: "Frontend", ring: "inner", icon: <FaReact /> },
  {
    name: "Next.js",
    category: "Frontend",
    ring: "inner",
    icon: <SiNextdotjs />,
  },
  { name: "Node.js", category: "Backend", ring: "inner", icon: <FaNodeJs /> },
  { name: "Django", category: "Backend", ring: "inner", icon: <SiDjango /> },
  { name: "FastAPI", category: "Backend", ring: "inner", icon: <SiFastapi /> },
  { name: "Flutter", category: "Mobile", ring: "inner", icon: <FaFlutter /> },
  {
    name: "React Native",
    category: "Mobile",
    ring: "inner",
    icon: <TbBrandReactNative />,
  },

  // ================= FRONTEND =================
  {
    name: "TypeScript",
    category: "Frontend",
    ring: "outer",
    icon: <SiTypescript />,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    ring: "outer",
    icon: <SiTailwindcss />,
  },
  { name: "Redux", category: "Frontend", ring: "outer", icon: <SiRedux /> },

  // ================= BACKEND =================
  {
    name: "Express.js",
    category: "Backend",
    ring: "outer",
    icon: <SiExpress />,
  },
  { name: "Prisma", category: "Backend", ring: "outer", icon: <SiPrisma /> },
  { name: "GraphQL", category: "Backend", ring: "outer", icon: <SiGraphql /> },

  // ================= DATABASE =================
  { name: "MongoDB", category: "Database", ring: "outer", icon: <SiMongodb /> },
  {
    name: "PostgreSQL",
    category: "Database",
    ring: "outer",
    icon: <SiPostgresql />,
  },
  {
    name: "Firebase",
    category: "Database",
    ring: "outer",
    icon: <SiFirebase />,
  },

  // ================= DEVOPS =================
  { name: "AWS", category: "DevOps", ring: "outer", icon: <FaAws /> },
  { name: "Docker", category: "DevOps", ring: "outer", icon: <FaDocker /> },
  {
    name: "Kubernetes",
    category: "DevOps",
    ring: "outer",
    icon: <SiKubernetes />,
  },
  { name: "Jenkins", category: "DevOps", ring: "outer", icon: <SiJenkins /> },
  { name: "Git", category: "DevOps", ring: "outer", icon: <FaGitAlt /> },

  // ================= LANGUAGES =================
  { name: "Python", category: "Language", ring: "outer", icon: <FaPython /> },
  { name: "Java", category: "Language", ring: "outer", icon: <FaJava /> },

  // ================= GEN AI (🔥 IMPORTANT) =================
  { name: "LangChain", category: "GenAI", ring: "outer", icon: "🧠" },
  { name: "LangGraph", category: "GenAI", ring: "outer", icon: "🔗" },
  { name: "RAG", category: "GenAI", ring: "outer", icon: "📚" },
  { name: "CrewAI", category: "GenAI", ring: "outer", icon: "🤖" },
  { name: "MCP", category: "GenAI", ring: "outer", icon: "⚡" },
];
