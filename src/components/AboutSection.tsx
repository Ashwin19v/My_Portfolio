"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const highlights = [
  {
    title: "Full Stack",
    desc: "End-to-end application development with modern frameworks. React, Next.js, Node.js, and beyond.",
  },
  {
    title: "Mobile",
    desc: "Cross-platform mobile applications with Flutter and React Native. Native performance, shared codebase.",
  },
  {
    title: "Gen AI",
    desc: "Building intelligent systems with LangChain, LangGraph, CrewAI, RAG pipelines, and prompt engineering.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative content-section overflow-hidden"
    >
      <div className="section-container max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="font-mono text-sm tracking-[6px] text-[var(--gray-5)] uppercase ">
            01 — About
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ">
            Engineering <span className="text-[var(--gray-6)]">excellence</span>
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20  ">
          {/* Left column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className=" max-w-3xl">
              <p className="text-xl md:text-2xl text-[var(--gray-7)] leading-[1.8]">
                I&apos;m a developer who believes in the power of clean code,
                minimal design, and scalable architecture.
              </p>
              <p className="text-xl md:text-2xl text-[var(--gray-7)] leading-[1.8]">
                With expertise spanning full-stack web development, mobile
                applications, and generative AI, I build digital products that
                are both powerful and elegant.
              </p>
            </div>

            <div className="flex gap-6 flex-wrap mt-10 ">
              <Link
                href="/Ashwin%20Resume.pdf"
                download="Ashwin Resume.pdf"
                className="magnetic-btn px-10 py-5 text-lg inline-block"
              >
                <span>Download Resume</span>
              </Link>
              <Link
                href="https://github.com/Ashwin19v"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn px-10 py-5 text-lg inline-block"
              >
                <span>GitHub ↗</span>
              </Link>
            </div>
          </motion.div>

          {/* Right column - Add this if you want two columns, or remove if not needed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            {/* You can add content here or remove this column entirely */}
          </motion.div>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-10">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
              className="p-4 border border-[var(--gray-3)] bg-black/60 backdrop-blur-sm hover:border-[var(--gray-5)] transition-all duration-500 group glow-border flex flex-col gap-6 "
            >
              <h3 className="text-2xl font-bold tracking-tight group-hover:translate-x-1 transition-transform">
                {item.title}
              </h3>
              <p className="text-base text-[var(--gray-6)] leading-[1.9] font-mono">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
