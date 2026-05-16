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

export function GardenRomance({ invitation, slug }: TemplateViewProps) {
  const [showInvitation, setShowInvitation] = useState(false);

  if (!invitation) return (
    <main className="min-h-screen" style={{ backgroundColor: "#2D5A27" }} />
  );

  const theme: InvitationTheme = {
    background: "#0d2010",
    sectionBg: "#0d2010",
    alternateBg: "#122618",
    namesColor: "#ffffff",
    textColor: "#ffffff",
    accentColor: "#ffffff",
    dividerColor: "#0d2010",
    countdownBg: "#122618",
    buttonBg: "linear-gradient(135deg, #0d2010, #122618)",
    scratchBorder: "#0d2010",
    ornament: "🌿",
    emojis: ['🌿', '🌸', '🌺', '🍃', '🌼']
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0d2010" }}>
      {!showInvitation ? (
        <OpeningDoor 
          onOpen={() => setShowInvitation(true)} 
          accentColor="#d4af37"
          backgroundColor="#001a05"
        />
      ) : (
        <div className="animate-in fade-in duration-1000">
          <InvitationHero theme={theme} invitation={invitation} />
          <TamilPoetrySection templateId="garden-romance" theme={theme} />
          <ScratchCard theme={theme} invitation={invitation} />
          <InvitationCountdown theme={theme} invitation={invitation} />
          <InvitationDetails theme={theme} invitation={invitation} />
          <InvitationGallery theme={theme} invitation={invitation} />
          <GuestMessageForm theme={theme} />
          <FloatingActions theme={theme} invitation={invitation} slug={slug} />
          <footer className="py-8 text-center" style={{ backgroundColor: "#122618" }}>
            <p className="text-white/40 text-sm font-tamil">© 2026 {invitation.brideName} & {invitation.groomName} • திருமண அழைப்பிதழ்</p>
          </footer>
        </div>
      )}
    </main>
  );
}
