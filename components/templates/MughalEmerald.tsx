"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationHero } from "@/components/invitation-demo/InvitationHero";
import { ScratchCard } from "@/components/invitation-demo/ScratchCard";
import { InvitationCountdown } from "@/components/invitation-demo/InvitationCountdown";
import { InvitationDetails } from "@/components/invitation-demo/InvitationDetails";
import { InvitationGallery } from "@/components/invitation-demo/InvitationGallery";
import { GuestMessageForm } from "@/components/invitation-demo/GuestMessageForm";
import { FloatingActions } from "@/components/invitation-demo/FloatingActions";
import { TamilPoetrySection } from "@/components/invitation-demo/TamilPoetrySection";
import { InvitationTheme, TemplateViewProps } from "@/types";

export function MughalEmerald({ invitation, slug }: TemplateViewProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!invitation) return (
    <main className="min-h-screen" style={{ backgroundColor: "#064E3B" }} />
  );

  const theme: InvitationTheme = {
    background: "#061a0a",
    sectionBg: "#061a0a",
    alternateBg: "#0a2010",
    namesColor: "#D4AF37",
    textColor: "#ffffff",
    accentColor: "#D4AF37",
    dividerColor: "#D4AF37",
    countdownBg: "#0a2010",
    buttonBg: "linear-gradient(135deg, #061a0a, #D4AF37)",
    scratchBorder: "#D4AF37",
    ornament: "🕌",
    emojis: ['✨', '❇️', '💎', '🕌']
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#061a0a" }}>
      {isOpen ? (
        <MainInvitationContent invitation={invitation} theme={theme} slug={slug} />
      ) : (
        <OpeningScreen 
          setIsOpen={setIsOpen} 
          accentColor="#D4AF37"
          backgroundColor="#061a0a"
        />
      )}
    </main>
  );
}

/**
 * FIXED OPENING SCREEN COMPONENT
 * Handles the "TAP TO OPEN" logic with robust touch support
 */
function OpeningScreen({ setIsOpen, accentColor, backgroundColor }: { 
  setIsOpen: (val: boolean) => void, 
  accentColor: string, 
  backgroundColor: string 
}) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100dvh',
        backgroundColor: backgroundColor,
        overflow: 'hidden',
        zIndex: 9999
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Left curtain */}
        <rect x="0" y="0" width="195" height="844" fill={backgroundColor} />
        {/* Right curtain */}
        <rect x="195" y="0" width="195" height="844" fill={backgroundColor} />

        {/* Decorative lines */}
        <line x1="195" y1="0" x2="195" y2="380" stroke={accentColor} strokeWidth="0.6" opacity="0.5" />
        <line x1="195" y1="464" x2="195" y2="844" stroke={accentColor} strokeWidth="0.6" opacity="0.5" />
        
        {/* Corner ornaments */}
        <g opacity="0.4">
          <line x1="20" y1="30" x2="60" y2="30" stroke={accentColor} strokeWidth="0.6"/>
          <line x1="20" y1="30" x2="20" y2="70" stroke={accentColor} strokeWidth="0.6"/>
          <circle cx="20" cy="30" r="2" fill={accentColor} />
        </g>
        <g opacity="0.4">
          <line x1="370" y1="30" x2="330" y2="30" stroke={accentColor} strokeWidth="0.6"/>
          <line x1="370" y1="30" x2="370" y2="70" stroke={accentColor} strokeWidth="0.6"/>
          <circle cx="370" cy="30" r="2" fill={accentColor} />
        </g>
      </svg>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

      {/* FIXED TAP TO OPEN BUTTON CONTAINER */}
      <div 
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          onClick={() => setIsOpen(true)}
          onTouchStart={(e) => {
            e.stopPropagation()
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen(true)
          }}
          style={{
            cursor: 'pointer',
            zIndex: 9999,
            position: 'relative',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'manipulation',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100px',
            height: '100px'
          }}
        >
          {/* 3 Animated Glow Rings */}
          {[0, 0.3, 0.6].map((delay, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: `2px solid ${accentColor}`,
                backgroundColor: `${accentColor}11`,
                boxShadow: `0 0 15px ${accentColor}`,
                animation: `pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) ${delay}s infinite`,
              }}
            />
          ))}

          {/* Circle button content */}
          <div
            style={{
              width: '85px',
              height: '85px',
              borderRadius: '50%',
              backgroundColor: '#000000',
              border: `2px solid ${accentColor}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1px',
              position: 'relative',
              zIndex: 2,
              boxShadow: `0 0 20px ${accentColor}88`
            }}
          >
            <span style={{
              color: accentColor,
              fontSize: '24px',
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold',
              lineHeight: 1
            }}>V</span>
            <span style={{
              color: accentColor,
              fontSize: '8px',
              letterSpacing: '1.5px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>TAP TO OPEN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * MAIN INVITATION CONTENT COMPONENT
 * Renders the actual invitation details after opening
 */
function MainInvitationContent({ invitation, theme, slug }: { 
  invitation: any, 
  theme: InvitationTheme, 
  slug?: string 
}) {
  return (
    <div className="animate-in fade-in duration-1000">
      <InvitationHero theme={theme} invitation={invitation} />
      <TamilPoetrySection templateId="mughal-emerald" theme={theme} />
      <ScratchCard theme={theme} invitation={invitation} />
      <InvitationCountdown theme={theme} invitation={invitation} />
      <InvitationDetails theme={theme} invitation={invitation} />
      <InvitationGallery theme={theme} invitation={invitation} />
      <GuestMessageForm theme={theme} />
      <FloatingActions theme={theme} invitation={invitation} slug={slug} />
      <footer className="py-8 text-center" style={{ backgroundColor: "#0a2010" }}>
        <p className="text-white/40 text-sm font-tamil">© 2026 {invitation.brideName} & {invitation.groomName} • திருமண அழைப்பிதழ்</p>
      </footer>
    </div>
  );
}

