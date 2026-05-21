'use client'
import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    audioRef.current = new Audio('/music/nadaswaram.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.5
    audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error)
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error)
    }
  }

  return (
    <button
      onClick={toggleMusic}
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: '2px solid #d4af37',
        cursor: 'pointer',
        fontSize: '20px',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: isPlaying ? 
          'spin 3s linear infinite' : 'none'
      }}
    >
      🎵
    </button>
  )
}
