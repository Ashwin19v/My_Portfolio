"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skillsData as skills } from "../datas/SkillsData";

interface Skill {
  name: string;
  category: string;
  ring: "inner" | "outer";
}
const categories = [
  "All",
  "Frontend",
  "Backend",
  "Mobile",
  "Database",
  "DevOps",
  "GenAI",
  "Language",
];

const categoryColors: Record<string, string> = {
  Frontend: "rgba(255,255,255,0.9)",
  Backend: "rgba(200,200,200,0.9)",
  Mobile: "rgba(220,220,220,0.9)",
  Database: "rgba(180,180,180,0.9)",
  DevOps: "rgba(160,160,160,0.9)",
  "Gen AI": "rgba(240,240,240,0.9)",
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [filter, setFilter] = useState("All");
  const [rotation, setRotation] = useState({ inner: 0, outer: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const wheelRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  // Continuous rotation animation
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      const speed = isHovered ? 0.4 : 0.15;

      setRotation((prev) => ({
        inner: prev.inner + delta * speed * 60,
        outer: prev.outer - delta * speed * 40,
      }));

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isHovered]);

  // 3D tilt on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  }, []);

  const innerSkills = skills.filter((s) => s.ring === "inner");
  const outerSkills = skills.filter((s) => s.ring === "outer");

  const filteredInner =
    filter === "All"
      ? innerSkills
      : innerSkills.filter((s) => s.category === filter);
  const filteredOuter =
    filter === "All"
      ? outerSkills
      : outerSkills.filter((s) => s.category === filter);

  // Responsive radius
  const [radii, setRadii] = useState({ inner: 160, outer: 280 });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setRadii({ inner: 100, outer: 175 });
      else if (w < 1024) setRadii({ inner: 140, outer: 240 });
      else setRadii({ inner: 160, outer: 280 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      id="skills"
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
            03 — Skills
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Tech <span className="text-[var(--gray-6)]">stack</span>
          </h2>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-16 justify-center"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-[10px] tracking-[3px] uppercase px-4 py-2 border transition-all duration-300 ${
                filter === cat
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-[var(--gray-6)] border-[var(--gray-4)] hover:border-[var(--gray-6)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Rotating Wheel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex justify-center items-center"
        >
          <div
            ref={wheelRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePos({ x: 0, y: 0 });
            }}
            onMouseMove={handleMouseMove}
            className="relative"
            style={{
              width: radii.outer * 2 + 100,
              height: radii.outer * 2 + 100,
              perspective: 1000,
            }}
          >
            <div
              style={{
                transform: `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
                transition: "transform 0.3s ease-out",
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Orbit circles */}
              <div
                className="absolute rounded-full border border-white/20"
                style={{
                  width: radii.inner * 2,
                  height: radii.inner * 2,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <div
                className="absolute rounded-full border border-white/15"
                style={{
                  width: radii.outer * 2,
                  height: radii.outer * 2,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              {/* Extra decorative orbit */}
              <div
                className="absolute rounded-full border border-white/10"
                style={{
                  width: radii.outer * 2 + 80,
                  height: radii.outer * 2 + 80,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Center label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                <AnimatePresence mode="wait">
                  {selectedSkill ? (
                    <motion.div
                      key={selectedSkill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <p className="text-xl md:text-2xl font-bold tracking-tight">
                        {selectedSkill.name}
                      </p>
                      <p className="font-mono text-xs text-[var(--gray-5)] tracking-[3px] uppercase mt-1">
                        {selectedSkill.category}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="font-mono text-[10px] tracking-[5px] text-[var(--gray-5)] uppercase">
                        Tech Stack
                      </p>
                      <div className="w-8 h-px bg-[var(--gray-4)] mx-auto mt-2" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Inner ring skills */}
              {filteredInner.map((skill, i) => {
                const angle = (i / filteredInner.length) * 360 + rotation.inner;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * radii.inner;
                const y = Math.sin(rad) * radii.inner;
                const isSelected = selectedSkill?.name === skill.name;
                const depthScale = 0.7 + 0.3 * ((Math.sin(rad) + 1) / 2);

                return (
                  <motion.button
                    key={skill.name}
                    onClick={() => setSelectedSkill(isSelected ? null : skill)}
                    className="absolute flex flex-col items-center justify-center gap-1"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) scale(${isSelected ? 1.3 : depthScale})`,
                      zIndex: isSelected ? 30 : Math.round(depthScale * 10),
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-lg hover:shadow-white/20 transition-all">
                      <span className="text-xl text-white">{skill.icon}</span>
                    </div>

                    <span className="text-[10px] font-mono text-white/80">
                      {skill.name}
                    </span>
                  </motion.button>
                );
              })}

              {/* Outer ring skills */}
              {filteredOuter.map((skill, i) => {
                const angle = (i / filteredOuter.length) * 360 + rotation.outer;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * radii.outer;
                const y = Math.sin(rad) * radii.outer;
                const isSelected = selectedSkill?.name === skill.name;
                const depthScale = 0.6 + 0.4 * ((Math.sin(rad) + 1) / 2);

                return (
                  <motion.button
                    key={skill.name}
                    onClick={() => setSelectedSkill(isSelected ? null : skill)}
                    className="absolute flex flex-col items-center gap-1"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) scale(${isSelected ? 1.2 : depthScale})`,
                    }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                      <span className="text-sm text-white/80">
                        {skill.icon}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono text-white/60">
                      {skill.name}
                    </span>
                  </motion.button>
                );
              })}

              {/* Dot connectors on inner orbit */}
              {filteredInner.map((skill, i) => {
                const angle = (i / filteredInner.length) * 360 + rotation.inner;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * radii.inner;
                const y = Math.sin(rad) * radii.inner;
                return (
                  <div
                    key={`dot-inner-${skill.name}`}
                    className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center gap-6 mt-12 flex-wrap"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-white/30" />
            <span className="font-mono text-[10px] text-[var(--gray-5)] tracking-wider">
              INNER = FRAMEWORKS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-white/15" />
            <span className="font-mono text-[10px] text-[var(--gray-5)] tracking-wider">
              OUTER = TOOLS
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
