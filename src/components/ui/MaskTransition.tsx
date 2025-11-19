import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface MaskTransitionProps {
  onComplete?: () => void
  onScrollBack?: () => void
}

export default function MaskTransition({ onComplete, onScrollBack }: MaskTransitionProps) {
  const maskElementRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef(0)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    
    const maskElement = maskElementRef.current
    if (!maskElement) return
    
    // Start with mask hidden at bottom (progress = 0)
    scrollProgressRef.current = 0
    
    // Initialize mask to be hidden at bottom
    gsap.set(maskElement, {
      clipPath: 'inset(100% 0% 0% 0%)', // Hidden at bottom initially  
      background: '#0f1f2b' // Same as footer background
    })
    
    let lastScrollTime = 0
    const SCROLL_DELAY = 50 // Smooth scroll detection

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScrollTime < SCROLL_DELAY) return
      
      lastScrollTime = now

      // Scroll down to reveal mask (and footer behind it) from bottom, bit by bit
      if (e.deltaY > 0) {
        // Scrolling down - mask emerges from bottom (smaller increments for smoother reveal)
        scrollProgressRef.current = Math.min(100, scrollProgressRef.current + 4)
      } else {
        // Scrolling up - mask retracts to bottom (go back to CTA)
        if (scrollProgressRef.current > 0) {
          scrollProgressRef.current = Math.max(0, scrollProgressRef.current - 4)
        }
      }

      // Calculate clipPath for mask emerging from bottom
      // When progress = 0: topInset = 100% → mask completely hidden at bottom
      // When progress = 50: topInset = 50% → mask covers bottom half of screen  
      // When progress = 100: topInset = 0% → mask covers entire screen
      const topInset = Math.max(0, 100 - scrollProgressRef.current)
      const clipPath = `inset(${topInset}% 0% 0% 0%)`
      
      
      // Apply the mask effect
      gsap.set(maskElement, { 
        clipPath: clipPath
      })

      // Complete transition when footer is revealed enough (lower threshold for easier testing)
      if (scrollProgressRef.current >= 50 && onComplete && !hasCompletedRef.current) {
        hasCompletedRef.current = true
        setTimeout(() => {
          onComplete()
        }, 100)
      }
      
      // Reset completion flag when scrolling back
      if (scrollProgressRef.current < 45) {
        hasCompletedRef.current = false
      }
      
      // Go back to CTA when footer is hidden
      if (scrollProgressRef.current <= 5 && onScrollBack) {
        setTimeout(() => {
          onScrollBack()
        }, 200)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [onComplete, onScrollBack])

  return (
    <div 
      ref={maskElementRef}
      className="mask-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#0f1f2b',
        color: '#f2e2c1',
        fontFamily: 'Orbitron, monospace',
        zIndex: 1100,
        clipPath: 'inset(100% 0% 0% 0%)', // Start hidden at bottom
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 60px',
        textAlign: 'center'
      }}
    >
      {/* Footer content inside the mask */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{
          fontSize: '4rem',
          fontWeight: 800,
          lineHeight: 1.1,
          color: '#f2e2c1',
          marginBottom: '40px',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          Thank You
        </h2>
        
        <p style={{
          fontSize: '1.2rem',
          lineHeight: 1.6,
          color: '#f2e2c1',
          opacity: 0.8,
          maxWidth: '600px'
        }}>
          We appreciate you taking the time to explore our work. 
          Ready to create something amazing together?
        </p>
      </div>

      {/* Footer Links */}
      <div style={{
        display: 'flex',
        gap: '60px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h6 style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#fa6836',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Contact
          </h6>
          <p style={{
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: '#f2e2c1',
            opacity: 0.8
          }}>
            hello@cubemail.com<br/>
            +27 123 456 789
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h6 style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#fa6836',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Follow Us
          </h6>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <a href="#" style={{
              fontSize: '0.9rem',
              color: '#f2e2c1',
              opacity: 0.8,
              textDecoration: 'none'
            }}>
              LinkedIn
            </a>
            <a href="#" style={{
              fontSize: '0.9rem',
              color: '#f2e2c1',
              opacity: 0.8,
              textDecoration: 'none'
            }}>
              GitHub
            </a>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h6 style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#fa6836',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Legal
          </h6>
          <p style={{
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: '#f2e2c1',
            opacity: 0.8
          }}>
            © 2025 CubeMail<br/>
            All rights reserved
          </p>
        </div>
      </div>
    </div>
  )
}
