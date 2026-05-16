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
    templateId: "midnight-royal",
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
          backgroundColor="#1a0d35"
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
          <FloatingActions theme={theme} invitation={invitation} />
          <footer className="py-8 text-center" style={{ backgroundColor: "#120820" }}>
            <p className="text-white/40 text-sm font-tamil">© 2026 {invitation.brideName} & {invitation.groomName} • திருமண அழைப்பிதழ்</p>
          </footer>
        </div>
      )}
    </main>
  );
}

