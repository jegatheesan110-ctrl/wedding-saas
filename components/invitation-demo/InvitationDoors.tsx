'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onOpen: () => void
  doorColor?: string
  lineColor?: string
}

export default function InvitationDoors({ 
  onOpen, 
  doorColor = '#0a2a1a', 
  lineColor = '#D4AF37'
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCracking, setIsCracking] = useState(false)

  const handleTap = (e?: any) => {
    if (e && e.type === 'touchstart') {
      e.preventDefault(); 
    }
    if (isOpen) return
    console.log('tapped'); // debug as requested
    setIsCracking(true)
    setTimeout(() => {
      setIsOpen(true)
      setTimeout(() => onOpen(), 1200)
    }, 200)
  }

  return (
    <div 
      onClick={() => handleTap()}
      onTouchStart={(e) => handleTap(e)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        background: doorColor,
        zIndex: 9999,
        overflow: 'hidden',
        cursor: 'pointer',
        pointerEvents: 'all',
        touchAction: 'manipulation'
      }}
    >
      
      {/* SINGLE TOP TRIANGLE FLAP (Envelope Style) */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: isOpen ? '-100%' : '0%' }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#8b0000', // User's requested color
          clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)',
          zIndex: 2,
          boxShadow: `0 4px 20px rgba(0,0,0,0.5)`
        }} 
      >
        {/* Flap Border Line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
          borderBottom: `2px solid ${lineColor}`,
          clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)',
          opacity: 0.8
        }} />
      </motion.div>

      {/* BOTTOM BASE (Remaining Envelope Part) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isOpen ? '100%' : '0%' }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: doorColor,
          zIndex: 1
        }}
      >
        {/* Subtle envelope lines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: `1px solid ${lineColor}22`,
          margin: '20px',
          borderRadius: '8px'
        }} />
      </motion.div>

      {/* CENTER TAP BUTTON */}
      {!isOpen && (
        <div
          onClick={handleTap}
          onTouchStart={handleTap}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            border: `2px solid ${lineColor}`,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            animation: 'pulse-glow 2s ease-in-out infinite',
            boxShadow: isCracking 
              ? `0 0 50px ${lineColor}`
              : `0 0 20px ${lineColor}44`
          }}
        >
          <span style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: lineColor,
            fontFamily: 'serif',
            lineHeight: 1,
            transform: isCracking ? 'scale(1.15)' : 'scale(1)',
            transition: 'transform 0.2s'
          }}>V</span>
          <span style={{
            fontSize: '8px',
            color: lineColor,
            letterSpacing: '1.5px',
            marginTop: '5px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>TAP TO OPEN</span>
        </div>
      )}

      {/* PULSE ANIMATION */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 15px ${lineColor}44, 0 0 30px ${lineColor}22; 
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            box-shadow: 0 0 25px ${lineColor}88, 0 0 50px ${lineColor}44; 
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
      `}</style>

    </div>
  )
}
