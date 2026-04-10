"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ProjectData } from "@/datas/ProjectData";
import Link from "next/link";

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    "All",
    "Full Stack Development",
    "Mobile Development",
    "AI Development",
  ];
  const [activeCategory, setActiveCategory] = useState(
    "Full Stack Development",
  );

  const filteredProjects =
    activeCategory === "All"
      ? ProjectData.projects
      : ProjectData.projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative content-section overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="section-container relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[4px] text-[var(--gray-5)] uppercase mb-4">
            02 — Projects
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Selected <span className="text-[var(--gray-6)]">work</span>
          </h2>
        </motion.div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 font-mono text-xs tracking-widest border transition-all duration-300
                ${
                  activeCategory === cat
                    ? "border-white text-white bg-white/10"
                    : "border-[var(--gray-3)] text-[var(--gray-5)] hover:border-white hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
              }}
              className="group relative block p-6 md:p-8 bg-black/60 backdrop-blur-sm border border-[var(--gray-3)] hover:border-white transition-all duration-500 overflow-hidden"
            >
              {/* Project number */}
              <span className="absolute top-6 right-6 font-mono text-xs text-[var(--gray-4)] tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* CATEGORY */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] tracking-[3px] text-[var(--gray-5)] uppercase px-2 py-1 border border-[var(--gray-3)]">
                  {project.category}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:translate-x-2 transition-transform duration-300">
                {project.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-[var(--gray-6)] leading-relaxed mb-6 font-mono">
                {project.description}
              </p>

              {/* TECH STACK */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wider text-[var(--gray-5)] bg-[var(--gray-2)] px-3 py-1 border border-[var(--gray-3)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-6">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    className="text-xs font-mono tracking-widest border border-[var(--gray-3)] px-3 py-1 hover:border-white hover:text-white transition"
                  >
                    GitHub
                  </Link>
                )}

                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    className="text-xs font-mono tracking-widest border border-[var(--gray-3)] px-3 py-1 hover:border-white hover:text-white transition"
                  >
                    Live
                  </Link>
                )}
              </div>

              {/* ARROW */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <span className="font-mono text-sm text-white">→</span>
              </div>

              {/* HOVER LINE */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
