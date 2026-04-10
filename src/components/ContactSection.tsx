"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, hook up to an email service / API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative content-section overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[4px] text-[var(--gray-5)] uppercase mb-4">
            05 — Contact
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Let&apos;s <span className="text-[var(--gray-6)]">connect</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-[var(--gray-7)] leading-relaxed mb-8">
              Have a project in mind or want to collaborate? I&apos;m always
              open to discussing new ideas, creative projects, or opportunities
              to be part of something great.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[var(--gray-5)] tracking-wider w-16">
                  EMAIL
                </span>
                <Link
                  href="mailto:hello@developer.com"
                  className="font-mono text-sm text-[var(--gray-7)] hover:text-white transition-colors"
                >
                  ashwinash190105@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[var(--gray-5)] tracking-wider w-16">
                  GITHUB
                </span>
                <Link
                  href="https://github.com/Ashwin19v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[var(--gray-7)] hover:text-white transition-colors"
                >
                  github.com/Ashwin19v
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[var(--gray-5)] tracking-wider w-16">
                  LINKEDIN
                </span>
                <Link
                  href="https://www.linkedin.com/in/ashwin-v-097b09262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[var(--gray-7)] hover:text-white transition-colors"
                >
                  linkedin.com/in/developer
                </Link>
              </div>
            </div>

            {/* Terminal snippet */}
            <div className="p-6 bg-black/60 backdrop-blur-sm border border-[var(--gray-3)] font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--gray-4)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--gray-4)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--gray-4)]" />
                <span className="ml-2 text-[10px] text-[var(--gray-5)] tracking-wider">
                  TERMINAL
                </span>
              </div>
              <p className="text-[var(--gray-5)]">
                <span className="text-[var(--gray-7)]">$</span> npx contact
                --developer
              </p>
              <p className="text-[var(--gray-7)] mt-1">
                → Ready to collaborate. Send a message ↗
              </p>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-mono text-xs tracking-[3px] text-[var(--gray-5)] uppercase mb-3">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full bg-transparent border border-[var(--gray-3)] px-4 py-3 font-mono text-sm text-white outline-none focus:border-white transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-[3px] text-[var(--gray-5)] uppercase mb-3">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full bg-transparent border border-[var(--gray-3)] px-4 py-3 font-mono text-sm text-white outline-none focus:border-white transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-[3px] text-[var(--gray-5)] uppercase mb-3">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full bg-transparent border border-[var(--gray-3)] px-4 py-3 font-mono text-sm text-white outline-none focus:border-white transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button type="submit" className="magnetic-btn w-full">
                <span>{submitted ? "Message Sent ✓" : "Send Message"}</span>
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 md:mt-32 pt-8 border-t border-[var(--gray-3)] flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="font-mono text-xs text-[var(--gray-5)] tracking-wider">
            © {new Date().getFullYear()} DEV. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[var(--gray-4)] tracking-wider">
            Engineered with precision.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
