"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationTheme, InvitationRenderData } from "@/types";

export function FloatingActions({ theme, invitation, slug }: { theme?: InvitationTheme, invitation?: InvitationRenderData, slug?: string }) {
  const [musicOn, setMusicOn] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/music/nadaswaram.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      audioRef.current.play()
        .then(() => setMusicOn(true))
        .catch(err => console.error("Audio playback failed:", err));
    }
  };

  const defaultTheme: InvitationTheme = {
    background: "#ffffff",
    namesColor: "#B76E79",
    textColor: "#1a1a2e",
    accentColor: "#B8860B",
    dividerColor: "#B76E79",
    countdownBg: "#FAF7F2",
  };

  const currentTheme = theme || defaultTheme;

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3">
      {/* Music toggle button */}
      <div className="relative flex items-center gap-2">
        <AnimatePresence>
          {showMusic && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-white text-[#1a1a2e] text-xs font-medium px-3 py-1.5 rounded-full shadow border whitespace-nowrap"
              style={{ borderColor: currentTheme.dividerColor }}
            >
              {musicOn ? "இசை நிறுத்து" : "இசை இயக்கு"}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setShowMusic(true)}
          onMouseLeave={() => setShowMusic(false)}
          onClick={toggleMusic}
          className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-xl transition-all ${musicOn ? 'animate-pulse' : ''}`}
          style={{
            background: musicOn
              ? (currentTheme.buttonBg || currentTheme.accentColor)
              : "white",
            border: `2px solid ${currentTheme.accentColor}`,
            color: musicOn ? (currentTheme.buttonBg?.includes("white") ? currentTheme.accentColor : "white") : currentTheme.accentColor,
          }}
          aria-label={musicOn ? "இசை நிறுத்து" : "இசை இயக்கு"}
        >
          <span style={{ display: 'inline-block', animation: musicOn ? 'spin 3s linear infinite' : 'none' }}>
            🎵
          </span>
        </motion.button>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
