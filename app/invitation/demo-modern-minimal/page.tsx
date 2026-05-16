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
    templateId: "modern-minimal",
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
    background: "#0a1628",
    sectionBg: "#0a1628",
    alternateBg: "#0d1f3c",
    namesColor: "#D4AF37",
    textColor: "#e0e8ff",
    accentColor: "#D4AF37",
    dividerColor: "#D4AF37",
    countdownBg: "#0d1f3c",
    buttonBg: "linear-gradient(135deg, #0a1628, #D4AF37)",
    scratchBorder: "#D4AF37",
    ornament: "✦",
    emojis: ['✨', '💍', '💎']
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a1628" }}>
      {!showInvitation ? (
        <OpeningDoor 
          onOpen={() => setShowInvitation(true)} 
          accentColor="#c9a84c"
          backgroundColor="#0d1a35"
        />
      ) : (
        <div className="animate-in fade-in duration-1000">
          <InvitationHero theme={theme} invitation={invitation} />
          <TamilPoetrySection templateId="modern-minimal" theme={theme} />
          <ScratchCard theme={theme} invitation={invitation} />
          <InvitationCountdown theme={theme} invitation={invitation} />
          <InvitationDetails theme={theme} invitation={invitation} />
          <InvitationGallery theme={theme} invitation={invitation} />
          <GuestMessageForm theme={theme} />
          <FloatingActions theme={theme} invitation={invitation} />
          <footer className="py-8 text-center" style={{ backgroundColor: "#0d1f3c" }}>
            <p className="text-white/40 text-sm font-tamil">© 2026 {invitation.brideName} & {invitation.groomName} • திருமண அழைப்பிதழ்</p>
          </footer>
        </div>
      )}
    </main>
  );
}
