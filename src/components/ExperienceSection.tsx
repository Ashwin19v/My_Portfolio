"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    title: "Web Developer",
    company: "SentinelGuard AI",
    period: "2024 —2025",
    description:
      "Designed and developed a secure, scalable web application for real-time threat monitoring using React, Node.js, Next.js. Implemented optimized performance, resulting in a 30% faster load time.",
  },
  {
    title: "Gen AI Engineer",
    company: "AI Solutions Inc.",
    period: "2023 — 2024",
    description:
      "Built RAG pipelines, multi-agent systems with LangGraph and CrewAI, and integrated LLMs into production applications.",
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative content-section overflow-hidden"
    >
      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[4px] text-[var(--gray-5)] uppercase mb-4">
            04 — Experience
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Journey <span className="text-[var(--gray-6)]">& growth</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[var(--gray-5)] -translate-x-1/2" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15 }}
              className={`relative flex flex-col md:flex-row items-start mb-16 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 w-3 h-3 border-2 border-white bg-black rounded-full -translate-x-1/2 z-10 mt-2" />

              {/* Content */}
              <div
                className={`pl-8 md:pl-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                }`}
              >
                <p className="font-mono text-[10px] tracking-[3px] text-[var(--gray-5)] uppercase mb-2">
                  {exp.period}
                </p>
                <h3 className="text-xl font-bold tracking-tight mb-1">
                  {exp.title}
                </h3>
                <p className="font-mono text-sm text-[var(--gray-6)] mb-3">
                  {exp.company}
                </p>
                <p className="text-sm text-[var(--gray-5)] leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
