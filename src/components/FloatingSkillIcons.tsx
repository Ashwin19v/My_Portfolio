"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiFlutter,
  SiDjango,
  SiFastapi,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiMongodb,
  SiFirebase,
  SiMysql,
  SiDocker,
  SiGithubactions,
  SiExpress,
  SiGit,
  SiOpenai,
  SiLangchain,
} from "react-icons/si";
import {
  FaBrain,
  FaRobot,
  FaCode,
  FaTerminal,
  FaDatabase,
  FaServer,
  FaMobileAlt,
  FaCloud,
  FaAws,
} from "react-icons/fa";
import { TbBrandReactNative, TbApi, TbBrandVscode } from "react-icons/tb";
import {
  FaReact,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaHtml5,
  FaJs,
  FaPython,
  FaJava,
} from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaFlutter } from "react-icons/fa6";
import { RiFirebaseFill, RiNextjsLine } from "react-icons/ri";
import { SiPostman, SiPrisma } from "react-icons/si";

import type { IconType } from "react-icons";

/* ── Each floating icon with its label ── */
interface FloatingIcon {
  Icon: IconType;
  label: string;
}

const skillIcons: FloatingIcon[] = [
  { Icon: SiReact, label: "React" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiNodedotjs, label: "Node.js" },
  { Icon: SiPython, label: "Python" },
  { Icon: SiFlutter, label: "Flutter" },
  { Icon: SiDjango, label: "Django" },
  { Icon: SiFastapi, label: "FastAPI" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiJavascript, label: "JavaScript" },
  { Icon: SiTailwindcss, label: "Tailwind" },
  { Icon: SiHtml5, label: "HTML5" },
  { Icon: SiCss, label: "CSS3" },
  { Icon: SiMongodb, label: "MongoDB" },
  { Icon: SiFirebase, label: "Firebase" },
  { Icon: SiMysql, label: "MySQL" },
  { Icon: SiDocker, label: "Docker" },
  { Icon: FaAws, label: "AWS" },
  { Icon: SiGithubactions, label: "GitHub Actions" },
  { Icon: SiExpress, label: "Express" },
  { Icon: SiGit, label: "Git" },
  { Icon: SiOpenai, label: "LLMs" },
  { Icon: SiLangchain, label: "LangChain" },
  { Icon: FaBrain, label: "Gen AI" },
  { Icon: FaRobot, label: "AI Agents" },
  { Icon: FaCode, label: "Code" },
  { Icon: FaTerminal, label: "CLI" },
  { Icon: FaDatabase, label: "Database" },
  { Icon: FaServer, label: "Backend" },
  { Icon: FaMobileAlt, label: "Mobile" },
  { Icon: FaCloud, label: "Cloud" },
  { Icon: TbBrandReactNative, label: "React Native" },
  { Icon: TbApi, label: "REST API" },
  { Icon: TbBrandVscode, label: "VS Code" },
  { Icon: FaReact, label: "React (Alt)" },
  { Icon: FaCss3Alt, label: "CSS3 (Alt)" },
  { Icon: FaNodeJs, label: "Node (Alt)" },
  { Icon: FaGitAlt, label: "Git (Alt)" },
  { Icon: FaGithub, label: "GitHub" },
  { Icon: FaFigma, label: "Figma" },
  { Icon: FaHtml5, label: "HTML5 (Alt)" },
  { Icon: FaJs, label: "JS (Alt)" },
  { Icon: FaPython, label: "Python (Alt)" },
  { Icon: FaJava, label: "Java" },
  { Icon: BiLogoPostgresql, label: "PostgreSQL" },
  { Icon: FaFlutter, label: "Flutter (Alt)" },
  { Icon: RiFirebaseFill, label: "Firebase (Alt)" },
  { Icon: RiNextjsLine, label: "Next.js (Alt)" },
  { Icon: SiPostman, label: "Postman" },
  { Icon: SiPrisma, label: "Prisma" },
];

/* ── Per-icon randomised layout (seeded once on mount) ── */
interface IconPosition {
  x: number; // vw
  y: number; // vh (spread across a tall page)
  size: number; // px
  opacity: number;
  duration: number; // float animation duration
  delay: number;
  rotateRange: number;
  driftX: number;
  driftY: number;
}

function generatePositions(count: number): IconPosition[] {
  const positions: IconPosition[] = [];

  /* Distribute icons evenly across the full height of a ~6-section page.
     We place them in a roughly grid pattern with some randomness to avoid clumps. */
  const cols = 5;
  const rows = Math.ceil(count / cols);

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Base grid position with jitter
    const baseX = (col / cols) * 90 + 5; // 5-95 vw
    const baseY = (row / rows) * 500 + 20; // spread across ~500vh (long page)

    positions.push({
      x: baseX + (Math.random() - 0.5) * 15,
      y: baseY + (Math.random() - 0.5) * 60,
      size: 28 + Math.random() * 32, // 28-60px
      opacity: 0.08 + Math.random() * 0.1, // 0.08-0.18 — visible but not distracting
      duration: 12 + Math.random() * 18, // 12-30s float cycle
      delay: Math.random() * -20,
      rotateRange: 15 + Math.random() * 30,
      driftX: 8 + Math.random() * 16,
      driftY: 6 + Math.random() * 14,
    });
  }

  return positions;
}

export default function FloatingSkillIcons() {
  const [mounted, setMounted] = useState(false);
  const positions = useMemo(() => generatePositions(skillIcons.length), []);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* An absolutely-positioned tall container so icons appear throughout the scroll */}
      <div className="absolute inset-x-0 top-0" style={{ height: "800vh" }}>
        {skillIcons.map(({ Icon, label }, i) => {
          const p = positions[i];
          return (
            <motion.div
              key={label}
              className="absolute"
              style={{
                left: `${p.x}vw`,
                top: `${p.y}vh`,
                fontSize: p.size,
                opacity: p.opacity,
                color: "#ffffff ",
              }}
              animate={{
                x: [0, p.driftX, -p.driftX * 0.6, 0],
                y: [0, -p.driftY, p.driftY * 0.8, 0],
                rotate: [0, p.rotateRange, -p.rotateRange * 0.5, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
              title={label}
            >
              <Icon />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
