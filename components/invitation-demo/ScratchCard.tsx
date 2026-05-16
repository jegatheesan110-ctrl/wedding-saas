"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationTheme, InvitationRenderData } from "@/types";
import { formatTamilDate } from "@/lib/utils";

function launchConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const colors = ["#B8860B", "#D4AF37", "#FFD700", "#F4C2C2", "#fff"];
  const emojis = ["🎊", "🎉", "✨", "💫", "🌸"];
  
  const particles = Array.from({ length: 60 }, () => ({
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 12,
    vy: (Math.random() - 0.5) * 12 - 2,
    gravity: 0.15,
    life: 1,
    decay: Math.random() * 0.02 + 0.01,
    type: 'sparkle'
  }));

  const emojiParticles = Array.from({ length: 20 }, () => ({
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: Math.random() * 20 + 20,
    text: emojis[Math.floor(Math.random() * emojis.length)],
    vx: (Math.random() - 0.5) * 10,
    vy: (Math.random() - 0.5) * 10 - 3,
    gravity: 0.2,
    life: 1,
    decay: Math.random() * 0.015 + 0.005,
    type: 'emoji'
  }));

  const allParticles = [...particles, ...emojiParticles];

  let frame: number;
  function tick() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    
    for (const p of allParticles) {
      if (p.life <= 0) continue;
      active = true;
      
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.life -= p.decay;
      
      ctx!.save();
      ctx!.globalAlpha = Math.max(0, p.life);
      
      if (p.type === 'sparkle') {
        ctx!.shadowBlur = 10;
        ctx!.shadowColor = p.color;
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      } else {
        ctx!.font = `${p.size}px serif`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(p.text, p.x, p.y);
      }
      ctx!.restore();
    }
    
    if (active) {
      frame = requestAnimationFrame(tick);
    } else {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}

