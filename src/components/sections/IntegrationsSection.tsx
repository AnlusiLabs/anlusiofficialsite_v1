import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { IntegrationsSectionProps } from '../../types'
import Navbar from '../ui/Navbar'

export default function IntegrationsSection({ onBackToHowItWorks, hasAudio, onSoundToggle }: IntegrationsSectionProps) {
  const [showText, setShowText] = useState(false)
  const [currentCard, setCurrentCard] = useState(0) // Track which card is currently visible (0 = text content, 1-4 = cards)

  useEffect(() => {
    // Show text after component mounts
    const timer = setTimeout(() => setShowText(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Scroll handler for page and card transitions
  useEffect(() => {
    let isScrolling = false

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return
      isScrolling = true

      if (e.deltaY > 0) { // Scrolling down
        setCurrentCard(prev => Math.min(5, prev + 1)) // Max 5 (past card 4 = hidden again)
      } else { // Scrolling up
        setCurrentCard(prev => {
          const newCard = Math.max(0, prev - 1)
          // If we're at the beginning (content visible) and scroll up more, go back to How It Works
          if (prev === 0 && onBackToHowItWorks) {
            onBackToHowItWorks()
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
  }, [onBackToHowItWorks])

  const cards = [
    {
      id: 1,
      title: "Integration Flexibility",
      description: "Easy API integration allows adding functionalities like payment systems (Stripe) or social media (Facebook) using Next.js"
    },
    {
      id: 2,
      title: "Data Access",
      description: "Integration with databases (MySQL) or services (Google Maps API) ensures real-time data that can be displayed with Vue.js"
    },
    {
      id: 3,
      title: "Efficiency Enhancement",
      description: "Automating processes through APIs, such as data synchronization between services (n8n) or analytics (Google Analytics), boosts productivity using Node.js"
    },
    {
      id: 4,
      title: "Extended Capabilities",
      description: "Adding new features like interactive visualizations with Three.js or animating with GSAP without the need to rewrite code thanks to integrations"
    }
  ]

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
      
      {/* Content - Bottom Center */}
      <div style={{
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        maxWidth: '800px'
      }}>
        {currentCard === 0 && (
          <>
            <motion.h6
              initial={{ opacity: 0, y: 50 }}
              animate={showText ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#fa6836',
                fontWeight: 600,
                marginBottom: '20px',
                margin: '0 0 20px 0'
              }}
            >
              [Integrations]
            </motion.h6>

            <motion.h5
              initial={{ opacity: 0, y: 50 }}
              animate={showText ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                fontSize: '2.2rem',
                fontWeight: 600,
                lineHeight: 1.3,
                color: '#f2e2c1',
                marginBottom: '24px'
              }}
              dangerouslySetInnerHTML={{
                __html: 'Harnessing extensive <br/> integration capabilities'
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={showText ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{
                fontSize: '1.1rem',
                opacity: 0.8,
                lineHeight: 1.6,
                color: '#f2e2c1',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              We integrate our code with a wide range of APIs, providing access to necessary information from other products and displaying it in the interface
            </motion.p>
          </>
        )}

        {/* Integration Cards */}
        {cards.map((card, index) => {
          const cardIndex = index + 1
          const isVisible = currentCard === cardIndex
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 50,
                scale: isVisible ? 1 : 0.9
              }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center',
                display: isVisible ? 'block' : 'none',
                background: 'rgba(242, 226, 193, 0.05)',
                border: '1px solid rgba(242, 226, 193, 0.2)',
                borderRadius: '25px',
                padding: '40px 32px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              whileHover={{
                background: 'rgba(250, 104, 54, 0.1)',
                borderColor: '#fa6836',
                scale: 1.02
              }}
            >
              <motion.h5
                style={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: '#fa6836',
                  marginBottom: '20px'
                }}
              >
                {card.title}
              </motion.h5>

              <motion.p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#f2e2c1',
                  margin: '0'
                }}
              >
                {card.description}
              </motion.p>
            </motion.div>
          )
        })}
      </div>





      {/* Background Elements */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '20%',
          width: '150px',
          height: '150px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '30%',
          width: '100px',
          height: '100px',
          border: '1px solid rgba(250, 104, 54, 0.5)',
          borderRadius: '50%'
        }} />
      </div>
    </motion.div>
  )
}
