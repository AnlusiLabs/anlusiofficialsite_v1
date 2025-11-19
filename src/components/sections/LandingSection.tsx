import { motion } from 'framer-motion'
import { TypewriterText } from '../animations'
import type { LandingSectionProps } from '../../types'

export default function LandingSection({ onEnterWithAudio, onEnterWithoutAudio }: LandingSectionProps) {
  const fullText = `For optimal immersion in this digital frontier,<br/>we highly recommend activating your audio<br/>receptors with headphones`
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      id="landing-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        padding: '20px',
        textAlign: 'center',
        background: '#152636',
        color: '#f2e2c1',
        fontFamily: 'Orbitron, sans-serif'
      }}
    >
      {/* Center icon + text */}
      <div 
        className="center-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        <div className="icon-wrapper">
          <i 
            className="fas fa-headphones headphones-icon"
            style={{
              fontSize: '30px',
              color: '#f2e2c1',
              marginBottom: '10px'
            }}
          />
        </div>
        <div 
          className="landing-text"
          style={{
            minHeight: '4.5em',
            visibility: 'visible',
            opacity: 1
          }}
        >
          <TypewriterText
            text={fullText}
            speed={30}
            delay={200}
            preserveHtml={true}
            className="landing-text"
            style={{
              margin: 0,
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              lineHeight: 'clamp(1.3rem, 3vw, 1.5rem)',
              textAlign: 'center'
            }}
          />
        </div>
      </div>

      {/* Buttons at bottom */}
      <div 
        className="buttons-wrapper landing-buttons"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(10px, 2vw, 15px)',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'clamp(20px, 4vw, 30px)',
          width: '100%',
          maxWidth: '400px',
          alignSelf: 'center'
        }}
      >
        <motion.button
          id="enter-audio"
          className="btn landing-button"
          onClick={() => {
            onEnterWithAudio()
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            backgroundColor: 'transparent',
            border: '2px solid #fa6835',
            borderRadius: '30px',
            cursor: 'pointer',
            color: '#f2e2c1',
            fontWeight: 'bold',
            overflow: 'visible',
            position: 'relative',
            display: 'flex',
            width: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            minHeight: '2.5em',
            boxSizing: 'border-box',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            gap: '12px',
            whiteSpace: 'nowrap'
          }}
        >
          <motion.span 
            className="btn-text"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'inline-block',
              position: 'relative'
            }}
          >
            Enter with Audio
          </motion.span>
          <motion.svg
            className="right-arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </motion.svg>
        </motion.button>
        
        <motion.a
          href="#"
          id="enter-no-audio"
          className="no-audio-link"
          onClick={(e) => {
            e.preventDefault()
            onEnterWithoutAudio()
          }}
          whileHover={{ color: '#fff' }}
          style={{
            color: '#f2e2c1',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Enter without Sound
        </motion.a>
      </div>
    </motion.main>
  )
}
