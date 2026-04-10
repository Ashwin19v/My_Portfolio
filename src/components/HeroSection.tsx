"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const roles = ["Full Stack Developer", "App Developer", "Gen AI Engineer"];

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Typing animation
  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(role.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  // Parallax mouse effect
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Floating geometric shapes */}
      <motion.div
        animate={{ x: mouse.x * 1.5, y: mouse.y * 1.5 }}
        transition={{ type: "spring", damping: 30 }}
        className="absolute top-[15%] right-[20%] w-40 h-40 border border-white/10 rotate-45"
      />
      <motion.div
        animate={{ x: mouse.x * -1, y: mouse.y * -1 }}
        transition={{ type: "spring", damping: 30 }}
        className="absolute bottom-[20%] left-[10%] w-24 h-24 border border-white/5 rounded-full"
      />
      <motion.div
        animate={{ x: mouse.x * 0.8, y: mouse.y * 0.8, rotate: 360 }}
        transition={{
          x: { type: "spring", damping: 30 },
          y: { type: "spring", damping: 30 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
        className="absolute top-[60%] right-[15%] w-16 h-16 border border-white/8"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-20"
        >
          <p className="font-mono text-sm md:text-base text-[var(--gray-5)] tracking-[8px] uppercase">
            &lt;hello world /&gt;
          </p>

          <h1 className="flex flex-col gap-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="text-white leading-[1.2]">
              I&apos;m{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--gray-5)]">
                  Ashwin
                </span>
                <motion.span
                  className="absolute -bottom-4 left-0 h-[3px] bg-white/60"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                />
              </span>
            </span>

            <span className="block text-[var(--gray-6)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-wide">
              I engineer solutions, not just code
            </span>
          </h1>
        </motion.div>

        {/* Typing text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className=""
        >
          <p className="font-mono text-xl md:text-2xl text-[var(--gray-7)] tracking-wide leading-relaxed">
            {">"} {displayText}
            <span className="typing-cursor ml-1.5" />
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-8 flex-wrap"
        >
          <button
            className="magnetic-btn px-10 py-5 text-lg"
            onClick={() => scrollTo("#projects")}
          >
            <span>View Projects</span>
          </button>
          <button
            className="magnetic-btn px-10 py-5 text-lg"
            onClick={() => scrollTo("#contact")}
          >
            <span>Get in Touch</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="font-mono text-xs tracking-[4px] text-[var(--gray-5)] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-14 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
