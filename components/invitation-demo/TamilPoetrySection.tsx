"use client";

import { useEffect, useRef, useState } from "react";
import { InvitationTheme, TamilTemplateId } from "@/types";

interface TamilPoetryProps {
  templateId?: string;
  theme?: InvitationTheme;
}

export function TamilPoetrySection({ templateId, theme }: TamilPoetryProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Template specific styles
  const getStyles = () => {
    switch (templateId) {
      case 'mughal-emerald':
        return {
          backgroundColor: '#1a0800',
          color: '#d4af37',
          border: '1px solid rgba(212,175,55,0.3)',
        };
      case 'garden-romance':
        return {
          backgroundColor: '#1a3a1a',
          color: '#c8a951',
          border: '1px solid rgba(200,169,81,0.3)',
        };
      case 'modern-minimal':
        return {
          backgroundColor: '#0a1628',
          color: '#d4af37',
          border: '1px solid rgba(212,175,55,0.3)',
        };
      default:
        return {
          backgroundColor: theme?.alternateBg || '#1a1a2e',
          color: theme?.accentColor || '#d4af37',
          border: `1px solid ${theme?.accentColor}33`,
        };
    }
  };

  const styles = getStyles();

  return (
    <section 
      ref={sectionRef}
      className="py-12 px-4 overflow-hidden"
    >
      <div 
        style={{
          ...styles,
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          padding: '50px 30px',
          borderRadius: '16px',
          margin: '0 20px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-in-out',
        }}
      >
        <div className="mb-6 opacity-60 text-sm tracking-[0.2em]">
          ✦ ══════════ ✦
        </div>

        <h3 className="text-xl font-tamil mb-8 flex items-center justify-center gap-2">
           🪷 📜 குறுந்தொகை 
        </h3>

        <p className="text-[1.3rem] leading-[2.2] font-tamil mb-8">
          "யான் பெருகினேன் அல்லேன்<br />
          நோய் பெருகினேன் - நெஞ்சே<br />
          காதல் கடலில் மூழ்கினேன்<br />
          கரை காணோம் இனி யானே"
        </p>

        <p className="text-sm opacity-80 font-tamil">
          — குறுந்தொகை (சங்க இலக்கியம்)
        </p>

        <div className="mt-8 opacity-60 text-sm tracking-[0.2em]">
          ✦ ══════════ ✦
        </div>
      </div>
    </section>
  );
}
