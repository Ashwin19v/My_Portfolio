import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

/* ──────────────────────────────────────────────────────────
   Gemini-powered portfolio chatbot API route.
   It answers questions about the developer using the
   resume / portfolio context injected as a system prompt.
   ────────────────────────────────────────────────────────── */

const RESUME_CONTEXT = `
You are an AI assistant embedded in a developer's portfolio website.
You answer questions about the developer ONLY. Stay professional, concise,
and friendly. If a question is unrelated to the developer, politely redirect.
Answer in short paragraphs (2-4 sentences max). Use a slightly technical tone.

═══════════════════════ DEVELOPER PROFILE ═══════════════════════

Name: [Developer Name]
Title: Full Stack Developer | Mobile App Developer | Generative AI Engineer
Status: Available for work / freelance / full-time opportunities

─── SKILLS & TECHNOLOGIES ───
Frontend: React.js, Next.js, HTML5, CSS3, Tailwind CSS, TypeScript, JavaScript
Backend: Node.js, Express.js, Django, FastAPI, Python
Mobile: Flutter, React Native
Databases: MongoDB, Firebase, MySQL
DevOps: Docker, AWS, CI/CD, GitHub Actions, Git
Gen AI / LLMs: LangChain, LangGraph, CrewAI, RAG, Prompt Engineering, OpenAI API,
               Multi-agent AI systems, Generative AI pipelines

─── EXPERIENCE (3+ years) ───
• Built 50+ projects across web, mobile, and AI domains.
• Worked with 20+ clients on freelance and contract projects.
• Experience 1: Senior Full Stack Developer — Led development of enterprise SaaS
  platforms using React, Node.js, and AWS. Implemented CI/CD pipelines and
  microservices architecture.
• Experience 2: Mobile App Developer — Developed cross-platform mobile apps
  with Flutter and React Native for healthcare and e-commerce clients.
• Experience 3: Gen AI Engineer — Built multi-agent AI pipelines using LangChain,
  LangGraph, CrewAI. Implemented RAG systems and custom LLM integrations.
• Experience 4: Freelance Developer — Delivered end-to-end solutions for startups
  including full-stack web apps, mobile apps, and AI-powered features.

─── KEY PROJECTS ───
1. AI-Powered SaaS Platform — Full-stack AI SaaS with multi-tenant architecture,
   real-time analytics, and LLM-powered features. Tech: Next.js, Node.js, MongoDB, OpenAI.
2. Healthcare Mobile App — Cross-platform health tracking app with real-time
   monitoring and doctor connectivity. Tech: Flutter, Firebase, REST APIs.
3. Developer Collaboration Tool — Real-time code collaboration platform with
   video chat and AI code assistance. Tech: React, WebSockets, Node.js.
4. AI Content Generator — Multi-agent content pipeline using LangChain and CrewAI
   for automated blog/marketing content. Tech: Python, FastAPI, LangChain, CrewAI.
5. E-Commerce Platform — Full-featured e-commerce with payment integration,
   inventory management, and analytics. Tech: Next.js, Stripe, MongoDB.
6. IoT Dashboard — Real-time IoT data visualization and device management
   platform. Tech: React, Node.js, MQTT, AWS IoT.

─── EDUCATION ───
Bachelor's degree in Computer Science / Software Engineering.

─── CONTACT ───
Available via the contact form on this portfolio website.
Open to remote, hybrid, or on-site positions worldwide.

═══════════════════════════════════════════════════════════════
`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "AI assistant is not configured yet. Please add GEMINI_API_KEY to your environment variables.",
        },
        { status: 200 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey.trim());

    // Prepare history once (reused across model attempts)
    const rawHistory = (history || []).filter(
      (h: { role: string; text: string }) =>
        h.role === "user" || h.role === "model",
    );
    const chatHistory: { role: string; parts: { text: string }[] }[] = [];
    let lastRole = "model"; // after our seeded model message
    for (const h of rawHistory) {
      const role = h.role === "user" ? "user" : "model";
      if (role === lastRole) continue; // skip consecutive same-role messages
      chatHistory.push({ role, parts: [{ text: h.text }] });
      lastRole = role;
    }

    const seedHistory = [
      {
        role: "user" as const,
        parts: [
          {
            text: `Here is the context about the developer you represent. Use this to answer all questions:\n${RESUME_CONTEXT}`,
          },
        ],
      },
      {
        role: "model" as const,
        parts: [
          {
            text: "Understood! I'm ready to answer questions about the developer based on their portfolio and resume. How can I help?",
          },
        ],
      },
      ...chatHistory,
    ];

    // Try models in order — fallback if quota is hit
    // Gemini 2.5 Flash (best quality, 20 RPD) → Gemma 3 27B → 12B → 4B (14.4K RPD each)
    const MODELS = [
      "gemma-3-27b-it",
      //   "gemini-2.5-flash",
      "gemma-3-12b-it",
      "gemma-3-4b-it",
    ];
    let reply = "";

    for (const modelName of MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const chat = model.startChat({ history: seedHistory });
        const result = await chat.sendMessage(message);
        reply = result.response.text();
        break; // success — stop trying
      } catch (modelErr: unknown) {
        const msg = modelErr instanceof Error ? modelErr.message : "";
        const isQuota =
          msg.includes("429") ||
          msg.includes("quota") ||
          msg.includes("Too Many Requests");
        if (!isQuota) throw modelErr; // non-quota error → bubble up
        console.warn(`Model ${modelName} quota hit, trying next…`);
        continue;
      }
    }

    if (!reply) {
      return NextResponse.json({
        reply:
          "⚠ All model quotas are currently exhausted. Please wait a minute and try again.",
      });
    }

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";

    let reply: string;
    if (
      errMsg.includes("429") ||
      errMsg.includes("quota") ||
      errMsg.includes("Too Many Requests")
    ) {
      reply =
        "⚠ API quota exceeded — the free tier limit has been reached. Please wait a few minutes and try again, or upgrade your Google AI Studio plan at https://ai.google.dev.";
    } else if (
      errMsg.includes("API_KEY") ||
      errMsg.includes("401") ||
      errMsg.includes("403")
    ) {
      reply =
        "⚠ Invalid or expired API key. Please check your GEMINI_API_KEY in .env.local.";
    } else {
      reply = `⚠ Error: ${errMsg}`;
    }

    return NextResponse.json({ reply }, { status: 200 });
  }
}
