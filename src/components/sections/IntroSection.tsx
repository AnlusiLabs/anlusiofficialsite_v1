import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../ui/Navbar';

gsap.registerPlugin(ScrollTrigger);

interface IntroSectionProps {
  onScrollToBenefits: () => void;
  isTransitioning?: boolean;
  hasAudio: boolean;
  onSoundToggle: () => void;
}

export default function IntroSection({ onScrollToBenefits, hasAudio, onSoundToggle }: IntroSectionProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const maxScroll = useRef(6); // More wheel events needed to move cards completely out

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.intro-card');
    
    // Set initial state for cards - start from bottom of screen
    gsap.set(cards, { 
      y: '120vh',
      opacity: 1
    });

    const handleWheel = (event: WheelEvent) => {
      const deltaY = event.deltaY;
      
      // If scrolling up and we're at the beginning (no scroll progress), allow going back to hero
      if (deltaY < 0 && scrollProgress.current <= 0) {
        // Don't prevent default - let it bubble up to App component
        return;
      }
      
      // Otherwise, handle intro section scrolling
      event.preventDefault();
      event.stopPropagation();
      
      if (deltaY > 0) {
        // Scrolling down - animate cards up
        scrollProgress.current = Math.min(scrollProgress.current + 0.2, maxScroll.current + 3); // Much more extra scroll needed
      } else {
        // Scrolling up - animate cards down (but not below 0)
        scrollProgress.current = Math.max(scrollProgress.current - 0.2, 0);
      }
      
      const progress = Math.min(scrollProgress.current / maxScroll.current, 1); // Cap at 1 for card animation
      const overScroll = Math.max(0, scrollProgress.current - maxScroll.current); // Extra scroll after cards exit
      
      // Animate cards based on progress - make them travel WAY above navbar
      cards.forEach((card, index) => {
        const stagger = index * 0.1;
        const cardProgress = Math.max(0, Math.min(1, (progress - stagger) / 0.8));
        
        // Cards travel from 120vh (bottom) to -300vh (way way above navbar and screen)
        const yPosition = 120 - (cardProgress * 420); // From 120vh to -300vh (completely above everything)
        gsap.to(card, { 
          y: `${yPosition}vh`,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      
      // Cards need to be COMPLETELY gone (at -300vh) before allowing transition
      const allCardsGone = progress >= 1; // All cards should be at -300vh now
      
      // Only trigger after cards are completely above navbar AND 8 more wheel scrolls
      if (allCardsGone && overScroll >= 1.6 && deltaY > 0) {
        onScrollToBenefits();
      }
    };

    // Add wheel listener to container
    containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [onScrollToBenefits]);
  
  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        minHeight: '300vh', // Increased height for scroll effect
        background: '#152636',
        color: '#f2e2c1',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Orbitron, monospace'
      }}
    >
      {/* Navbar */}
      <Navbar hasAudio={hasAudio} onSoundToggle={onSoundToggle} />
      
      {/* Main Content */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          minHeight: 'auto',
          paddingTop: '100px',
          paddingBottom: '100px',
          overflow: 'visible'
        }}
      >
        <div style={{
          maxWidth: '900px',
          width: '95%',
          textAlign: 'left',
          zIndex: 100,
          padding: '0 20px'
        }}>
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontSize: '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#fa6836',
              fontWeight: 600,
              marginBottom: '20px',
              display: 'block',
              fontFamily: 'Orbitron, monospace'
            }}
          >
            Our Approach
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              fontSize: '4rem',
              fontWeight: 800,
              marginBottom: '40px',
              lineHeight: 1.1,
              color: '#f2e2c1'
            }}
          >
            Innovative Digital Experiences
          </motion.h2>
          
          <div style={{ fontSize: '1.2rem', lineHeight: 1.7 }}>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ marginBottom: '30px', color: '#f2e2c1' }}
            >
              We craft meaningful digital experiences that connect brands with their audiences through innovative interfaces and thoughtful interactions. Our approach combines cutting-edge technology with strategic design thinking to create solutions that stand out in today's digital landscape.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{ color: '#f2e2c1' }}
            >
              By focusing on both aesthetics and functionality, we ensure every project delivers exceptional user experiences that drive engagement and achieve business objectives. Whether you're looking to revamp your digital presence or build something entirely new, our team brings the expertise needed to turn your vision into reality.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Three Cards Section */}
      <div 
        ref={cardsRef}
        className="intro-cards-section"
        style={{
          width: '100%',
          marginTop: '100px',
          padding: '200px 0', // Increased padding for scroll space
          position: 'relative',
          zIndex: 1000,
          minHeight: '150vh' // Give more scroll space
        }}
      >
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '40px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 40px'
          }}
        >
          {/* Card 1 - Design & Development */}
          <div 
            className="intro-card"
            style={{
              flex: 1,
              position: 'relative',
              zIndex: 1000,
              background: '#152636',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
            }}
          >
            <div 
              className="card-number"
              style={{
                marginBottom: '30px',
                fontSize: '2rem',
                fontWeight: 800,
                color: '#fa6836'
              }}
            >
              01
            </div>
            <h3 
              style={{
                color: '#f2e2c1',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '20px'
              }}
            >
              Design & Development
            </h3>
            <p 
              style={{
                color: '#f2e2c1',
                lineHeight: 1.6,
                fontSize: '1rem',
                opacity: 0.9
              }}
            >
              Our creative team brings your vision to life with stunning designs and robust development that works flawlessly across all devices.
            </p>
          </div>

          {/* Card 2 - Strategy & Planning */}
          <div 
            className="intro-card"
            style={{
              flex: 1,
              position: 'relative',
              zIndex: 1000,
              background: '#152636',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
            }}
          >
            <div 
              className="card-number"
              style={{
                marginBottom: '30px',
                fontSize: '2rem',
                fontWeight: 800,
                color: '#fa6836'
              }}
            >
              02
            </div>
            <h3 
              style={{
                color: '#f2e2c1',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '20px'
              }}
            >
              Strategy & Planning
            </h3>
            <p 
              style={{
                color: '#f2e2c1',
                lineHeight: 1.6,
                fontSize: '1rem',
                opacity: 0.9
              }}
            >
              We analyze your goals and audience to create data-driven strategies that deliver measurable results and sustainable growth.
            </p>
          </div>

          {/* Card 3 - Launch & Support */}
          <div 
            className="intro-card"
            style={{
              flex: 1,
              position: 'relative',
              zIndex: 1000,
              background: '#152636',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
            }}
          >
            <div 
              className="card-number"
              style={{
                marginBottom: '30px',
                fontSize: '2rem',
                fontWeight: 800,
                color: '#fa6836'
              }}
            >
              03
            </div>
            <h3 
              style={{
                color: '#f2e2c1',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '20px'
              }}
            >
              Launch & Support
            </h3>
            <p 
              style={{
                color: '#f2e2c1',
                lineHeight: 1.6,
                fontSize: '1rem',
                opacity: 0.9
              }}
            >
              We ensure smooth launches and provide ongoing support to keep your digital presence performing at its best.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
