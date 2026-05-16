"use client";

import { useEffect, useState } from "react";
import OpeningDoor from "@/components/OpeningDoor";
import { FallingFlowers } from "@/components/invitation-demo/FallingFlowers";
import { InvitationHero } from "@/components/invitation-demo/InvitationHero";
import { ScratchCard } from "@/components/invitation-demo/ScratchCard";
import { InvitationCountdown } from "@/components/invitation-demo/InvitationCountdown";
import { InvitationDetails } from "@/components/invitation-demo/InvitationDetails";
import { InvitationGallery } from "@/components/invitation-demo/InvitationGallery";
import { GuestMessageForm } from "@/components/invitation-demo/GuestMessageForm";
import { FloatingActions } from "@/components/invitation-demo/FloatingActions";
import { TamilPoetrySection } from "@/components/invitation-demo/TamilPoetrySection";
import { InvitationTheme, TemplateViewProps } from "@/types";

export function RoyalElegance({ invitation, slug }: TemplateViewProps) {
  const [showInvitation, setShowInvitation] = useState(false);

  if (!invitation) return (
    <main className="min-h-screen" style={{ backgroundColor: "#800020" }} />
  );

  const theme: InvitationTheme = {
    background: "#2d0000",
    sectionBg: "#2d0000",
    alternateBg: "#350000",
    mapBg: "#350000",
    namesColor: "#D4AF37",
    textColor: "#F5E6D3",
    accentColor: "#D4AF37",
    dividerColor: "#D4AF37",
    countdownBg: "#350000",
    buttonBg: "linear-gradient(135deg, #2d0000, #D4AF37)",
    scratchBorder: "#D4AF37",
    ornament: "🔱",
    emojis: ['✨', '🌹', '⚜️', '👑']
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#2d0000" }}>
      {!showInvitation ? (
        <OpeningDoor 
          onOpen={() => setShowInvitation(true)} 
          accentColor="#d4af37"
          backgroundColor="#1a0000"
        />
      ) : (
        <div className="animate-in fade-in duration-1000">
          <InvitationHero theme={theme} invitation={invitation} />
          <TamilPoetrySection templateId="royal-elegance" theme={theme} />
          <ScratchCard theme={theme} invitation={invitation} />
          <InvitationCountdown theme={theme} invitation={invitation} />
          <InvitationDetails theme={theme} invitation={invitation} />
          <InvitationGallery theme={theme} invitation={invitation} />
          <GuestMessageForm theme={theme} />
          <FloatingActions theme={theme} invitation={invitation} slug={slug} />
          <footer className="py-8 text-center" style={{ backgroundColor: "#350000" }}>
            <p className="text-white/40 text-sm font-tamil">© 2026 {invitation.brideName} & {invitation.groomName} • திருமண அழைப்பிதழ்</p>
          </footer>
        </div>
      )}
    </main>
  );
}
