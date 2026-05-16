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
    templateId: "garden-romance",
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
    background: "#2d5a1b",
    sectionBg: "#2d5a1b",
    alternateBg: "rgba(255,255,255,0.08)",
    namesColor: "#c8a951",
    textColor: "#e8f5e8",
    accentColor: "#c8a951",
    dividerColor: "#c8a951",
    countdownBg: "rgba(255,255,255,0.08)",
    buttonBg: "linear-gradient(135deg, #2d5a1b, #c8a951)",
    scratchBorder: "#c8a951",
    ornament: "🌿",
    emojis: ['🌿', '🌸', '🌺', '🍃', '🌼']
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#2d5a1b" }}>
      {!showInvitation ? (
        <OpeningDoor 
          onOpen={() => setShowInvitation(true)} 
          accentColor="#c8a951"
          backgroundColor="#0d2e14"
        />
      ) : (
        <div className="animate-in fade-in duration-1000">
          <InvitationHero theme={theme} invitation={invitation} />
          <TamilPoetrySection templateId="garden-romance" theme={theme} />
          <ScratchCard theme={theme} invitation={invitation} />
          <InvitationCountdown theme={theme} invitation={invitation} />
          <InvitationDetails theme={theme} invitation={invitation} />
          <InvitationGallery theme={theme} invitation={invitation} />
          <GuestMessageForm theme={theme} invitation={invitation} />
          <FloatingActions theme={theme} invitation={invitation} />
          <footer className="py-8 text-center" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
            <p className="text-white/40 text-sm font-tamil">© 2026 {invitation.brideName} & {invitation.groomName} • திருமண அழைப்பிதழ்</p>
          </footer>
        </div>
      )}
    </main>
  );
}
