import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { SectionProps } from '../../types'
import Navbar from '../ui/Navbar'

interface WhoAreWeSectionProps extends SectionProps {
  onBackToProjects?: () => void
  onNextToCTA?: () => void
  hasAudio: boolean
  onSoundToggle: () => void
}

export default function WhoAreWeSection({ onBackToProjects, onNextToCTA, hasAudio, onSoundToggle }: WhoAreWeSectionProps) {
  const lastScrollTime = useRef(0)

  // Handle scroll events for navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScrollTime.current < 1000) return
      
      lastScrollTime.current = now
      
      if (e.deltaY < 0 && onBackToProjects) {
        // Scroll up - go back to projects with cinematic transition
        onBackToProjects()
      } else if (e.deltaY > 0 && onNextToCTA) {
        // Scroll down - go to CTA with cinematic transition
        onNextToCTA()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [onBackToProjects, onNextToCTA])

  return (
    <motion.div
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
      
      {/* Main Content Container */}
      <div className="who-are-we-content" style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        padding: '0 60px',
        alignItems: 'center',
        gap: '80px'
      }}>
        
        {/* Left Side Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            flex: 1,
            textAlign: 'left',
            paddingTop: '80px'
          }}
        >
          {/* Subheading */}
          <span className="who-are-we-subtitle" style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#fa6836',
            fontWeight: 600,
            marginBottom: '40px',
            display: 'block'
          }}>
            [ who are we? ]
          </span>
          
          {/* Main Heading */}
          <h6 className="who-are-we-title" style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#f2e2c1',
            marginBottom: '40px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            we want to make your <br />
            business easier
          </h6>
          
          {/* Main Description */}
          <p className="who-are-we-text" style={{
            fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
            lineHeight: 1.6,
            color: '#f2e2c1',
            opacity: 0.9,
            marginBottom: '30px'
          }}>
            we have over 5 years of experience crafting technically and visually <br/>
            appealing websites and digital products. Our experience includes building <br/>
            websites, e-commerce sites, smart contract interactions on blockchain,<br/>
            promo landing pages, and digital products.
          </p>
          
          {/* Secondary Description */}
          <p style={{
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: '#f2e2c1',
            opacity: 0.8
          }}>
            We blend visual appeal, user-centered marketing, and customer-focused <br/> 
            service. Our goal is to infuse people's lives with visual and functional <br/> 
            aesthetics.
          </p>
        </motion.div>

        {/* Right Side Content */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            flex: 1,
            textAlign: 'left',
            paddingLeft: '40px'
          }}
        >
          {/* Vision Section */}
          <div style={{ marginBottom: '60px' }}>
            <h6 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#fa6836',
              marginBottom: '25px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              VISION
            </h6>
            
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: '#f2e2c1',
              opacity: 0.9
            }}>
              We combine aesthetics, functionality, and innovation to provide the <br/> 
              best user experience, leaving your site or product's visitors saying <br/> 
              WOW!
            </p>
          </div>

          {/* Values Section */}
          <div>
            <h6 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#fa6836',
              marginBottom: '25px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              VALUES
            </h6>
            
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: '#f2e2c1',
              opacity: 0.9
            }}>
              OUR VALUES ARE aesthetics in every detail and customer orientation. <br/> 
              we strive for perfection in design and functionality, giving maximum <br/> 
              attention to our clients' needs and wishes.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
