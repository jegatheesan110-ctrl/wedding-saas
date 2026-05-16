"use client";

import { useEffect, useState } from "react";
import OpeningDoor from "@/components/OpeningDoor";
import { InvitationHero } from "@/components/invitation-demo/InvitationHero";
import { ScratchCard } from "@/components/invitation-demo/ScratchCard";
import { InvitationCountdown } from "@/components/invitation-demo/InvitationCountdown";
import { InvitationDetails } from "@/components/invitation-demo/InvitationDetails";
import { InvitationGallery } from "@/components/invitation-demo/InvitationGallery";
import { GuestMessageForm } from "@/components/invitation-demo/GuestMessageForm";
import { FloatingActions } from "@/components/invitation-demo/FloatingActions";
import { TamilPoetrySection } from "@/components/invitation-demo/TamilPoetrySection";
import { InvitationTheme, InvitationRenderData } from "@/types";

export default function DemoPage() {
  const [showInvitation, setShowInvitation] = useState(false);

  const invitation: InvitationRenderData = {
    templateId: "rose-gold-blush",
    brideName: "பிரியா",
    groomName: "அர்ஜுன்",
    weddingDate: "2026-05-24",
    weddingTime: "காலை 9:00 - 10:30",
    venueName: "ஸ்ரீ விநாயகா திருமண மண்டபம்",
    venueAddress: "சென்னை - 600001",
    slideshowPhotos: [],
    showPreWedding: false,
    preWeddingEvents: [],
    showDressCode: false,
    showTransport: false
  };

  const theme: InvitationTheme = {
    background: "#2d1a1a",
    sectionBg: "#2d1a1a",
    alternateBg: "#3d2525",
    namesColor: "#ffffff",
    textColor: "#ffffff",
    accentColor: "#ffffff",
    dividerColor: "#2d1a1a",
    countdownBg: "#3d2525",
    buttonBg: "linear-gradient(135deg, #2d1a1a, #3d2525)",
    scratchBorder: "#2d1a1a",
    ornament: "❤",
    emojis: ['🌸', '🌺', '🌹', '🌷', '💖']
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#2d1a1a" }}>
      {!showInvitation ? (
        <OpeningDoor 
          onOpen={() => setShowInvitation(true)} 
          accentColor="#d4af37"
          backgroundColor="#1a0505"
        />
      ) : (
        <div className="animate-in fade-in duration-1000">
          <InvitationHero theme={theme} invitation={invitation} />
          <TamilPoetrySection templateId="rose-gold-blush" theme={theme} />
          <ScratchCard theme={theme} invitation={invitation} />
          <InvitationCountdown theme={theme} invitation={invitation} />
          <InvitationDetails theme={theme} invitation={invitation} />
          <InvitationGallery theme={theme} invitation={invitation} />
          <GuestMessageForm theme={theme} />
          <FloatingActions theme={theme} invitation={invitation} />
          <footer className="py-8 text-center" style={{ backgroundColor: "#3d2525" }}>
            <p className="text-white/40 text-sm">© 2026 {invitation.brideName} & {invitation.groomName} • திருமண அழைப்பிதழ்</p>
          </footer>
        </div>
      )}
    </main>
  );
}

