"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────────────
   Linux-style Terminal Chatbot  —  Gemini-powered
   Fixed-height terminal with internal scroll,
   authentic bash prompt, and neofetch-style welcome.
   ────────────────────────────────────────────────────── */

interface Message {
  role: "user" | "assistant" | "system";
  text: string;
}

const USER = "Ashwin";
const HOST = "portfolio";
const CWD = "~";
const PROMPT = `${USER}@${HOST}:${CWD}$`;

const NEOFETCH = [
  "       _,met$$$$$gg.          visitor@portfolio",
  "    ,g$$$$$$$$$$$$$$$P.       ─────────────────",
  '  ,g$$P"      """Y$$.".      OS: Portfolio/Linux x86_64',
  " ,$$P'              `$$$.    Host: Next.js 16",
  "',$$P       ,ggs.     `$$b:  Kernel: React 19",
  "`d$$'     ,$P\"'   .    $$$  Uptime: 3+ years",
  " $$P      d$'     ,    $$P  Packages: 50+ projects",
  " $$:      $$.   -    ,d$$'  Shell: TypeScript/bash",
  " $$;      Y$b._   _,d$P'   Terminal: Gemini AI",
  ' Y$$.    `.`"Y$$$$P"\'       CPU: Full Stack Dev',
  ' `$$b      "-.__             GPU: Gen AI Engineer',
  "  `Y$$                      Memory: React / Node / Python",
  "   `Y$$.                    ",
  "     `$$b.                  Type a question below to chat",
  "       `Y$$b.               with my AI assistant.",
  '          `"Y$b._',
  '              `"""',
];

