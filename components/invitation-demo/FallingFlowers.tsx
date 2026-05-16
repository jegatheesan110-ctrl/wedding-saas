"use client";

import { useEffect, useState } from "react";
import { InvitationRenderData } from "@/types";

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  emoji: string;
  sway: string;
  rotation: string;
}

export function FallingFlowers({ 
  active, 
  emojis = ['🌸', '🌺', '🌼', '🌹', '🌷'],
  invitation 
}: { 
  active: boolean; 
  emojis?: string[];
  invitation?: InvitationRenderData;
}) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!active) return;
    const generated: Petal[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${4 + Math.random() * 4}s`,
      size: `${15 + Math.random() * 20}px`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      sway: `${(Math.random() - 0.5) * 200}px`,
      rotation: `${Math.random() * 360}deg`,
    }));
    setPetals(generated);
  }, [active, emojis]);

  if (!active || petals.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <style>{`
        @keyframes fall-and-sway {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(var(--sway)) rotate(360deg); opacity: 0; }
        }
      `}</style>
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-10vh]"
          style={{
            left: p.left,
            fontSize: p.size,
            animation: `fall-and-sway ${p.duration} ${p.delay} linear infinite`,
            // @ts-ignore
            '--sway': p.sway,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
