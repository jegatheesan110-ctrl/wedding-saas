"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { InvitationTheme, InvitationRenderData } from "@/types";

function getTimeLeft(targetDate: string | Date) {
  const target = new Date(targetDate);
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function FlipUnit({ value, label, theme }: { value: number; label: string; theme: InvitationTheme }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      const t = setTimeout(() => {
        setPrev(value);
        setFlip(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-lg border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${theme.accentColor}22`, backdropFilter: "blur(8px)" }}>
          <span className="font-display text-2xl sm:text-3xl font-bold" style={{ color: theme.accentColor }}>
            {String(value).padStart(2, "0")}
          </span>
        </div>
        {flip && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center origin-bottom"
            style={{ backgroundColor: `${theme.accentColor}44`, backdropFilter: "blur(8px)" }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-display text-2xl sm:text-3xl font-bold" style={{ color: theme.accentColor }}>
              {String(prev).padStart(2, "0")}
            </span>
          </motion.div>
        )}
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/10 z-10" />
      </div>
      <span className="text-xs font-semibold tracking-wider opacity-90 font-tamil" style={{ color: theme.textColor }}>{label}</span>
    </div>
  );
}

export function InvitationCountdown({ 
  theme, 
  invitation 
}: { 
  theme?: InvitationTheme; 
  invitation: InvitationRenderData 
}) {
  if (!invitation) return null;

  const defaultTheme: InvitationTheme = {
    background: "linear-gradient(135deg, #FDF3DC, #faf0e8)",
    namesColor: "#B76E79",
    textColor: "#1a1a2e",
    accentColor: "#B76E79",
    dividerColor: "#B76E79",
    countdownBg: "#B76E79",
  };

  const currentTheme = theme || defaultTheme;
  const [time, setTime] = useState(getTimeLeft(invitation?.weddingDate));

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft(invitation?.weddingDate)), 1000);
    return () => clearInterval(t);
  }, [invitation?.weddingDate]);

  return (
    <section className="py-16 px-4" style={{ background: currentTheme.alternateBg || currentTheme.background }}>
      <div className="max-w-lg mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold tracking-widest uppercase mb-2 font-tamil"
          style={{ color: currentTheme.accentColor }}
        >
          Countdown
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-tamil text-2xl sm:text-3xl font-bold mb-8"
          style={{ color: currentTheme.namesColor }}
        >
          திருமணத்திற்கு இன்னும்...
        </motion.h2>

        <div className="flex justify-center gap-4 sm:gap-6">
          <FlipUnit value={time.days} label="நாட்கள்" theme={currentTheme} />
          <div className="text-3xl font-bold self-start mt-3" style={{ color: currentTheme.accentColor }}>:</div>
          <FlipUnit value={time.hours} label="மணி" theme={currentTheme} />
          <div className="text-3xl font-bold self-start mt-3" style={{ color: currentTheme.accentColor }}>:</div>
          <FlipUnit value={time.minutes} label="நிமிடம்" theme={currentTheme} />
          <div className="text-3xl font-bold self-start mt-3" style={{ color: currentTheme.accentColor }}>:</div>
          <FlipUnit value={time.seconds} label="வினாடி" theme={currentTheme} />
        </div>
      </div>
    </section>
  );
}
