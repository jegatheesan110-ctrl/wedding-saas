"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function ScratchCard({ dateText, theme }: { dateText: string; theme?: any }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const pieces = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);

  const accentColor = theme?.accent?.replace("text-", "") || "#B76E79";
  const textColor = theme?.text?.replace("text-", "") || "#1a1a2e";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const color = accentColor.startsWith('[#') ? accentColor.slice(1, -1) : accentColor;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "600 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("தேதியை scratch செய்யுங்கள்", canvas.width / 2, canvas.height / 2 + 6);
    ctx.globalCompositeOperation = "destination-out";

    let drawing = false;
    const scratch = (x: number, y: number) => {
      ctx.beginPath(); ctx.arc(x, y, 18, 0, Math.PI * 2); ctx.fill();
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0; for (let i = 3; i < pixels.length; i += 4) if (pixels[i] === 0) transparent += 1;
      if (transparent / (pixels.length / 4) > 0.45) { setRevealed(true); setConfetti(true); }
    };

    const position = (event: MouseEvent | TouchEvent) => { 
      const rect = canvas.getBoundingClientRect(); 
      const point = "touches" in event ? event.touches[0] : event; 
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return { x: (point.clientX - rect.left) * scaleX, y: (point.clientY - rect.top) * scaleY }; 
    };
    const down = () => { drawing = true; }; const up = () => { drawing = false; };
    const move = (event: MouseEvent | TouchEvent) => { if (!drawing || revealed) return; const { x, y } = position(event); scratch(x, y); };

    canvas.addEventListener("mousedown", down); canvas.addEventListener("touchstart", down); window.addEventListener("mouseup", up); window.addEventListener("touchend", up); canvas.addEventListener("mousemove", move); canvas.addEventListener("touchmove", move);
    return () => { canvas.removeEventListener("mousedown", down); canvas.removeEventListener("touchstart", down); window.removeEventListener("mouseup", up); window.removeEventListener("touchend", up); canvas.removeEventListener("mousemove", move); canvas.removeEventListener("touchmove", move); };
  }, [revealed, accentColor]);

  const resolvedTextColor = textColor.startsWith('[#') ? textColor.slice(1, -1) : textColor;

  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-white/10 ${theme?.card || "bg-white/80"} p-6 text-center shadow-lg`}>
      <p className="mb-4 font-tamil text-2xl" style={{ color: resolvedTextColor }}>திருமண தேதி</p>
      <div className="relative mx-auto h-24 max-w-sm rounded-2xl bg-black/5">
        <div className="absolute inset-0 flex items-center justify-center font-tamil text-3xl" style={{ color: resolvedTextColor }}>{dateText}</div>
        {!revealed ? <canvas ref={canvasRef} width={360} height={96} className="absolute inset-0 h-full w-full rounded-2xl" /> : null}
      </div>
      {confetti ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {pieces.map((piece) => (
            <span 
              key={piece} 
              className="absolute h-3 w-3 rounded-sm" 
              style={{ 
                left: `${(piece * 17) % 100}%`, 
                top: `${(piece * 11) % 20}%`, 
                backgroundColor: accentColor.startsWith('[#') ? accentColor.slice(1, -1) : accentColor,
                animation: `petal ${4 + (piece % 3)}s linear infinite` 
              }} 
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
