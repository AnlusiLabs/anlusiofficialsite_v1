import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { HowItWorksSectionProps } from '../../types'
import Navbar from '../ui/Navbar'

export default function HowItWorksSection({ onBackToResults, onShowProjects, hasAudio, onSoundToggle }: HowItWorksSectionProps) {
  const [showText, setShowText] = useState(false)
  const [videoErrors, setVideoErrors] = useState<{ [key: number]: boolean }>({})
  const [currentCard, setCurrentCard] = useState(0) // Track which card is currently visible (0 = hidden, 1-4 = cards)

  useEffect(() => {
    // Show text after component mounts
    const timer = setTimeout(() => setShowText(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Scroll handler for card transitions
  useEffect(() => {
    let isScrolling = false

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return
      isScrolling = true

      if (e.deltaY > 0) { // Scrolling down
        setCurrentCard(prev => {
          const newCard = Math.min(6, prev + 1) // Extended to 6 to track additional scrolls
          // If we're past all cards (currentCard = 5) and scroll down more, go to projects page
          if (prev === 5 && onShowProjects) {
            setTimeout(() => {
              onShowProjects()
            }, 100)
            return 6
          }
          return newCard
        })
      } else { // Scrolling up
        setCurrentCard(prev => {
          const newCard = Math.max(0, prev - 1)
          // If we're at the beginning (card 0) and scroll up more, go back to previous page
          if (prev === 0) {
            if (onBackToResults) {
              onBackToResults()
            }
            return 0
          }
          return newCard
        })
      }

      // Debounce scroll events
      setTimeout(() => {
        isScrolling = false
      }, 300)
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [onShowProjects])

  const cards = [
    {
      id: 1,
      component: "Component #1",
      title: "Modern Technologies",
      description: "Javascript, Nuxt3.js, Vue.js, Node.js (and others) ensure your projects speed, stability and scalability",
      videoSrc: "/how-it-works/1.mp4",
      imageSrc: "/how-it-works/1.jpg"
    },
    {
      id: 2,
      component: "Component #2", 
      title: "Stunning Animations",
      description: "WebGL, GSAP, Three.js (and others) create interactive and smooth animations that enhance visual appeal and engage users.",
      videoSrc: "/how-it-works/2.mp4",
      imageSrc: "/how-it-works/2.jpg"
    },
    {
      id: 3,
      component: "Component #3",
      title: "Flexible Integration", 
      description: "Integration with any API allows easy functionality expansion and product adaptation to your needs.",
      videoSrc: "/how-it-works/3.mp4",
      imageSrc: "/how-it-works/3.jpg"
    },
    {
      id: 4,
      component: "Component #4",
      title: "Clean Code",
      description: "We do quality, clean code that ensures easy maintenance and future development of your project",
      videoSrc: "/how-it-works/4.mp4", 
      imageSrc: "/how-it-works/4.jpg"
    }
  ]

  const handleVideoError = (cardId: number) => {
    setVideoErrors(prev => ({ ...prev, [cardId]: true }))
  }

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
        zIndex: 1
      }}
    >
      {/* Navbar */}
      <Navbar hasAudio={hasAudio} onSoundToggle={onSoundToggle} />
      
      {/* Main Content - Left edge, vertically centered */}
      <div className="how-it-works-content" style={{
        position: 'absolute',
        top: '50%',
        left: '40px',
        transform: 'translateY(-50%)',
        textAlign: 'left',
        maxWidth: '600px'
      }}>
        <motion.h6
          initial={{ opacity: 0, x: -50 }}
          animate={showText ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="how-it-works-subtitle"
          style={{
            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#fa6836',
            fontWeight: 600,
            marginBottom: '20px',
            margin: '0 0 20px 0'
          }}
        >
          [How it works]
        </motion.h6>

        <motion.h5
          initial={{ opacity: 0, x: -50 }}
          animate={showText ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="how-it-works-title"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 600,
            lineHeight: 1.3,
            color: '#f2e2c1',
            margin: 0
          }}
        >
          Leveraging technologies, frameworks, and libraries
        </motion.h5>
      </div>

      {/* Right side video cards */}
      <div className="how-it-works-cards" style={{
        position: 'absolute',
        right: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '500px'
      }}>
        {/* Single card display - only show current card */}
        <div style={{ position: 'relative', width: '240px', height: '320px' }}>
          {cards.map((card, index) => {
            const cardIndex = index + 1; // Cards are 1-4, currentCard is 0-5 (0 & 5 = all hidden)
            const isVisible = currentCard === cardIndex;
            const isPrevious = currentCard > cardIndex;
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : (currentCard === 5 ? 200 : (isPrevious ? -100 : 100)),
                  scale: isVisible ? 1 : 0.8,
                  zIndex: isVisible ? 10 : 1
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  background: 'rgba(242, 226, 193, 0.08)',
                  border: '1px solid rgba(242, 226, 193, 0.2)',
                  borderRadius: '16px',
                  padding: '24px',
                  backdropFilter: 'blur(15px)',
                  boxShadow: isVisible ? '0 20px 40px rgba(0, 0, 0, 0.3)' : 'none'
                }}
              >
                {/* Video/Image container */}
                <div style={{
                  width: '100%',
                  height: '150px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '15px',
                  background: 'rgba(0, 0, 0, 0.2)'
                }}>
                  {!videoErrors[card.id] ? (
                    <video
                      src={card.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={() => handleVideoError(card.id)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <img
                      src={card.imageSrc}
                      alt={card.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                </div>

                {/* Component label */}
                <div className="card-component" style={{
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                  color: '#fa6836',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '8px'
                }}>
                  {card.component}
                </div>

                {/* Title */}
                <h6 className="card-title" style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  color: '#f2e2c1',
                  fontWeight: 600,
                  marginBottom: '10px',
                  lineHeight: 1.3
                }}>
                  {card.title}
                </h6>

                {/* Description */}
                <p className="card-description" style={{
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                  color: '#f2e2c1',
                  opacity: 0.8,
                  lineHeight: 1.4,
                  margin: 0
                }}>
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              width: '24px',
              height: '24px',
              border: '2px solid #fa6836',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{
              width: '6px',
              height: '6px',
              background: '#fa6836',
              borderRadius: '50%'
            }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '25%',
          width: '192px',
          height: '192px',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '50%'
        }} />
      </div>
    </motion.div>
  );
}
