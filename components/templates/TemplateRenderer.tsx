"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountdownTimer } from "@/components/invitation-features/CountdownTimer";
import { FallingFlowers } from "@/components/invitation-demo/FallingFlowers";
import OpeningDoor from "@/components/OpeningDoor";
import { GoogleMapEmbed } from "@/components/invitation-features/GoogleMapEmbed";
import { GuestMessageForm } from "@/components/invitation-features/GuestMessageForm";
import { MusicPlayer } from "@/components/invitation-features/MusicPlayer";
import { PhotoCarousel } from "@/components/invitation-features/PhotoCarousel";
import { ScratchCard } from "@/components/invitation-features/ScratchCard";
import { WhatsAppButton } from "@/components/invitation-features/WhatsAppButton";
import { formatTamilDate } from "@/lib/utils";
import { PreWeddingEvent, TemplateViewProps } from "@/types";
import { Image as ImageIcon } from "lucide-react";

type TemplateTheme = { 
  bg: string; 
  card: string; 
  text: string; 
  accent: string; 
  doorVariant?: string; 
  borderClass?: string; 
  doorColor?: string; 
  lineColor?: string 
};

type TemplateRendererProps = TemplateViewProps & { theme: TemplateTheme };

export function TemplateRenderer({ invitation, slug, theme }: TemplateRendererProps) {
  const shareUrl = typeof window === "undefined" ? slug : window.location.href;
  const [doorsOpen, setDoorsOpen] = useState(false);

  if (!invitation) {
    return <div className={`min-h-screen ${theme.bg}`} />;
  }

  return (
    <div className={`min-h-screen ${theme.bg} px-4 py-10 sm:px-6 lg:px-8`}>
      {!doorsOpen && (
        <OpeningDoor 
          onOpen={() => setDoorsOpen(true)} 
          accentColor={theme.lineColor || "#d4af37"} 
          backgroundColor="#0a0000"
        />
      )}
      <MusicPlayer src={invitation.musicTrack} />
      <WhatsAppButton url={shareUrl} />

      <div className="mx-auto max-w-5xl space-y-8">
        {/* Main Hero Section */}
        <section className={`relative overflow-hidden rounded-[40px] ${theme.card} p-8 shadow-2xl ${theme.borderClass || ""} sm:p-12`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <span 
              key={i} 
              className="sparkle-dot" 
              style={{ 
                left: `${(i * 11) % 100}%`, 
                bottom: `${(i * 7) % 40}px`, 
                width: 6 + (i % 4) * 4, 
                height: 6 + (i % 4) * 4, 
                animationDelay: `${i * 0.25}s` 
              }} 
            />
          ))}
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className={`font-display text-lg ${theme.accent}`}>திருமண அழைப்பிதழ்</p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={`mt-4 font-tamil text-5xl leading-tight sm:text-6xl ${theme.text}`}
              >
                {invitation.brideName} & {invitation.groomName}
              </motion.h1>
              {invitation.familyNames && (
                <p className={`mt-2 font-tamil text-xl ${theme.accent} italic`}>
                  {invitation.familyNames}
                </p>
              )}
              <p className={`mt-5 text-lg ${theme.text} opacity-80`}>
                அன்புடன் எங்கள் திருமண விழாவிற்கு உங்களை வரவேற்கிறோம்.
              </p>
              <div className={`mt-6 space-y-2 text-lg ${theme.text} opacity-90`}>
                <p>திருமண தேதி: {formatTamilDate(invitation.weddingDate)}</p>
                <p>திருமண நேரம்: {invitation.weddingTime}</p>
                <p>திருமண இடம்: {invitation.venueName}</p>
                <p>முழு முகவரி: {invitation.venueAddress}</p>
                {invitation.contactNumber && (
                  <p>தொடர்பு எண்: {invitation.contactNumber}</p>
                )}
              </div>
            </div>
            <div className="space-y-4">
              {/* 4-Photo Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[invitation.photo1, invitation.photo2, invitation.photo3, invitation.photo4].map((photo, i) => (
                  photo ? (
                    <motion.img 
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      src={photo} 
                      alt={`Photo ${i+1}`} 
                      className="aspect-square w-full rounded-[20px] object-cover shadow-lg border border-white/10" 
                    />
                  ) : (
                    <div key={i} className={`aspect-square w-full rounded-[20px] ${theme.card} flex items-center justify-center border border-white/5`}>
                      <ImageIcon className="h-8 w-8 text-white/10" />
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <ScratchCard dateText={formatTamilDate(invitation.weddingDate)} theme={theme} />
        <CountdownTimer weddingDate={invitation.weddingDate} theme={theme} />

        {/* Gallery */}
        {invitation.slideshowPhotos?.length ? (
          <section className={`rounded-[40px] ${theme.card} p-8 shadow-xl ${theme.borderClass || ""}`}>
            <h2 className={`mb-6 font-tamil text-4xl ${theme.text}`}>நினைவுகள்</h2>
            <PhotoCarousel photos={invitation.slideshowPhotos} />
          </section>
        ) : null}

        {/* Pre-wedding Events */}
        {invitation.showPreWedding && invitation.preWeddingEvents?.length ? (
          <section className={`rounded-[40px] ${theme.card} p-8 shadow-xl ${theme.borderClass || ""}`}>
            <h2 className={`font-tamil text-4xl ${theme.text}`}>முன் திருமண நிகழ்வுகள்</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {invitation.preWeddingEvents.map((event: PreWeddingEvent) => (
                <div key={event.title} className="rounded-[28px] bg-black/5 p-5">
                  <p className={`font-tamil text-2xl ${theme.text}`}>{event.title}</p>
                  <p className={`mt-2 ${theme.text}`}>{event.date}</p>
                  <p className={`${theme.text}`}>{event.time}</p>
                  <p className={`${theme.text}`}>{event.venue}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Dress Code & Transport */}
        {invitation.showDressCode ? (
          <section className={`rounded-[40px] ${theme.card} p-8 shadow-xl ${theme.borderClass || ""}`}>
            <h2 className={`font-tamil text-4xl ${theme.text}`}>உடை நெறிமுறை</h2>
            <p className={`mt-4 text-lg ${theme.text}`}>{invitation.dressCode}</p>
          </section>
        ) : null}

        {/* Transport Info */}
        {invitation.showTransport ? (
          <section className={`rounded-[40px] ${theme.card} p-8 shadow-xl ${theme.borderClass || ""}`}>
            <h2 className={`font-tamil text-4xl ${theme.text}`}>வாகன வசதி மற்றும் தங்கும் இடம்</h2>
            <p className={`mt-4 text-lg ${theme.text}`}>{invitation.transportInfo}</p>
          </section>
        ) : null}

        {/* Map */}
        <section className={`rounded-[40px] ${theme.card} p-8 shadow-xl ${theme.borderClass || ""}`}>
          <GoogleMapEmbed mapLink={invitation.mapLink} />
        </section>

        {/* Guest Form */}
        <GuestMessageForm slug={slug} theme={theme} />

        {/* Footer */}
        <footer className={`rounded-[40px] ${theme.card} p-8 text-center shadow-xl ${theme.borderClass || ""}`}>
          <p className={`font-tamil text-3xl ${theme.text}`}>அன்புடன் அழைக்கிறோம்</p>
          <p className={`mt-3 text-xl ${theme.text}`}>{invitation.brideName} & {invitation.groomName}</p>
          <p className={`mt-2 ${theme.text}`}>{formatTamilDate(invitation.weddingDate)}</p>
          <p className={`mt-3 text-sm ${theme.text} opacity-70`}>Powered by வந்தனம் | vanthanam.in</p>
        </footer>
      </div>
    </div>
  );
}
