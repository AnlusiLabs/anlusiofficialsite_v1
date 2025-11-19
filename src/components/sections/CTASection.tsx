import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { CTASectionProps } from '../../types'
import Navbar from '../ui/Navbar'
import { useMaskWheelHandler } from '../../hooks/useMaskWheelHandler'

export default function CTASection({ onBackToWhoAreWe, disableScrollHandling, hasAudio, onSoundToggle }: CTASectionProps) {
  const lastScrollTime = useRef(0)

  // Use the separate mask wheel handler for footer reveal
  const { activateMaskHandler, deactivateMaskHandler } = useMaskWheelHandler({
    onComplete: () => {
    },
    onReset: () => {
    }
  })

  // Initialize mask handler when component mounts
  useEffect(() => {
    
    if (!disableScrollHandling) {
      activateMaskHandler()
    } else {
      deactivateMaskHandler()
    }

    return () => {
      deactivateMaskHandler()
    }
  }, [disableScrollHandling, activateMaskHandler, deactivateMaskHandler])

  // Handle navigation scroll events (only scroll UP to go back to Who Are We)
  useEffect(() => {
    if (disableScrollHandling) return

    const handleNavigationScroll = (e: WheelEvent) => {
      // Only handle scroll UP for navigation back to Who Are We
      // Scroll DOWN is handled by the mask handler
      if (e.deltaY >= 0) return
      
      const now = Date.now()
      if (now - lastScrollTime.current < 1000) return
      
      lastScrollTime.current = now
      
      if (onBackToWhoAreWe) {
        deactivateMaskHandler()
        onBackToWhoAreWe()
      }
    }

    window.addEventListener('wheel', handleNavigationScroll, { passive: false, capture: true })
    return () => window.removeEventListener('wheel', handleNavigationScroll, { capture: true })
  }, [onBackToWhoAreWe, disableScrollHandling, deactivateMaskHandler])

  return (
    <motion.div
      className="cta-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <Navbar hasAudio={hasAudio} onSoundToggle={onSoundToggle} />
      
      {/* Main Content */}
      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        padding: '0 40px'
      }}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Subheading */}
          <span style={{
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#fa6836',
            fontWeight: 600,
            marginBottom: '40px',
            display: 'block'
          }}>
            [ Start Today ]
          </span>
          
          {/* Main Heading */}
          <h6 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#f2e2c1',
            marginBottom: '40px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Let's transform your <br/>  
            interface vision into reality
          </h6>
          
          {/* Description */}
          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: '#f2e2c1',
            opacity: 0.8,
            marginBottom: '50px'
          }}>
            Ready to bring your boldest ideas to life? Contact us to<br/> 
            discuss your project.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '18px 40px',
              background: '#fa6836',
              border: 'none',
              borderRadius: '50px',
              color: '#0f1f2b',
              fontSize: '1.1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              fontFamily: 'Orbitron, monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '0 auto'
            }}
          >
            Book a Meeting
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Footer Overlay - emerges from bottom on scroll */}
      <div 
        className="footer-mask-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: '#0f1f2b',
          color: '#f2e2c1',
          fontFamily: 'Orbitron, monospace',
          zIndex: 1200, // Above CTA content
          transform: 'translateY(100%)', // Start completely below viewport
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 'clamp(1.5rem, 6vw, 2cm) clamp(1rem, 5vw, 60px) clamp(1.5rem, 5vw, 60px) clamp(1rem, 5vw, 60px)', // Responsive padding
          textAlign: 'center'
        }}
      >
        {/* Footer Content - New Layout */}
        <div className="footer-content" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          maxWidth: '1200px',
          gap: 'clamp(2rem, 6vw, 60px)'
        }}>
          {/* Left Side - Contact Form */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#f2e2c1',
              marginBottom: 'clamp(20px, 4vw, 30px)',
              textTransform: 'none'
            }}>
              Drop us a line
            </h2>
            
            {/* Email Input and Contact Button */}
            <div style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center'
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-form-input"
                style={{
                  width: 'clamp(250px, 30vw, 7.5cm)',
                  background: 'none',
                  border: '1px solid #fa6836',
                  color: '#f2e2c1',
                  padding: '8px 16px',
                  borderRadius: '30px',
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                  fontFamily: 'Orbitron, monospace'
                }}
              />
              <button 
                style={{
                  background: 'none',
                  border: '1px solid #fa6836',
                  color: '#f2e2c1',
                  padding: '8px 16px',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Orbitron, monospace',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(250, 104, 54, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
              >
                Contact
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </button>
            </div>
          </div>

          {/* Right Side - Meeting Text and Social Icons */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            marginLeft: '30px'
          }}>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#f2e2c1',
              opacity: 0.9,
              marginBottom: '30px',
              maxWidth: '500px'
            }}>
              Book a meeting or leave a request. We're ready to<br/>
              embark on this journey with you. Are you?
            </p>

            {/* Social Media Icons */}
            <div style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center'
            }}>
              <a href="#" style={{
                fontSize: '1rem',
                color: '#f2e2c1',
                textDecoration: 'none',
                padding: '10px 15px',
                transition: 'all 0.3s ease',
                fontFamily: 'Orbitron, monospace'
              }}>
                <span style={{ color: '#fa6836' }}>[</span>email<span style={{ color: '#fa6836' }}>]</span>
              </a>
              
              <a href="#" style={{
                fontSize: '1rem',
                color: '#f2e2c1',
                textDecoration: 'none',
                padding: '10px 15px',
                transition: 'all 0.3s ease',
                fontFamily: 'Orbitron, monospace'
              }}>
                <span style={{ color: '#fa6836' }}>[</span>linkedin<span style={{ color: '#fa6836' }}>]</span>
              </a>
              
              <a href="#" style={{
                fontSize: '1rem',
                color: '#f2e2c1',
                textDecoration: 'none',
                padding: '10px 15px',
                transition: 'all 0.3s ease',
                fontFamily: 'Orbitron, monospace'
              }}>
                <span style={{ color: '#fa6836' }}>[</span>instagram<span style={{ color: '#fa6836' }}>]</span>
              </a>
            </div>
          </div>
        </div>

        {/* AnLuSi Text - Huge centered text */}
        <h1 className="anlusi-heading" style={{
          fontSize: 'clamp(4rem, 15vw, 16rem)',
          fontWeight: 800,
          color: '#f2e2c1',
          textAlign: 'center',
          marginTop: 'clamp(3rem, 10vw, 120px)',
          fontFamily: 'Orbitron, monospace',
          width: '100%',
          letterSpacing: '0.1em',
          lineHeight: 1
        }}>
          AnLuSi
        </h1>

        {/* Horizontal line below AnLuSi */}
        <div style={{
          marginTop: '0.4cm',
          paddingLeft: '1cm',
          paddingRight: '1cm',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            height: '4px',
            backgroundColor: '#f2e2c1',
            width: '100%',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Copyright text */}
        <div style={{
          marginTop: '8px',
          paddingLeft: '1cm',
          width: '100%',
          textAlign: 'left'
        }}>
          <p style={{
            fontSize: '0.9rem',
            color: '#f2e2c1',
            opacity: 0.7,
            fontFamily: 'Orbitron, monospace',
            margin: 0
          }}>
            @2025.All rights reserved
          </p>
        </div>
      </div>
    </motion.div>
  )
}
