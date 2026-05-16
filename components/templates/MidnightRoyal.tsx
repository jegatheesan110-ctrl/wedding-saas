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

export function MidnightRoyal({ invitation, slug }: TemplateViewProps) {
  const [showInvitation, setShowInvitation] = useState(false);

  if (!invitation) return (
    <main className="min-h-screen" style={{ backgroundColor: "#2D1B4D" }} />
  );

  const theme: InvitationTheme = {
    background: "#0d0619",
    sectionBg: "#0d0619",
    alternateBg: "#120820",
    namesColor: "#C0C0C0",
    textColor: "#ffffff",
    accentColor: "#C0C0C0",
    dividerColor: "#C0C0C0",
    countdownBg: "#120820",
    buttonBg: "linear-gradient(135deg, #0d0619, #C0C0C0)",
    scratchBorder: "#C0C0C0",
    ornament: "⭐",
    emojis: ['⭐', '✨', '🌙', '🌟']
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0d0619" }}>
      {!showInvitation ? (
        <OpeningDoor 
          onOpen={() => setShowInvitation(true)} 
          accentColor="#d4af37"
          backgroundColor="#0d0019"
        />
      ) : (
        <div className="animate-in fade-in duration-1000">
          <InvitationHero theme={theme} invitation={invitation} />
          <TamilPoetrySection templateId="midnight-royal" theme={theme} />
          <ScratchCard theme={theme} invitation={invitation} />
          <InvitationCountdown theme={theme} invitation={invitation} />
          <InvitationDetails theme={theme} invitation={invitation} />
          <InvitationGallery theme={theme} invitation={invitation} />
          <GuestMessageForm theme={theme} />
          <FloatingActions theme={theme} invitation={invitation} slug={slug} />
          <footer className="py-8 text-center" style={{ backgroundColor: "#120820" }}>
            <p className="text-white/40 text-sm font-tamil">© 2026 {invitation.brideName} & {invitation.groomName} • திருமண அழைப்பிதழ்</p>
          </footer>
        </div>
      )}
    </main>
  );
}
