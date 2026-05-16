"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { templateCatalog } from "@/data/templates";

type TemplateCardProps = {
  template: (typeof templateCatalog)[number];
  ctaHref?: string;
};

export function TemplateCard({ template, ctaHref = "/signup" }: TemplateCardProps) {
  const demoHref = `/invitation/demo-${template.id}`;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-black/30"
    >
      <div className={`relative h-48 bg-gradient-to-br overflow-hidden ${template.preview}`}>
        {/* Diagonal stripes */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)" }} />
        
        {/* Center seam */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#D4AF37]/80 shadow-[0_0_4px_rgba(212,175,55,0.5)] -translate-x-1/2" />
        
        {/* Handles */}
        <div className="absolute right-[calc(50%+4px)] top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-gradient-to-b from-[#F0D060] to-[#9A7B3C]" />
        <div className="absolute left-[calc(50%+4px)] top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-gradient-to-b from-[#F0D060] to-[#9A7B3C]" />
        
        {/* Mini circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#D4AF37] bg-black/40 flex items-center justify-center backdrop-blur-[2px] shadow-[0_0_10px_rgba(212,175,55,0.3)]">
          <span className="text-[#D4AF37] text-base font-bold leading-none mt-1" style={{ fontFamily: "'Noto Serif Tamil', serif" }}>வ</span>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_40%)] pointer-events-none" />
        <div className="absolute bottom-3 right-3 rounded-full border border-white/30 bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider text-white/90">
          Tap to Open Demo
        </div>
      </div>

      <div className="space-y-3 p-6 text-white">
        <div>
          <p className="font-tamil text-2xl">{template.name}</p>
          <p className="text-sm text-white/65">{template.englishName}</p>
        </div>
        <p className="text-sm text-white/75">{template.description}</p>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            href={demoHref}
            className="rounded-full border border-brand-gold/60 px-4 py-2 text-sm font-medium text-brand-gold transition hover:bg-brand-gold hover:text-black"
          >
            Live Demo பார்க்க
          </Link>
          <Link
            href={`${ctaHref}?template=${template.id}`}
            className="rounded-full bg-brand-rose px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-gold hover:text-black"
          >
            தேர்வு செய்
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
