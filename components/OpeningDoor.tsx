'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface OpeningDoorProps {
  onOpen: () => void
  accentColor: string
  backgroundColor: string
}

export default function OpeningDoor({
  onOpen,
  accentColor,
  backgroundColor
}: OpeningDoorProps) {
  const [isOpening, setIsOpening] = useState(false)

  const handleTap = () => {
    if (isOpening) return
    setIsOpening(true)
    setTimeout(() => onOpen(), 1400)
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100dvh',
        backgroundColor: backgroundColor,
        overflow: 'hidden',
        zIndex: 9999
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Left curtain - slides left when opening */}
        <motion.rect
          x="0" y="0"
          width="195" height="844"
          fill={backgroundColor}
          animate={isOpening ? { x: -195 } : { x: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Right curtain - slides right when opening */}
        <motion.rect
          x="195" y="0"
          width="195" height="844"
          fill={backgroundColor}
          animate={isOpening ? { x: 195 } : { x: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Main vertical line - top half */}
        <motion.line
          x1="195" y1="0"
          x2="195" y2="380"
          stroke={accentColor}
          strokeWidth="0.6"
          opacity="0.5"
          animate={isOpening ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 0.5 }}
          transition={{ duration: 0.4 }}
        />

        {/* Main vertical line - bottom half */}
        <motion.line
          x1="195" y1="464"
          x2="195" y2="844"
          stroke={accentColor}
          strokeWidth="0.6"
          opacity="0.5"
          animate={isOpening ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 0.5 }}
          transition={{ duration: 0.4 }}
        />

        {/* Top diamond ornament */}
        <motion.polygon
          points="195,30 200,45 195,60 190,45"
          fill="none"
          stroke={accentColor}
          strokeWidth="0.8"
          opacity="0.6"
          animate={isOpening ? { opacity: 0 } : { opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom diamond ornament */}
        <motion.polygon
          points="195,784 200,799 195,814 190,799"
          fill="none"
          stroke={accentColor}
          strokeWidth="0.8"
          opacity="0.6"
          animate={isOpening ? { opacity: 0 } : { opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />

        {/* Upper middle diamond */}
        <motion.polygon
          points="195,280 199,295 195,310 191,295"
          fill={accentColor}
          opacity="0.4"
          animate={isOpening ? { opacity: 0 } : { opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        />

        {/* Lower middle diamond */}
        <motion.polygon
          points="195,534 199,549 195,564 191,549"
          fill={accentColor}
          opacity="0.4"
          animate={isOpening ? { opacity: 0 } : { opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        />

        {/* Short horizontal lines - left */}
        <motion.line
          x1="80" y1="422"
          x2="155" y2="422"
          stroke={accentColor}
          strokeWidth="0.5"
          opacity="0.35"
          animate={isOpening ? { opacity: 0 } : { opacity: 0.35 }}
          transition={{ duration: 0.3 }}
        />

        {/* Short horizontal lines - right */}
        <motion.line
          x1="235" y1="422"
          x2="310" y2="422"
          stroke={accentColor}
          strokeWidth="0.5"
          opacity="0.35"
          animate={isOpening ? { opacity: 0 } : { opacity: 0.35 }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner ornament - top left */}
        <motion.g
          opacity="0.4"
          animate={isOpening ? { opacity: 0 } : { opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        >
          <line x1="20" y1="30" x2="60" y2="30" 
            stroke={accentColor} strokeWidth="0.6"/>
          <line x1="20" y1="30" x2="20" y2="70" 
            stroke={accentColor} strokeWidth="0.6"/>
          <circle cx="20" cy="30" r="2" 
            fill={accentColor} opacity="0.8"/>
        </motion.g>

        {/* Corner ornament - top right */}
        <motion.g
          opacity="0.4"
          animate={isOpening ? { opacity: 0 } : { opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        >
          <line x1="370" y1="30" x2="330" y2="30" 
            stroke={accentColor} strokeWidth="0.6"/>
          <line x1="370" y1="30" x2="370" y2="70" 
            stroke={accentColor} strokeWidth="0.6"/>
          <circle cx="370" cy="30" r="2" 
            fill={accentColor} opacity="0.8"/>
        </motion.g>

        {/* Corner ornament - bottom left */}
        <motion.g
          opacity="0.4"
          animate={isOpening ? { opacity: 0 } : { opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        >
          <line x1="20" y1="814" x2="60" y2="814" 
            stroke={accentColor} strokeWidth="0.6"/>
          <line x1="20" y1="814" x2="20" y2="774" 
            stroke={accentColor} strokeWidth="0.6"/>
          <circle cx="20" cy="814" r="2" 
            fill={accentColor} opacity="0.8"/>
        </motion.g>

        {/* Corner ornament - bottom right */}
        <motion.g
          opacity="0.4"
          animate={isOpening ? { opacity: 0 } : { opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        >
          <line x1="370" y1="814" x2="330" y2="814" 
            stroke={accentColor} strokeWidth="0.6"/>
          <line x1="370" y1="814" x2="370" y2="774" 
            stroke={accentColor} strokeWidth="0.6"/>
          <circle cx="370" cy="814" r="2" 
            fill={accentColor} opacity="0.8"/>
        </motion.g>
      </svg>

      {/* Glowing circle button */}
      <div 
        onClick={handleTap}
        onTouchStart={(e) => { 
          e.preventDefault()
          e.stopPropagation()
          handleTap() 
        }}
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{
            boxShadow: [
              `0 0 20px 5px ${accentColor}40`,
              `0 0 40px 15px ${accentColor}60`,
              `0 0 20px 5px ${accentColor}40`
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
          }}
        />

        {/* Circle button */}
        <motion.div
          animate={{
            boxShadow: [
              `0 0 10px 2px ${accentColor}`,
              `0 0 25px 8px ${accentColor}`,
              `0 0 10px 2px ${accentColor}`
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            width: '75px',
            height: '75px',
            borderRadius: '50%',
            backgroundColor: '#000000',
            border: `1.5px solid ${accentColor}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1px',
            position: 'relative',
            zIndex: 2
          }}
        >
          <span style={{
            color: accentColor,
            fontSize: '20px',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            lineHeight: 1
          }}>V</span>
          <span style={{
            color: accentColor,
            fontSize: '6px',
            letterSpacing: '1.5px',
            textAlign: 'center'
          }}>TAP TO OPEN</span>
        </motion.div>
      </div>
    </div>
  )
}
