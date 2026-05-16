"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { InvitationTheme, InvitationRenderData } from "@/types";
import { Image as ImageIcon } from "lucide-react";

export function InvitationGallery({ 
  theme, 
  invitation 
}: { 
  theme?: InvitationTheme; 
  invitation: InvitationRenderData 
}) {
  if (!invitation) return null;
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const defaultTheme: InvitationTheme = {
    background: "#FAF7F2",
    namesColor: "#B76E79",
    textColor: "#1a1a2e",
    accentColor: "#B8860B",
    dividerColor: "#B76E79",
    countdownBg: "#E8E0D4",
  };

  const currentTheme = theme || defaultTheme;

  // Combine user photos for the gallery
  const userPhotos = [
    invitation?.photo1, 
    invitation?.photo2, 
    invitation?.photo3, 
    invitation?.photo4,
    ...(invitation?.slideshowPhotos || [])
  ].filter(Boolean) as string[];

  // Fallback if no photos
  const displayPhotos = userPhotos.length > 0 ? userPhotos : [
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  ];

  function goTo(idx: number) {
    setActive(idx);
    if (scrollRef.current) {
      const child = scrollRef.current.children[idx] as HTMLElement;
      child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  return (
    <section className="py-16 px-4" style={{ backgroundColor: currentTheme.alternateBg || currentTheme.background }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-tamil text-2xl sm:text-3xl font-bold mb-8"
          style={{ color: currentTheme.namesColor }}
        >
          <span style={{ color: currentTheme.accentColor }}>Photos</span> Gallery
        </motion.h2>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 pb-6"
        >
          {displayPhotos.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              onClick={() => goTo(i)}
              className={`flex-none snap-center w-64 h-64 sm:w-80 sm:h-80 rounded-2xl bg-white/5 overflow-hidden flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-200`}
              style={{ 
                outline: active === i ? `4px solid ${currentTheme.accentColor}` : "none",
                outlineOffset: "4px"
              }}
            >
              {p ? (
                <img src={p} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-12 h-12 text-white/20" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {displayPhotos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="w-2.5 h-2.5 rounded-full transition-all duration-200"
              style={{ 
                backgroundColor: active === i ? currentTheme.accentColor : "rgba(255,255,255,0.2)",
                width: active === i ? "24px" : "10px"
              }}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