export default function TerminalSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [neofetchDone, setNeofetchDone] = useState(false);
  const [neofetchIndex, setNeofetchIndex] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState(-1);

  /* ── Sequentially reveal neofetch lines ─────────── */
  useEffect(() => {
    if (!isInView) return;
    if (neofetchIndex >= NEOFETCH.length) {
      if (!neofetchDone) {
        setNeofetchDone(true);
        // Add a blank separator after neofetch
        setMessages((prev) => [
          ...prev,
          { role: "system", text: "─────────────────────────────────────────" },
          {
            role: "assistant",
            text: 'Welcome! I\'m an AI assistant for this portfolio.\nType "help" for available commands, or ask me anything.',
          },
        ]);
      }
      return;
    }

    const timer = setTimeout(
      () => {
        setMessages((prev) => [
          ...prev,
          { role: "system", text: NEOFETCH[neofetchIndex] },
        ]);
        setNeofetchIndex((i) => i + 1);
      },
      neofetchIndex === 0 ? 300 : 40,
    );
    return () => clearTimeout(timer);
  }, [isInView, neofetchIndex, neofetchDone]);

  /* ── Auto-scroll to bottom ─────────────────────── */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  /* ── Focus input when terminal body is clicked ──── */
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  /* ── Trap scroll inside terminal (prevent Lenis page scroll) ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0 && e.deltaY < 0;
      const atBottom =
        scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

      // Only allow page scroll when terminal is fully scrolled in that direction
      if (!atTop && !atBottom) {
        e.stopPropagation();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  /* ── Chat history for Gemini (skip neofetch lines) ── */
  const getChatHistory = useCallback(() => {
    return messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .filter((m) => !m.text.startsWith("Welcome!")) // skip the welcome msg
      .map((m) => ({
        role: m.role === "user" ? "user" : "model",
        text: m.text,
      }));
  }, [messages]);

  /* ── Built-in commands ──────────────────────────── */
  const BUILTIN_COMMANDS: Record<string, () => string> = {
    help: () =>
      [
        "Available commands:",
        "  help        — Show this message",
        "  clear       — Clear the terminal",
        "  skills      — List technical skills",
        "  projects    — List key projects",
        "  contact     — How to reach me",
        "  neofetch    — Show system info",
        "",
        "Or just type a question to chat with the AI.",
      ].join("\n"),
    skills: () =>
      [
        "── Technical Skills ──",
        "Frontend:  React, Next.js, TypeScript, Tailwind CSS",
        "Backend:   Node.js, Express, Django, FastAPI, Python",
        "Mobile:    Flutter, React Native",
        "Database:  MongoDB, Firebase, MySQL",
        "DevOps:    Docker, AWS, CI/CD, Git",
        "Gen AI:    LangChain, LangGraph, CrewAI, RAG",
      ].join("\n"),
    projects: () =>
      [
        "── Key Projects ──",
        "1. AI-Powered SaaS Platform   (Next.js, Node.js, OpenAI)",
        "2. Healthcare Mobile App      (Flutter, Firebase)",
        "3. Dev Collaboration Tool      (React, WebSockets)",
        "4. AI Content Generator        (Python, LangChain, CrewAI)",
        "5. E-Commerce Platform         (Next.js, Stripe, MongoDB)",
        "6. IoT Dashboard               (React, AWS IoT, MQTT)",
      ].join("\n"),
    contact: () =>
      "📧 Available via the contact form on this website.\n   Open to remote, hybrid, or on-site positions worldwide.",
  };

  /* ── Handle submit ─────────────────────────────── */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const query = input.trim();
      if (!query || isLoading) return;

      // Add user command to terminal
      setMessages((prev) => [...prev, { role: "user", text: query }]);
      setCommandHistory((prev) => [query, ...prev]);
      setHistoryPointer(-1);
      setInput("");

      // Handle "clear"
      if (query.toLowerCase() === "clear") {
        setMessages([]);
        return;
      }

      // Handle "neofetch"
      if (query.toLowerCase() === "neofetch") {
        const neofetchMsgs: Message[] = NEOFETCH.map((line) => ({
          role: "system" as const,
          text: line,
        }));
        setMessages((prev) => [...prev, ...neofetchMsgs]);
        return;
      }

      // Handle built-in commands
      const cmd = query.toLowerCase().split(" ")[0];
      if (BUILTIN_COMMANDS[cmd]) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: BUILTIN_COMMANDS[cmd]() },
        ]);
        return;
      }

      // Otherwise → Gemini AI
      setIsLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: query,
            history: getChatHistory(),
          }),
        });

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.reply || "No response received." },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "bash: error: Could not reach the AI server. Try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [input, isLoading, getChatHistory, BUILTIN_COMMANDS],
  );

  /* ── Keyboard shortcuts (Up/Down for history) ──── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length === 0) return;
        const next = Math.min(historyPointer + 1, commandHistory.length - 1);
        setHistoryPointer(next);
        setInput(commandHistory[next]);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyPointer <= 0) {
          setHistoryPointer(-1);
          setInput("");
        } else {
          const next = historyPointer - 1;
          setHistoryPointer(next);
          setInput(commandHistory[next]);
        }
      }
    },
    [commandHistory, historyPointer],
  );

  return (
    <div ref={sectionRef} className="section-container content-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* Section label */}
        <p className="font-mono text-xs tracking-[4px] text-[var(--gray-5)] uppercase mb-4">
          // interactive terminal
        </p>

        {/* Terminal window — fixed height */}
        <div
          className="terminal-window border border-[var(--gray-2)] rounded-lg overflow-hidden shadow-2xl shadow-black/50"
          onClick={focusInput}
        >
          {/* ── Title bar (macOS / Linux style) ── */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-[var(--gray-2)] select-none">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <div className="flex-1 text-center">
              <span className="font-mono text-[11px] text-[var(--gray-5)] tracking-wide">
                {USER}@{HOST}: {CWD}
              </span>
            </div>
            <span className="font-mono text-[10px] text-green-500/60 tracking-wider">
              ● ONLINE
            </span>
          </div>

          {/* ── Scrollable output area — FIXED HEIGHT ── */}
          <div
            ref={scrollRef}
            data-lenis-prevent
            className="terminal-body bg-[#0d0d0d] px-4 py-3 md:px-5 md:py-4 font-mono text-[13px] leading-[1.6] overflow-y-auto"
            style={{ height: "480px" }}
          >
            {messages.map((msg, i) => (
              <div key={i} className="terminal-line">
                {msg.role === "system" ? (
                  /* Neofetch / separator lines */
                  <pre className="text-[var(--gray-5)] text-[12px] leading-[1.4] whitespace-pre m-0">
                    {msg.text}
                  </pre>
                ) : msg.role === "user" ? (
                  /* User command with prompt */
                  <div className="mt-2">
                    <span className="text-[#5fd75f]">{PROMPT}</span>{" "}
                    <span className="text-[var(--gray-9)]">{msg.text}</span>
                  </div>
                ) : (
                  /* AI response */
                  <pre className="text-[var(--gray-7)] whitespace-pre-wrap pl-0 mt-0.5 mb-1 text-[13px] leading-[1.6]">
                    {msg.text}
                  </pre>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="mt-2 flex items-center gap-1 text-[var(--gray-5)]">
                <span className="terminal-cursor-blink">█</span>
                <span className="text-[12px] ml-1">processing...</span>
              </div>
            )}

            {/* Active prompt line (always visible at bottom) */}
            {!isLoading && neofetchDone && (
              <form onSubmit={handleSubmit} className="flex items-center mt-2">
                <span className="text-[#5fd75f] shrink-0">{PROMPT}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 ml-1.5 bg-transparent border-none outline-none font-mono text-[13px] text-[var(--gray-9)] caret-[#5fd75f] placeholder:text-[var(--gray-3)]"
                  placeholder={neofetchDone ? "" : ""}
                  autoComplete="off"
                  spellCheck={false}
                  autoFocus
                />
              </form>
            )}
          </div>
        </div>

        {/* Hint */}
        <div className="flex items-center justify-between mt-3 px-1">
          <p className="font-mono text-[10px] text-[var(--gray-4)] tracking-wider">
            Powered by Gemini AI
          </p>
          <p className="font-mono text-[10px] text-[var(--gray-4)] tracking-wider">
            ↑↓ history &nbsp;·&nbsp; &quot;help&quot; for commands &nbsp;·&nbsp;
            &quot;clear&quot; to reset
          </p>
        </div>
      </motion.div>
    </div>
  );
}
