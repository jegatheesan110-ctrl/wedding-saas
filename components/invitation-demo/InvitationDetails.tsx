"use client";

import { motion } from "framer-motion";
import { InvitationTheme, InvitationRenderData } from "@/types";
import { formatTamilDate } from "@/lib/utils";

export function InvitationDetails({ 
  theme, 
  invitation 
}: { 
  theme?: InvitationTheme; 
  invitation: InvitationRenderData 
}) {
  if (!invitation) return null;

  const defaultTheme: InvitationTheme = {
    background: "#ffffff",
    namesColor: "#B76E79",
    textColor: "#1a1a2e",
    accentColor: "#9a7b3c",
    dividerColor: "#B8860B",
    countdownBg: "#FDF3DC",
  };

  const currentTheme = theme || defaultTheme;

  const details = [
    { icon: "📅", label: "திருமண தேதி", value: formatTamilDate(invitation?.weddingDate) },
    { icon: "🕘", label: "திருமண நேரம்", value: invitation?.weddingTime || "காலை 9:00 மணி" },
    { icon: "🏛️", label: "திருமண இடம்", value: invitation?.venueName || "திருமண மண்டபம்" },
    { icon: "📍", label: "முகவரி", value: invitation?.venueAddress || "முகவரி" },
  ];

  if (invitation?.contactNumber) {
    details.push({ icon: "📞", label: "தொடர்பு எண்", value: invitation?.contactNumber });
  }

  // Generate Google Maps URL from address
  const mapUrl = invitation?.mapLink || `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(invitation?.venueAddress || invitation?.venueName || "Chennai")}`;
  // Using a more generic embed if mapLink is missing
  const finalMapSrc = invitation?.mapLink && invitation?.mapLink.includes('google.com/maps/embed') 
    ? invitation?.mapLink 
    : `https://www.google.com/maps?q=${encodeURIComponent(invitation?.venueAddress || invitation?.venueName || "Chennai")}&output=embed`;

  return (
    <section className="py-16 px-4" style={{ backgroundColor: currentTheme.sectionBg || currentTheme.background }}>
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-tamil text-2xl sm:text-3xl font-bold text-center mb-10"
          style={{ color: currentTheme.namesColor }}
        >
          <span style={{ color: currentTheme.accentColor }}>திருமண</span> விவரங்கள்
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {details.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border rounded-2xl p-5 flex items-start gap-4 shadow-xl"
              style={{ 
                background: invitation?.templateId === 'mughal-emerald' ? 'rgba(13,35,24,0.8)' : (currentTheme.alternateBg || `${currentTheme.accentColor}11`), 
                borderColor: invitation?.templateId === 'mughal-emerald' ? 'rgba(200,169,81,0.3)' : (invitation?.templateId === 'garden-romance' ? 'rgba(255,255,255,0.15)' : `${currentTheme.accentColor}33`), 
                backdropFilter: (invitation?.templateId === 'garden-romance' || invitation?.templateId === 'mughal-emerald') ? 'blur(10px)' : 'blur(8px)' 
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 border flex items-center justify-center text-2xl shadow-sm flex-shrink-0" style={{ borderColor: `${currentTheme.accentColor}33` }}>
                {d.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest font-tamil" style={{ color: currentTheme.accentColor }}>{d.label}</p>
                <p className="mt-1 font-semibold text-base leading-snug font-tamil" style={{ color: currentTheme.textColor }}>{d.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Maps embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-2xl overflow-hidden border-2 shadow-gold"
          style={{ 
            borderColor: invitation?.templateId === 'mughal-emerald' ? 'rgba(200,169,81,0.3)' : (invitation?.templateId === 'garden-romance' ? 'rgba(255,255,255,0.15)' : `${currentTheme.accentColor}33`),
            backgroundColor: invitation?.templateId === 'mughal-emerald' ? 'rgba(13,35,24,0.8)' : (currentTheme.alternateBg || currentTheme.mapBg || 'transparent'),
            backdropFilter: (invitation?.templateId === 'garden-romance' || invitation?.templateId === 'mughal-emerald') ? 'blur(10px)' : 'blur(8px)'
          }}
        >
          <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: `${currentTheme.accentColor}22` }}>
            <span style={{ color: currentTheme.accentColor }}>📍</span>
            <span className="text-sm font-semibold font-tamil" style={{ color: currentTheme.accentColor }}>வழி பார்க்க (Venue Location)</span>
          </div>
          <iframe
            title="திருமண இடம்"
            src={finalMapSrc}
            width="100%"
            height="260"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
