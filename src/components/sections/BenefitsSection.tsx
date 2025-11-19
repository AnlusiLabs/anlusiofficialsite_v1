import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { BenefitsSectionProps } from '../../types'
import Navbar from '../ui/Navbar'

export default function BenefitsSection({ onBackToIntro, hasAudio, onSoundToggle }: BenefitsSectionProps) {
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
      className="w-full h-screen relative"
      style={{ background: 'var(--secondary-bg)' }}
    >
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onBackToIntro}
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 z-50"
        style={{
          background: 'rgba(255,255,255,0.1)',
          color: 'var(--primary-text)',
          border: '2px solid var(--border-color)'
        }}
        whileHover={{ 
          borderColor: 'var(--accent-orange)',
          color: 'var(--accent-orange)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        ← Back to Introduction
      </motion.button>

      {/* Bottom Left Text Content */}
      <div className="absolute bottom-20 left-16 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg font-semibold mb-6 tracking-wide"
          style={{ color: 'var(--accent-orange)' }}
        >
          [Why is wow frontend so important]
        </motion.p>
        
        <motion.h6
          initial={{ opacity: 0, y: 50 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-2xl font-extrabold leading-tight"
          style={{ color: 'var(--primary-text)' }}
        >
          The Benefits of Modern <br />
          Frontend Development
        </motion.h6>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 space-y-4"
        >
          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ background: 'var(--accent-orange)' }} />
            <p className="text-lg opacity-90" style={{ color: 'var(--primary-text)' }}>
              Enhanced user engagement through immersive experiences
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ background: 'var(--accent-orange)' }} />
            <p className="text-lg opacity-90" style={{ color: 'var(--primary-text)' }}>
              Improved brand perception and competitive advantage
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ background: 'var(--accent-orange)' }} />
            <p className="text-lg opacity-90" style={{ color: 'var(--primary-text)' }}>
              Higher conversion rates and business growth
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-white rounded-full" />
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 border border-orange-500 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 border border-white/50 rounded-full" />
      </div>

      {/* Navbar */}
      <Navbar hasAudio={hasAudio} onSoundToggle={onSoundToggle} />
    </motion.div>
  )
}
