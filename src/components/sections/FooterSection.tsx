import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { FooterSectionProps } from '../../types'
import Navbar from '../ui/Navbar'

export default function FooterSection({ hasAudio, onSoundToggle, onBackToCTA }: FooterSectionProps) {
  // Add scroll handler to go back to CTA on scroll up
  useEffect(() => {
    if (!onBackToCTA) return

    let lastScrollTime = 0
    const SCROLL_DELAY = 1000 // Prevent accidental triggers

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScrollTime < SCROLL_DELAY) return
      lastScrollTime = now

      // Only respond to scroll up to go back to CTA with mask transition
      if (e.deltaY < 0) {
        onBackToCTA()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [onBackToCTA])

  return (
    <motion.div
      className="footer-content"
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
        zIndex: 1000
      }}
    >
      <Navbar hasAudio={hasAudio} onSoundToggle={onSoundToggle} />
      
      {/* Footer Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '0 60px',
        textAlign: 'center'
      }}>
        
        {/* Main Footer Content */}
        <div
          style={{
            marginBottom: '80px'
          }}
        >
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

        {/* Footer Links/Info */}
        <div
          style={{
            display: 'flex',
            gap: '60px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
        >
          {/* Contact Info */}
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

          {/* Social Links */}
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
                textDecoration: 'none',
                transition: 'opacity 0.3s ease'
              }}>
                LinkedIn
              </a>
              <a href="#" style={{
                fontSize: '0.9rem',
                color: '#f2e2c1',
                opacity: 0.8,
                textDecoration: 'none',
                transition: 'opacity 0.3s ease'
              }}>
                GitHub
              </a>
              <a href="#" style={{
                fontSize: '0.9rem',
                color: '#f2e2c1',
                opacity: 0.8,
                textDecoration: 'none',
                transition: 'opacity 0.3s ease'
              }}>
                Twitter
              </a>
            </div>
          </div>

          {/* Copyright */}
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
    </motion.div>
  )
}
