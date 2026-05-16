"use client";

import { useEffect, useMemo, useState } from "react";

export function CountdownTimer({ weddingDate, theme }: { weddingDate: string | Date; theme?: any }) {
  const target = useMemo(() => new Date(weddingDate).getTime(), [weddingDate]);
  const [timeLeft, setTimeLeft] = useState(target - Date.now());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(target - Date.now()), 1000);
    return () => clearInterval(timer);
  }, [target]);

  if (timeLeft <= 0) return null;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const segment = (value: number, label: string) => ({
    value: String(Math.max(value, 0)).padStart(2, "0"),
    label,
  });

  const segments = [
    segment(days, "நாட்கள்"),
    segment(hours, "மணி"),
    segment(minutes, "நிமிடம்"),
    segment(seconds, "வினாடி"),
  ];

  const accentColor = theme?.accent?.replace("text-", "") || "#D4AF37";

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {segments.map((item) => (
        <div key={item.label} className="rounded-[24px] bg-black/40 backdrop-blur-md p-4 text-center shadow-lg border border-white/10">
          <div className="rounded-2xl bg-white/10 py-4 text-3xl font-semibold tracking-widest text-white">
            {item.value}
          </div>
          <p className="mt-3 font-tamil text-lg" style={{ color: accentColor.startsWith('[#') ? accentColor.slice(1, -1) : accentColor }}>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
