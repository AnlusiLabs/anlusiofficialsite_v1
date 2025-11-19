import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import type { ProjectsSectionProps } from '../../types'
import Navbar from '../ui/Navbar'

export default function ProjectsSection({ onBackToHowItWorks, onNextToWhoAreWe, fromWhoAreWe, hasAudio, onSoundToggle }: ProjectsSectionProps) {
  const [showText, setShowText] = useState(false)
  const [currentProject, setCurrentProject] = useState(fromWhoAreWe ? 5 : 0) // Track which project is currently visible (0 = text content, 1-6 = projects)
  const [imageScale, setImageScale] = useState(fromWhoAreWe ? 5 : 0) // Track image scaling progress (0-5 steps)
  const [isLastProjectFadingOut, setIsLastProjectFadingOut] = useState(fromWhoAreWe || false) // Track if last project is fading out
  
  // Refs for all project images
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // Function to set refs for each project
  const setImageRef = (index: number) => (el: HTMLDivElement | null) => {
    imageRefs.current[index] = el
  }

  // Function to handle project link clicks
  const handleProjectClick = (url: string, e?: React.MouseEvent) => {
    alert(`🚨 CLICK WORKING! Opening: ${url}`)
    
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    // Show text after component mounts
    const timer = setTimeout(() => setShowText(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // GSAP animation function for scaling - now works for any project
  const animateImageScale = (scaleValue: number, projectId: number) => {
    const imageElement = imageRefs.current[projectId - 1] // Convert to 0-based index
    if (imageElement) {
      const targetScale = 1 + (scaleValue * 2) / 5 // Scale from 1x to 3x
      
      gsap.to(imageElement, {
        scale: targetScale,
        duration: 0.4,
        ease: "power2.out"
      })
    }
  }

  // Update GSAP animation when imageScale changes - now for any project
  useEffect(() => {
    if (currentProject >= 1 && currentProject <= 5) {
      animateImageScale(imageScale, currentProject)
    }
  }, [imageScale, currentProject])

  // GSAP-powered scroll handler with better throttling
  useEffect(() => {
    let lastScrollTime = 0
    const SCROLL_DELAY = 400 // Minimum time between scroll actions

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScrollTime < SCROLL_DELAY) {
        return
      }

      // Only prevent default for actual wheel scrolling
      e.preventDefault()
      e.stopPropagation()
      
      lastScrollTime = now;

      if (e.deltaY > 0) { // Scrolling down
        if (currentProject >= 1 && currentProject <= 5 && imageScale < 5) {
          setImageScale(prev => prev + 1)
        } else if (currentProject >= 1 && currentProject <= 4 && imageScale === 5) {
          setCurrentProject(prev => prev + 1)
          setImageScale(0)
        } else if (currentProject === 5 && imageScale === 5 && !isLastProjectFadingOut) {
          setIsLastProjectFadingOut(true)
        } else if (currentProject === 5 && isLastProjectFadingOut) {
          if (onNextToWhoAreWe) {
            onNextToWhoAreWe()
          }
        } else if (currentProject < 5) {
          setCurrentProject(prev => Math.min(5, prev + 1))
        }
      } else { // Scrolling up
        if (currentProject === 5 && isLastProjectFadingOut) {
          setIsLastProjectFadingOut(false)
        } else if (currentProject >= 1 && currentProject <= 5 && imageScale > 0) {
          setImageScale(prev => prev - 1)
        } else {
          setCurrentProject(prev => {
            const newProject = Math.max(0, prev - 1)
            if (prev === 0 && onBackToHowItWorks) {
              onBackToHowItWorks()
              return 0
            }
            if (newProject === 1) {
              setImageScale(5)
            }
            return newProject
          })
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentProject, imageScale, isLastProjectFadingOut, onBackToHowItWorks, onNextToWhoAreWe])

  const projects = [
    {
      id: 1,
      number: "01",
      title: "Therapeutic Services Platform",
      description: "Professional mental health platform providing compassionate therapy services with secure client management, appointment scheduling, and confidential communication tools.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "/projects/handsofsympathy.png",
      url: "https://handsofsympathy.com"
    },
    {
      id: 2,
      number: "02", 
      title: "Kane Solutions",
      description: "Comprehensive solar energy solutions platform featuring project portfolio, service offerings, and client consultation tools for renewable energy installations.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "/projects/kanesolutions.png",
      url: "https://kanesolutions.co.za"
    },
    {
      id: 3,
      number: "03",
      title: "PACT Habit Builder",
      description: "Innovative habit formation platform using micro-experiments and behavioral science to help users build lasting positive habits through small, manageable actions.",
      tech: ["React.js", "Firebase", "Django", "Ngrok"],
      image: "/projects/pact.png",
      url: "https://pactlab.co.za"
    },
    {
      id: 4,
      number: "04",
      title: "Trendy Builds",
      description: "Modern construction company website showcasing premium building services, project galleries, and client testimonials for residential and commercial construction.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "/projects/trendybuilds.png",
      url: "https://trendybuilds.co.za"
    },
    {
      id: 5,
      number: "05",
      title: "Amahle Visa Pro",
      description: "Professional visa application assistance platform connecting clients with expert consultants for streamlined immigration processes and documentation support.",
      tech: ["HTML", "CSS", "JavaScript", "Flask", "API", "PostgreSQL", "Render"],
      image: "/projects/visapro.png",
      url: "https://visaproamahle.co.za"
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
      
      {/* Content - Center */}
      <div className="projects-content" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        maxWidth: '900px',
        width: '100%',
        padding: '0 40px'
      }}>
        {/* Initial Content - Fades out when scrolling */}
        {currentProject === 0 && (
          <>
            <motion.h6
              initial={{ opacity: 0, y: 50 }}
              animate={showText ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="projects-subtitle"
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
              [Projects]
            </motion.h6>

            <motion.h6
              initial={{ opacity: 0, y: 50 }}
              animate={showText ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="projects-title"
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                fontWeight: 600,
                lineHeight: 1.3,
                color: '#f2e2c1',
                marginBottom: '24px'
              }}
            >
              Recent successes
            </motion.h6>
          </>
        )}
      </div>

      {/* Project Display Layout - Appears when scrolling starts */}
      {projects.map((project, index) => {
        const projectIndex = index + 1
        const isVisible = currentProject === projectIndex
        
        // Calculate opacity: fade out if it's the last project and it's fading
        const getOpacity = () => {
          if (projectIndex === 5 && isLastProjectFadingOut) {
            return 0.3 // Faded but still visible
          }
          return isVisible ? 1 : 0
        }
        
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: getOpacity() }}
            transition={{ duration: 0.5 }} // Slower transition for fade effect
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              display: isVisible ? 'block' : 'none',
              pointerEvents: isVisible ? 'auto' : 'none'
            }}
          >
            {/* Opening Bracket - Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '0.9rem', // Slightly larger than text
                color: '#fa6836',
                fontWeight: 500,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              (
            </motion.div>

            {/* Left Side - "Click to explore" */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                position: 'absolute',
                left: '38px', // Back to original position (1cm from edge)
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                fontSize: '0.7rem',
                color: '#f2e2c1',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textAlign: 'left',
                width: '250px',
                whiteSpace: 'nowrap'
              }}>
                Click{'\u00A0'.repeat(30)}to explore
              </div>
            </motion.div>

            {/* Center - Project Image - Show for all projects with GSAP scaling */}
            <motion.div
              ref={setImageRef(project.id - 1)} // Apply ref to all projects for GSAP scaling
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              onClick={(e) => handleProjectClick(project.url, e)}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)', // Only center positioning - GSAP handles scaling
                width: '76px', // Fixed base size - 2cm x 2.5cm
                height: '95px',
                borderRadius: '4px',
                cursor: 'pointer',
                overflow: 'hidden',
                transformOrigin: 'center center' // Ensure GSAP scales from center
              }}
              whileHover={{
                scale: 1.02
              }}
            >
              <img 
                src={project.image}
                alt={`${project.title} Project`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
            </motion.div>

            {/* Right Side - "The" text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                position: 'absolute',
                right: '220px', // "The" positioned 4.5cm to the left of "Project"
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                fontSize: '0.7rem',
                color: '#f2e2c1',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textAlign: 'right'
              }}>
                The
              </div>
            </motion.div>

            {/* Right Side - "Project" text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                position: 'absolute',
                right: '50px', // "Project" stays in original position
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                fontSize: '0.7rem',
                color: '#f2e2c1',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textAlign: 'right'
              }}>
                Project
              </div>
            </motion.div>

            {/* Closing Bracket - Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                position: 'absolute',
                right: '38px', // 1cm from right edge (same as left side)
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '0.9rem', // Match opening bracket size
                color: '#fa6836',
                fontWeight: 500,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              )
            </motion.div>

            {/* Bottom - Project Name and Technologies - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{
                position: 'fixed',
                bottom: '60px',
                left: '0',
                right: '0',
                textAlign: 'center'
              }}
            >
              {/* Project Name - Subheading */}
              <h6 
                onClick={(e) => handleProjectClick(project.url, e)}
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: '#f2e2c1',
                  marginBottom: '15px',
                  margin: '0 0 15px 0',
                  cursor: 'pointer'
                }}
              >
                {project.title}
              </h6>

              {/* Technologies - P text */}
              <p style={{
                fontSize: '0.9rem',
                color: '#f2e2c1',
                opacity: 0.8,
                margin: 0,
                letterSpacing: '1px'
              }}>
                WebGL, GSAP, Nuxt3, Storyblok
              </p>
            </motion.div>
          </motion.div>
        )
      })}

      {/* Background Elements */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: '200px',
          height: '200px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '20%',
          width: '150px',
          height: '150px',
          border: '1px solid rgba(250, 104, 54, 0.5)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '10%',
          width: '100px',
          height: '100px',
          border: '1px solid rgba(242, 226, 193, 0.4)',
          borderRadius: '50%'
        }} />
      </div>
    </motion.div>
  )
}
