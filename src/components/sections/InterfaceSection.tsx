import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { InterfaceSectionProps } from '../../types'
import Navbar from '../ui/Navbar'

export default function InterfaceSection({ hasAudio, onSoundToggle }: InterfaceSectionProps) {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    // Show text after component mounts
    const timer = setTimeout(() => setShowText(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#0f1f2b',
        color: '#f2e2c1',
        fontFamily: 'Orbitron, monospace',
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      {/* Navbar */}
      <Navbar hasAudio={hasAudio} onSoundToggle={onSoundToggle} />
      
      {/* Bottom Left Content */}
      <div className="interface-content" style={{
        position: 'absolute',
        bottom: '80px',
        left: '60px',
        maxWidth: '600px'
      }}>
        <motion.h6
          initial={{ opacity: 0, y: 30 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="interface-subtitle"
          style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#fa6836',
            fontWeight: 600,
            marginBottom: '30px',
            margin: 0
          }}
        >
          [interfaces that you need in one team]
        </motion.h6>
        
        <motion.h4
          initial={{ opacity: 0, y: 50 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="interface-title"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#f2e2c1',
            marginTop: '30px'
          }}
        >
          AnLuSi solves any <br />
          Frontend challenges.
        </motion.h4>
      </div>

      {/* Bottom Right Content */}
      <div className="interface-description-container" style={{
        position: 'absolute',
        bottom: '80px',
        right: '6cm', // 6 cm from the right edge
        maxWidth: '400px'
      }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="interface-description"
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            lineHeight: 1.6,
            color: '#f2e2c1',
            opacity: 0.9,
            textAlign: 'left'
          }}
        >
          We deliver the complete solution your company needs to impress users with a smooth, responsive, and aesthetically pleasing interface.
        </motion.p>
      </div>

      {/* Background Elements - matching other pages */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-white rounded-full" />
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 border border-orange-500 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 border border-white/50 rounded-full" />
      </div>
    </motion.div>
  )
}
