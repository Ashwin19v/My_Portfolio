"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import TerminalSection from "@/components/TerminalSection";
import ContactSection from "@/components/ContactSection";
import CommandPalette from "@/components/CommandPalette";
import CustomCursor from "@/components/CustomCursor";

// Dynamically import 3D component to avoid SSR issues
const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false },
);

const FloatingSkillIcons = dynamic(
  () => import("@/components/FloatingSkillIcons"),
  { ssr: false },
);

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <CommandPalette />
      <ParticleField />
      <FloatingSkillIcons />
      <Navbar />

      <main className="relative z-[2]">
        <HeroSection />

        {/* Divider */}
        <div className="section-container py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <AboutSection />

        <div className="section-container py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <ProjectsSection />

        <div className="section-container py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <SkillsSection />

        <div className="section-container py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <ExperienceSection />
        
        

        <div className="section-container py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
