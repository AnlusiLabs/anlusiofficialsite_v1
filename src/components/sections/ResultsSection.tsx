import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ResultsSectionProps } from '../../types'
import Navbar from '../ui/Navbar'

export default function ResultsSection({ onBackToInterface, onNextToHowItWorks, hasAudio, onSoundToggle }: ResultsSectionProps) {
  const [showText, setShowText] = useState(false)
  const [menuVisible, setMenuVisible] = useState([false, false, false, false])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Show text after component mounts
    const timer = setTimeout(() => setShowText(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let downTimeout: any

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      if (e.deltaY > 0) {
        // Scrolling down - use debouncing and animation check
        if (isAnimating) return
        
        clearTimeout(downTimeout)
        downTimeout = setTimeout(() => {
          
          // Check if we're already at max index (all items hidden) before incrementing
          if (currentIndex === 7) {
            // Already at max, transition to How It Works
            setTimeout(() => onNextToHowItWorks(), 200)
          } else {
            // Still incrementing through menu states
            setCurrentIndex(prev => {
              const newIndex = Math.min(prev + 1, 7)
              

              
              return newIndex
            })
          }
        }, 100)
        
      } else {
        // Scrolling up - handle immediately, no debouncing, no animation check
        
        // Update menu items (reverse through them)
        setCurrentIndex(currIdx => {
          const newIndex = Math.max(currIdx - 1, -1)
          
          // If we've scrolled back to beginning, go back to interface
          if (newIndex === -1) {
            setTimeout(() => onBackToInterface(), 200)
          }
          
          return newIndex
        })
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(downTimeout)
    }
  }, [isAnimating, onBackToInterface, onNextToHowItWorks, currentIndex])

  // Update menu visibility based on current index - appear from bottom up, disappear from first to last
  useEffect(() => {
    setIsAnimating(true)
    
    const newMenuVisible = [false, false, false, false]
    
    // Show items progressively when scrolling down (index 0-3) - they appear from bottom going up
    if (currentIndex >= 0) newMenuVisible[0] = true
    if (currentIndex >= 1) newMenuVisible[1] = true
    if (currentIndex >= 2) newMenuVisible[2] = true
    if (currentIndex >= 3) newMenuVisible[3] = true
    
    // When continuing to scroll down, hide items from first to last (S-001 → S-002 → S-003 → S-004)
    if (currentIndex >= 4) newMenuVisible[0] = false // Hide S-001 first
    if (currentIndex >= 5) newMenuVisible[1] = false // Hide S-002 next
    if (currentIndex >= 6) newMenuVisible[2] = false // Hide S-003 next  
    if (currentIndex >= 7) newMenuVisible[3] = false // Hide S-004 last
    
    setMenuVisible(newMenuVisible)
    
    // Reset animation flag after transition
    const timer = setTimeout(() => setIsAnimating(false), 400)
    return () => clearTimeout(timer)
  }, [currentIndex])

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
      
      {/* Top Left Content - Under Navbar */}
      <div className="results-content" style={{
        position: 'absolute',
        top: '120px', // Just under navbar
        left: '40px',
        maxWidth: '600px'
      }}>
        <motion.h6
          initial={{ opacity: 0, x: -50 }}
          animate={showText ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="results-title"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
            fontWeight: 600,
            color: '#f2e2c1',
            margin: '0 0 20px 0',
            lineHeight: 1.3
          }}
        >
          The results of quality <br/>
          interfaces are impressive
        </motion.h6>
        
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={showText ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="results-description"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            lineHeight: 1.5,
            color: '#f2e2c1',
            opacity: 0.9,
            margin: 0
          }}
        >
          Here are just a few benefits you'll<br/>
          gain by working with us
        </motion.p>
      </div>

      {/* Interactive Menu Section - positioned 3.5cm from bottom right corner */}
      <div className="results-menu" style={{
        position: 'absolute',
        bottom: '3.5cm',
        right: '3.5cm',
        width: 'auto',
        minWidth: '400px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '100%',
          alignItems: 'flex-start'
        }}>
          {/* Menu Item S-001 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ 
              opacity: menuVisible[0] ? 1 : 0, 
              scale: menuVisible[0] ? 1 : 0.9,
              y: menuVisible[0] ? 0 : (currentIndex >= 4 ? -40 : 60) // Appear from bottom, disappear upward
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              width: 'auto',
              minWidth: '500px',
              height: '60px',
              background: menuVisible[0] ? 'rgba(242, 226, 193, 0.05)' : 'transparent',
              border: menuVisible[0] ? '1px solid rgba(242, 226, 193, 0.2)' : '1px solid transparent',
              borderRadius: '25px',
              padding: '15px 25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              visibility: menuVisible[0] ? 'visible' : 'hidden',
              display: 'flex',
              alignItems: 'center'
            }}
            whileHover={{
              background: 'rgba(250, 104, 54, 0.1)',
              borderColor: '#fa6836',
              scale: 1.02
            }}
          >
            <div style={{
              color: '#fa6836',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '1px',
              minWidth: '60px'
            }}>
              S-001
            </div>
            <div style={{
              width: '6.5cm'
            }}></div>
            <div style={{
              color: '#f2e2c1',
              fontSize: '1rem',
              lineHeight: 1.3
            }}>
              Enhanced User Engagement
            </div>
          </motion.div>

          {/* Menu Item S-002 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ 
              opacity: menuVisible[1] ? 1 : 0, 
              scale: menuVisible[1] ? 1 : 0.9,
              y: menuVisible[1] ? 0 : (currentIndex >= 5 ? -40 : 60) // Appear from bottom, disappear upward
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              width: 'auto',
              minWidth: '500px',
              height: '60px',
              background: menuVisible[1] ? 'rgba(242, 226, 193, 0.05)' : 'transparent',
              border: menuVisible[1] ? '1px solid rgba(242, 226, 193, 0.2)' : '1px solid transparent',
              borderRadius: '25px',
              padding: '15px 25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              visibility: menuVisible[1] ? 'visible' : 'hidden',
              display: 'flex',
              alignItems: 'center'
            }}
            whileHover={{
              background: 'rgba(250, 104, 54, 0.1)',
              borderColor: '#fa6836',
              scale: 1.02
            }}
          >
            <div style={{
              color: '#fa6836',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '1px',
              minWidth: '60px'
            }}>
              S-002
            </div>
            <div style={{
              width: '6.5cm'
            }}></div>
            <div style={{
              color: '#f2e2c1',
              fontSize: '1rem',
              lineHeight: 1.3
            }}>
              Improved Conversion Rates
            </div>
          </motion.div>

          {/* Menu Item S-003 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ 
              opacity: menuVisible[2] ? 1 : 0, 
              scale: menuVisible[2] ? 1 : 0.9,
              y: menuVisible[2] ? 0 : (currentIndex >= 6 ? -40 : 60) // Appear from bottom, disappear upward
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              width: 'auto',
              minWidth: '500px',
              height: '60px',
              background: menuVisible[2] ? 'rgba(242, 226, 193, 0.05)' : 'transparent',
              border: menuVisible[2] ? '1px solid rgba(242, 226, 193, 0.2)' : '1px solid transparent',
              borderRadius: '25px',
              padding: '15px 25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              visibility: menuVisible[2] ? 'visible' : 'hidden',
              display: 'flex',
              alignItems: 'center'
            }}
            whileHover={{
              background: 'rgba(250, 104, 54, 0.1)',
              borderColor: '#fa6836',
              scale: 1.02
            }}
          >
            <div style={{
              color: '#fa6836',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '1px',
              minWidth: '60px'
            }}>
              S-003
            </div>
            <div style={{
              width: '6.5cm'
            }}></div>
            <div style={{
              color: '#f2e2c1',
              fontSize: '1rem',
              lineHeight: 1.3
            }}>
              Streamlined User Experience
            </div>
          </motion.div>

          {/* Menu Item S-004 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ 
              opacity: menuVisible[3] ? 1 : 0, 
              scale: menuVisible[3] ? 1 : 0.9,
              y: menuVisible[3] ? 0 : (currentIndex >= 7 ? -40 : 60) // Appear from bottom, disappear upward
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              width: 'auto',
              minWidth: '500px',
              height: '60px',
              background: menuVisible[3] ? 'rgba(242, 226, 193, 0.05)' : 'transparent',
              border: menuVisible[3] ? '1px solid rgba(242, 226, 193, 0.2)' : '1px solid transparent',
              borderRadius: '25px',
              padding: '15px 25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              visibility: menuVisible[3] ? 'visible' : 'hidden',
              display: 'flex',
              alignItems: 'center'
            }}
            whileHover={{
              background: 'rgba(250, 104, 54, 0.1)',
              borderColor: '#fa6836',
              scale: 1.02
            }}
          >
            <div style={{
              color: '#fa6836',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '1px',
              minWidth: '60px'
            }}>
              S-004
            </div>
            <div style={{
              width: '6.5cm'
            }}></div>
            <div style={{
              color: '#f2e2c1',
              fontSize: '1rem',
              lineHeight: 1.3
            }}>
              Measurable Business Impact
            </div>
          </motion.div>
        </div>
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
