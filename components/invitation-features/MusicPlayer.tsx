"use client";

import { Music2, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MusicPlayer({ src }: { src?: string | null }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.play().then(() => setPlaying(true)).catch(console.error);
    return () => { audioRef.current?.pause(); audioRef.current = null; };
  }, [src]);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().catch(() => undefined); setPlaying(true); }
  }

  return <button onClick={toggle} title={playing ? "இசையை நிறுத்த" : "இசையை இயக்க"} className="fixed bottom-6 right-20 z-40 rounded-full bg-brand.rose p-4 text-white shadow-xl">{playing ? <Pause className="h-5 w-5" /> : <Music2 className="h-5 w-5" />}</button>;
}
