"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalSection from "./TerminalSection";

const commands = [
  { label: "Go to Home", action: "#hero", icon: "⌂" },
  { label: "Go to About", action: "#about", icon: "◉" },
  { label: "Go to Projects", action: "#projects", icon: "◫" },
  { label: "Go to Skills", action: "#skills", icon: "⚙" },
  { label: "Go to Experience", action: "#experience", icon: "◈" },
  { label: "Go to Contact", action: "#contact", icon: "✉" },
  { label: "Download Resume", action: "download", icon: "↓" },
  { label: "Open GitHub", action: "https://github.com", icon: "⟠" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      setOpen((prev) => !prev);
      setQuery("");
      setActiveIndex(0);
    }
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const executeCommand = (cmd: (typeof commands)[0]) => {
    setOpen(false);
    if (cmd.action === "download") {
      const link = document.createElement("a");
      link.href = "/Ashwin%20Resume.pdf";
      link.download = "Ashwin Resume.pdf";
      link.click();
    } else if (cmd.action.startsWith("http")) {
      window.open(cmd.action, "_blank");
    } else {
      document
        .querySelector(cmd.action)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      executeCommand(filtered[activeIndex]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="command-palette-overlay"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="command-palette-stack"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="command-palette">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type a command..."
                />
                <div className="command-palette-results">
                  {filtered.map((cmd, i) => (
                    <div
                      key={cmd.label}
                      className={`command-palette-item ${
                        i === activeIndex ? "active" : ""
                      }`}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <span style={{ fontSize: 16 }}>{cmd.icon}</span>
                      <span>{cmd.label}</span>
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div
                      className="command-palette-item"
                      style={{ opacity: 0.5 }}
                    >
                      No results found
                    </div>
                  )}
                </div>
              </div>

              <div className="command-terminal-shell">
                <TerminalSection />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
