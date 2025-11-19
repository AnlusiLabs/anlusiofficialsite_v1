import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ProblemSectionProps } from '../../types'
import Navbar from '../ui/Navbar'

export default function ProblemSection({ hasAudio, onSoundToggle }: ProblemSectionProps) {
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
      
      {/* Main Content - Top Left */}
      <div style={{
        position: 'absolute',
        top: '120px', // Just under the navbar
        left: '60px',
        maxWidth: '800px'
      }}>
        <motion.h6
          initial={{ opacity: 0, y: 30 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#fa6836',
            fontWeight: 600,
            marginBottom: '30px',
            margin: 0
          }}
        >
          [The problem]
        </motion.h6>
        
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            fontSize: '4rem',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#f2e2c1',
            marginBottom: '30px',
            marginTop: '30px'
          }}
        >
          Solving complex <br />
          visual challenges
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            fontSize: '1.2rem',
            lineHeight: 1.6,
            color: '#f2e2c1',
            opacity: 0.9,
            maxWidth: '600px'
          }}
        >
          We assist clients with intricate visual ideas for interfaces by finding solutions to bring them to life.
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
