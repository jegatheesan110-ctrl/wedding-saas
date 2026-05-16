'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onOpen: () => void
  accentColor?: string
  backgroundColor?: string
}

export default function OpeningScreen({ 
  onOpen, 
  accentColor = '#D4AF37', 
  backgroundColor = '#061a0a' 
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    setTimeout(() => onOpen(), 1200)
  }

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: backgroundColor,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

      {/* RENDER DOOR OR CURTAIN IF NEEDED - FOR NOW WE FOCUS ON THE BUTTON AS REQUESTED */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* 3 Animated Glow Rings */}
            {[0, 0.3, 0.6].map((delay, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: `2px solid ${accentColor}`,
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  boxShadow: `0 0 15px ${accentColor}`,
                  animation: `pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) ${delay}s infinite`,
                }}
              />
            ))}

            {/* Main Button */}
            <div 
              onClick={handleOpen}
              onTouchEnd={(e) => {
                e.preventDefault()
                handleOpen()
              }}
              style={{ 
                position: 'relative',
                zIndex: 10,
                width: '85px',
                height: '85px',
                borderRadius: '50%',
                backgroundColor: '#000',
                border: `2px solid ${accentColor}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: `0 0 20px ${accentColor}88`
              }}
            >
              <span style={{
                color: accentColor,
                fontSize: '28px',
                fontWeight: 'bold',
                fontFamily: 'serif',
                lineHeight: 1
              }}>V</span>
              <span style={{
                color: accentColor,
                fontSize: '8px',
                letterSpacing: '1.5px',
                marginTop: '4px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>TAP TO OPEN</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CURTAIN ANIMATION (Similar to OpeningDoor) */}
      <motion.div
        animate={isOpen ? { x: '-100%' } : { x: '0%' }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: '50%',
          backgroundColor: backgroundColor,
          borderRight: `1px solid ${accentColor}33`,
          zIndex: 5
        }}
      />
      <motion.div
        animate={isOpen ? { x: '100%' } : { x: '0%' }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          width: '50%',
          backgroundColor: backgroundColor,
          borderLeft: `1px solid ${accentColor}33`,
          zIndex: 5
        }}
      />
    </div>
  )
}