export function ScratchCard({ 
  theme, 
  invitation 
}: { 
  theme?: InvitationTheme; 
  invitation: InvitationRenderData 
}) {
  if (!invitation) return null;

  const scratchRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const [scratched, setScratched] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isBooming, setIsBooming] = useState(false);
  const drawing = useRef(false);
  const sparkles = useRef<{ x: number, y: number, life: number, color: string }[]>([]);

  const defaultTheme: InvitationTheme = {
    background: "#ffffff",
    namesColor: "#B76E79",
    textColor: "#1a1a2e",
    accentColor: "#B8860B",
    dividerColor: "#B8860B",
    countdownBg: "#FDF3DC",
    scratchBorder: "#B8860B",
  };

  const currentTheme = theme || defaultTheme;
  const weddingDateText = formatTamilDate(invitation?.weddingDate);

  useEffect(() => {
    const canvas = scratchRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, currentTheme.dividerColor);
    grad.addColorStop(0.3, currentTheme.accentColor);
    grad.addColorStop(0.6, currentTheme.dividerColor);
    grad.addColorStop(1, currentTheme.accentColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    for (let i = 0; i < canvas.width; i += 20) {
      for (let j = 0; j < canvas.height; j += 20) {
        ctx.fillRect(i, j, 10, 10);
      }
    }

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "bold 18px font-tamil, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("கொஞ்சம் scratch செய்யுங்கள்...", canvas.width / 2, canvas.height / 2 + 6);
  }, [currentTheme]);

  const triggerBoom = useCallback(() => {
    if (isBooming) return;
    setIsBooming(true);
    setScratched(true);
    setPercent(100);
    
    if (confettiRef.current) {
      launchConfetti(confettiRef.current);
    }
  }, [isBooming]);

  function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function scratch(pos: { x: number; y: number }) {
    const canvas = scratchRef.current;
    if (!canvas || isBooming) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    for (let i = 0; i < 3; i++) {
      sparkles.current.push({
        x: pos.x + (Math.random() - 0.5) * 10,
        y: pos.y + (Math.random() - 0.5) * 10,
        life: 1,
        color: ["#FFD700", "#FFF", "#B8860B"][Math.floor(Math.random() * 3)]
      });
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 28, 0, Math.PI * 2);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }
    const percentage = (transparent / (pixels.length / 4)) * 100;
    setPercent(percentage);

    if (percentage > 15) {
      triggerBoom();
    }
  }

  useEffect(() => {
    if (isBooming) return;
    const canvas = scratchRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame: number;
    const drawSparkles = () => {
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      sparkles.current = sparkles.current.filter(s => s.life > 0);
      for (const s of sparkles.current) {
        ctx.globalAlpha = s.life;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fill();
        s.life -= 0.05;
      }
      ctx.restore();
      frame = requestAnimationFrame(drawSparkles);
    };
    frame = requestAnimationFrame(drawSparkles);
    return () => cancelAnimationFrame(frame);
  }, [isBooming]);

  // Template specific glow and container styles
  const getContainerStyles = () => {
    let glow = 'rgba(255,215,0,0.4)';
    if (invitation?.templateId === 'mughal-emerald') glow = 'rgba(212,175,55,0.5)';
    else if (invitation?.templateId === 'garden-romance') glow = 'rgba(200,169,81,0.5)';
    else if (invitation?.templateId === 'modern-minimal') glow = 'rgba(212,175,55,0.5)';

    return {
      height: 160,
      maxWidth: 360,
      borderRadius: '16px',
      border: '2px solid rgba(255,215,0,0.6)',
      boxShadow: `0 0 20px ${glow}, 0 0 40px ${glow.replace('0.5', '0.2').replace('0.4', '0.2')}`,
      background: invitation?.templateId === 'mughal-emerald' ? 'rgba(13,35,24,0.8)' : (invitation?.templateId === 'garden-romance' ? 'rgba(45,90,27,0.15)' : currentTheme.alternateBg),
      backdropFilter: 'blur(10px)',
    };
  };

  return (
    <section className="py-16 px-4" style={{ backgroundColor: currentTheme.sectionBg || currentTheme.background }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes bounce-custom {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .shimmer-text {
          background: linear-gradient(135deg, #FFD700, #FFA500, #FFD700, #FFF, #FFD700);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s infinite linear;
        }
        .bounce-emoji {
          display: inline-block;
          animation: bounce-custom 2s infinite ease-in-out;
        }
      `}</style>

      <div className="max-w-md mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold tracking-widest uppercase mb-2 font-tamil"
          style={{ color: currentTheme.accentColor }}
        >
          Interactive Feature
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-tamil text-2xl sm:text-3xl font-bold mb-6"
          style={{ color: currentTheme.namesColor }}
        >
          {scratched ? "🎉 திருமண தேதி!" : "தேதியை scratch செய்து பாருங்கள்! 🎉"}
        </motion.h2>

        <div className="relative mx-auto overflow-hidden" 
             style={getContainerStyles()}>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <AnimatePresence>
              {scratched && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.8, 1.2, 1.0], opacity: 1 }}
                  transition={{ duration: 0.5, times: [0, 0.6, 1] }}
                  className="flex flex-col items-center"
                >
                  <p className="font-tamil text-[1.1rem] font-semibold tracking-[3px] uppercase mb-1" 
                     style={{ color: 'rgba(255,255,255,0.7)' }}>
                    உங்கள் திருமண தேதி
                  </p>
                  <h3 className="font-tamil text-[2.8rem] font-black mb-1 shimmer-text" 
                      style={{ fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
                    {weddingDateText}
                  </h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-[2rem] flex gap-3"
                  >
                    <span className="bounce-emoji">🎊</span>
                    <span className="bounce-emoji" style={{ animationDelay: '0.2s' }}>🎉</span>
                    <span className="bounce-emoji" style={{ animationDelay: '0.4s' }}>✨</span>
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {!scratched && (
               <div className="opacity-10 select-none">
                 <p className="font-tamil text-4xl font-bold">{weddingDateText}</p>
               </div>
            )}
          </div>

          <canvas
            ref={scratchRef}
            width={360}
            height={160}
            style={{ 
              transition: "opacity 0.5s ease-out",
              opacity: isBooming ? 0 : 1,
              pointerEvents: isBooming ? 'none' : 'auto'
            }}
            className="scratch-canvas absolute inset-0 w-full h-full"
            onMouseDown={() => (drawing.current = true)}
            onMouseUp={() => (drawing.current = false)}
            onMouseLeave={() => (drawing.current = false)}
            onMouseMove={(e) => {
              if (drawing.current && scratchRef.current)
                scratch(getPos(e, scratchRef.current));
            }}
            onTouchStart={(e) => {
              drawing.current = true;
              if (scratchRef.current) scratch(getPos(e, scratchRef.current));
            }}
            onTouchEnd={() => (drawing.current = false)}
            onTouchMove={(e) => {
              e.preventDefault();
              if (drawing.current && scratchRef.current)
                scratch(getPos(e, scratchRef.current));
            }}
          />

          <canvas
            ref={confettiRef}
            width={360}
            height={160}
            className="pointer-events-none absolute inset-0 w-full h-full"
          />
        </div>

        {!scratched && (
          <div className="mt-8">
            <div className="h-1.5 rounded-full max-w-xs mx-auto overflow-hidden bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{ width: `${Math.min(percent, 100)}%`, backgroundColor: currentTheme.accentColor }}
              />
            </div>
            <p className="text-xs mt-2 opacity-60 font-tamil" style={{ color: currentTheme.textColor }}>
              {Math.round(percent)}% scratched
            </p>
          </div>
        )}
        
        {scratched && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-tamil text-[0.95rem] font-semibold mt-6 italic tracking-[1px]" 
            style={{ color: '#FFD700', marginTop: '12px' }}
          >
            சேமித்து வைக்க மறக்காதீர்கள்! ✨
          </motion.p>
        )}
      </div>
    </section>
  );
}
