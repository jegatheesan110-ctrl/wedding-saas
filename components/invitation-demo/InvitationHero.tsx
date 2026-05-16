"use client";

import { motion } from "framer-motion";
import { InvitationTheme, InvitationRenderData, TamilTemplateId } from "@/types";

export function InvitationHero({ 
  theme, 
  invitation 
}: { 
  theme?: InvitationTheme; 
  invitation: InvitationRenderData 
}) {
  if (!invitation) return null;

  const templateId = invitation.templateId;

  // Design config based on template
  const getDesign = (tid: TamilTemplateId) => {
    switch (tid) {
      case "royal-elegance":
        return {
          gradient: "linear-gradient(160deg, #2d0000, #350000)",
          gold: "#c9a84c",
          ornament: "⚜️",
          cornerColor: "#c9a84c",
          bgPattern: "radial-gradient(circle, #350000 1px, transparent 1px)",
          patternSize: "20px 20px"
        };
      case "garden-romance":
        return {
          gradient: "linear-gradient(160deg, #0d2010, #122618)",
          gold: "#8fbc5a",
          ornament: "🌿",
          cornerColor: "#d4af37",
          bgPattern: "radial-gradient(circle, #122618 1px, transparent 1px)",
          patternSize: "30px 30px"
        };
      case "modern-minimal":
        return {
          gradient: "linear-gradient(160deg, #060d1a, #0a1422)",
          gold: "#ffffff",
          ornament: "◆",
          cornerColor: "#ffffff",
          bgPattern: "linear-gradient(30deg, #0a1422 12%, transparent 12.5%, transparent 87%, #0a1422 87.5%, #0a1422), linear-gradient(150deg, #0a1422 12%, transparent 12.5%, transparent 87%, #0a1422 87.5%, #0a1422)",
          patternSize: "40px 70px"
        };
      case "mughal-emerald":
        return {
          gradient: "linear-gradient(160deg, #0d2318, #163024)",
          gold: "#c8a951",
          ornament: "💎",
          cornerColor: "#c8a951",
          bgPattern: "radial-gradient(circle, #163024 1px, transparent 1px)",
          patternSize: "25px 25px"
        };
      case "rose-gold-blush":
        return {
          gradient: "linear-gradient(160deg, #2d1a1a, #3d2525)",
          gold: "#d4af37",
          ornament: "❤",
          cornerColor: "#d4af37",
          bgPattern: "radial-gradient(circle, #3d2525 1px, transparent 1px)",
          patternSize: "25px 25px"
        };
      case "midnight-royal":
        return {
          gradient: "linear-gradient(160deg, #0d0619, #120820)",
          gold: "#d4af37",
          ornament: "✨",
          cornerColor: "#9b59b6",
          bgPattern: "radial-gradient(circle, #120820 1px, transparent 1px)",
          patternSize: "15px 15px"
        };
      default:
        return {
          gradient: "linear-gradient(160deg, #2d0000, #350000)",
          gold: "#c9a84c",
          ornament: "⚜️",
          cornerColor: "#c9a84c",
          bgPattern: "none",
          patternSize: "0"
        };
    }
  };

  const design = getDesign(templateId);

  const isCustomBg = templateId === 'royal-elegance' || templateId === 'modern-minimal' || templateId === 'garden-romance' || templateId === 'mughal-emerald';

  return (
    <div style={isCustomBg ? {
      backgroundImage: 
        templateId === 'royal-elegance' ? 'url(/images/temple-bg.jpg)' : 
        templateId === 'modern-minimal' ? 'url(/images/garden-bg.jpg)' : 
        templateId === 'garden-romance' ? 'url(/images/green-bg.jpg)' : 
        templateId === 'mughal-emerald' ? 'url(/images/mugal-bg.jpg)' : undefined,
      backgroundSize: 'cover',
      backgroundPosition: templateId === 'garden-romance' ? 'center top' : 'center',
      minHeight: '100dvh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    } : {
      position: 'relative',
      minHeight: '100dvh',
      background: design.gradient,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {isCustomBg && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 
            templateId === 'royal-elegance' ? 'rgba(20, 0, 0, 0.65)' : 
            templateId === 'modern-minimal' ? 'rgba(0, 20, 60, 0.4)' : 
            templateId === 'mughal-emerald' ? 'rgba(0, 20, 60, 0.4)' : 
            'rgba(0, 0, 0, 0.2)',
          zIndex: 1
        }} />
      )}

      {templateId === 'garden-romance' && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, #2d5a1b)',
          zIndex: 2,
        }} />
      )}

      {templateId === 'mughal-emerald' && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, transparent, #0d2318)',
          zIndex: 2,
        }} />
      )}

      <div style={isCustomBg ? { position: 'relative', zIndex: 3, flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } : { display: 'contents' }}>
      {/* Subtle Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: design.bgPattern,
        backgroundSize: design.patternSize,
        opacity: 0.1,
        pointerEvents: 'none'
      }} />

      {templateId !== 'royal-elegance' && templateId !== 'modern-minimal' && templateId !== 'garden-romance' && templateId !== 'mughal-emerald' && (
        <>
          {/* Full ornamental border frame */}
          <div style={{
            position: 'absolute',
            top: '12px', left: '12px',
            right: '12px', bottom: '12px',
            border: `1px solid ${design.gold}`,
            opacity: 0.4,
            pointerEvents: 'none'
          }} />
          
          {/* Inner border */}
          <div style={{
            position: 'absolute',
            top: '20px', left: '20px',
            right: '20px', bottom: '20px',
            border: `1px solid ${design.gold}`,
            opacity: 0.2,
            pointerEvents: 'none'
          }} />

          {/* Corner ornaments - SVG */}
          <CornerSVG style={{ top: '8px', left: '8px' }} color={design.cornerColor} variant={templateId === 'modern-minimal' ? 'geometric' : 'classic'} />
          <CornerSVG style={{ top: '8px', right: '8px', transform: 'scaleX(-1)' }} color={design.cornerColor} variant={templateId === 'modern-minimal' ? 'geometric' : 'classic'} />
          <CornerSVG style={{ bottom: '8px', left: '8px', transform: 'scaleY(-1)' }} color={design.cornerColor} variant={templateId === 'modern-minimal' ? 'geometric' : 'classic'} />
          <CornerSVG style={{ bottom: '8px', right: '8px', transform: 'scale(-1)' }} color={design.cornerColor} variant={templateId === 'modern-minimal' ? 'geometric' : 'classic'} />
        </>
      )}

      {/* Top center ornament */}
      <div style={{
        position: 'absolute',
        top: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: design.gold,
        fontSize: '28px',
        opacity: 0.8
      }}>
        {design.ornament}
      </div>

      {/* Main content - names, etc */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        style={{ zIndex: 1, textAlign: 'center', padding: '0 40px' }}
      >
        <p style={{
          fontSize: '11px',
          letterSpacing: '5px',
          color: templateId === 'garden-romance' ? '#ffffff' : design.gold,
          textShadow: templateId === 'garden-romance' ? '1px 1px 6px rgba(0,0,0,0.9)' : 'none',
          textTransform: 'uppercase',
          marginBottom: '24px',
          fontFamily: 'serif',
          opacity: 0.9
        }}>
          திருமண அழைப்பிதழ்
        </p>
        
        {/* Couple Names */}
        <h1 style={{
          fontFamily: 'serif',
          fontSize: templateId === 'garden-romance' ? 'clamp(3.5rem, 12vw, 5.5rem)' : 'clamp(2.5rem, 10vw, 4.5rem)',
          color: templateId === 'garden-romance' ? '#ffffff' : design.gold,
          textShadow: templateId === 'garden-romance' ? '2px 2px 8px rgba(0,0,0,0.8)' : '0 2px 4px rgba(0,0,0,0.3)',
          lineHeight: 1.2,
          fontWeight: templateId === 'garden-romance' ? 700 : 'normal',
        }}>
          {invitation.brideName} <br />
          <span style={{ fontSize: '0.6em', opacity: 0.7 }}>&</span> <br />
          {invitation.groomName}
        </h1>

        {invitation.familyNames && (
          <p style={{
            marginTop: '20px',
            fontSize: '16px',
            fontFamily: 'serif',
            color: design.gold,
            opacity: 0.7,
            fontStyle: 'italic'
          }}>
            {invitation.familyNames}
          </p>
        )}
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div 
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: design.gold,
          opacity: 0.6
        }}
      >
        <p style={{ 
          fontSize: '9px', 
          letterSpacing: '4px',
          marginBottom: '8px',
          fontWeight: 'bold'
        }}>SCROLL</p>
        <div style={{ fontSize: '20px' }}>↓</div>
      </motion.div>
      </div>
    </div>
  );
}

