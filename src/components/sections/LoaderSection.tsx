import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TypewriterText, ScannerAnimation, BlinkingCursor } from '../animations'
import type { LoaderSectionProps } from '../../types'

export default function LoaderSection({ onComplete }: LoaderSectionProps) {
  const [progress, setProgress] = useState(0)
  const [scanCount, setScanCount] = useState(0)

  // Loading messages in the same order as your original
  const loadingMessages = [
    '//Synchronizing Parallel Realities...',
    '//Transmitting Quantum Signals...',
    '//Unlocking Digital Dimensions...',
    "//You're About to Enter the Future...",
    '//Initializing Neural Interface...',
    '//Decrypting Data Streams...',
    '//Synchronizing Parallel...',
    '//Optimizing Data Pipelines...',
    '//Establishing Secure Channels...',
    '//Rendering Multiverse Layers...',
    '//Compiling Final Sequence...'
  ]

  // Exact typewriter message from your original code
  const message = `// Hang tight, Explorer. The data transfer
is in progress. It might take a moment, but
the journey ahead is worth the wait...`

  const totalScans = loadingMessages.length * 3 // 11 lines * 3 scans each
  
  // Handle completion when scanning is done
  useEffect(() => {
    if (scanCount >= totalScans) {
      setProgress(100)
      setTimeout(onComplete, 800)
    }
  }, [scanCount, totalScans, onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      id="loader"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        background: '#152636',
        color: '#f2e2c1',
        fontFamily: 'Orbitron, sans-serif'
      }}
    >
      {/* Left scanner - Using reusable ScannerAnimation component */}
      <div style={{
        position: 'absolute',
        left: '50px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}>
        <ScannerAnimation
          messages={loadingMessages}
          speed={600}
          totalScans={totalScans}
          onScanComplete={(count) => {
            const perc = Math.min(100, Math.floor((count / totalScans) * 100))
            setProgress(perc)
            setScanCount(count)
          }}
        />
      </div>

      {/* Center percentage - EXACT copy of your HTML */}
      <div 
        className="loader-percentage-wrapper"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          fontSize: '1.5rem',
          color: '#f2e2c1'
        }}
      >
        <div className="loader-percentage" style={{ fontSize: '1.5rem', color: '#f2e2c1' }}>
          {progress >= 100 ? '[done]' : `[${progress}%]`}
        </div>
      </div>

      {/* Right typewriter - Using reusable TypewriterText component */}
      <div 
        className="typewriter-wrapper"
        style={{
          position: 'absolute',
          right: '50px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '400px',
          fontSize: '1rem',
          color: '#f2e2c1',
          lineHeight: '1.4rem',
          whiteSpace: 'pre-wrap'
        }}
      >
        <TypewriterText
          text={message}
          speed={50}
          delay={0}
          style={{
            display: 'inline',
            fontFamily: 'Orbitron, sans-serif'
          }}
        />
        <BlinkingCursor />
      </div>
    </motion.div>
  )
}
