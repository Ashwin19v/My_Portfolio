import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DEV | Full Stack Developer • App Developer • Gen AI Engineer",
  description:
    "Premium portfolio of a top-tier Full Stack Developer, Mobile App Developer, and Generative AI Engineer. Building the future of digital.",
  keywords: [
    "Full Stack Developer",
    "Mobile App Developer",
    "Generative AI Engineer",
    "React",
    "Next.js",
    "Flutter",
    "LangChain",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetbrainsMono.variable} antialiased bg-black text-white noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