function CornerSVG({ style, color, variant }: { style: React.CSSProperties, color: string, variant: 'classic' | 'geometric' }) {
  if (variant === 'geometric') {
    return (
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          pointerEvents: 'none',
          ...style
        }}
      >
        <path d="M10,10 L10,60 L20,60 L20,20 L60,20 L60,10 Z" fill={color} opacity="0.2" />
        <path d="M10,10 L10,60 M10,10 L60,10" stroke={color} strokeWidth="2" />
        <path d="M20,20 L20,50 M20,20 L50,20" stroke={color} strokeWidth="1" opacity="0.5" />
        <rect x="8" y="8" width="4" height="4" fill={color} transform="rotate(45 10 10)" />
        <path d="M30,30 L45,30 L30,45 Z" fill={color} opacity="0.3" />
      </svg>
    );
  }

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      style={{
        position: 'absolute',
        width: '100px',
        height: '100px',
        pointerEvents: 'none',
        ...style
      }}
    >
      <path d="M10,10 L10,50 Q10,10 50,10" 
        stroke={color} strokeWidth="1.5" />
      <path d="M10,10 L50,10 Q10,10 10,50" 
        stroke={color} strokeWidth="0.5" opacity="0.5" />
      <circle cx="10" cy="10" r="4" 
        fill={color} opacity="0.8" />
      <path d="M25,25 Q40,15 55,25 Q40,35 25,25" 
        stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M15,15 L15,30 Q15,15 30,15" 
        stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
