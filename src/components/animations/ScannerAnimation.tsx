import { useState, useEffect } from 'react'

interface ScannerAnimationProps {
  messages: string[]
  speed?: number
  onScanComplete?: (scanCount: number) => void
  totalScans?: number
  style?: React.CSSProperties
  className?: string
}

export default function ScannerAnimation({ 
  messages, 
  speed = 600, 
  onScanComplete,
  totalScans = messages.length * 3,
  style = {},
  className = ''
}: ScannerAnimationProps) {
  const [scanCount, setScanCount] = useState(0)

  useEffect(() => {
    if (scanCount >= totalScans) {
      return
    }

    const timeout = setTimeout(() => {
      setScanCount(prev => prev + 1)
      onScanComplete?.(scanCount + 1)
    }, scanCount === 0 ? 100 : speed)

    return () => clearTimeout(timeout)
  }, [scanCount, speed, totalScans, onScanComplete])

  return (
    <div 
      className={`scanner-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '300px',
        height: '200px',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Highlight bar */}
      <div
        className="highlight-bar"
        key={`highlight-${scanCount}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '1.6rem',
          background: 'rgba(250, 104, 54, 0.15)',
          borderLeft: '3px solid #fa6836',
          borderRight: '3px solid #fa6836',
          borderRadius: '4px',
          pointerEvents: 'none',
          zIndex: 5,
          boxShadow: '0 0 10px rgba(250, 104, 54, 0.4)',
          transform: 'translateY(0)',
          animation: `highlightMove ${speed / 1000}s ease-in-out`
        }}
      />

      {/* Lines container */}
      <div 
        className="loading-lines"
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transform: `translateY(-${scanCount * 2}rem)`,
          transition: `transform ${speed / 1000}s linear`
        }}
      >
        {/* Create infinite scrolling lines */}
        {[...Array(50)].map((_, index) => {
          const messageIndex = index % messages.length
          return (
            <p 
              key={`scanner-line-${index}`}
              style={{ 
                fontSize: '0.9rem', 
                margin: '0.4rem 0', 
                color: '#f2e2c1', 
                minHeight: '1.6rem', 
                position: 'relative', 
                letterSpacing: '0.5px' 
              }}
            >
              {messages[messageIndex]}
            </p>
          )
        })}
      </div>
    </div>
  )
}
