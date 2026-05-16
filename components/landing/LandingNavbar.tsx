"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { APP_NAME } from "@/data/templates";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-[#FAF7F2] transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "border-b border-[#E8E0D4]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-tamil text-2xl font-bold text-[#D4AF37] select-none">
          {APP_NAME}
        </Link>

        {/* Nav actions */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/templates"
            className="text-[#1a1a2e] text-sm font-medium hover:text-[#D4AF37] transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/login"
            className="text-[#1a1a2e] text-sm font-medium hover:text-[#D4AF37] transition-colors"
          >
            உள்நுழை
          </Link>
          <Link
            href="/templates"
            className="bg-[#D4AF37] hover:bg-[#B8860B] px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md transition-all hidden sm:block"
          >
            இப்போதே தொடங்கு
          </Link>
        </nav>
      </div>
    </header>
  );
}
