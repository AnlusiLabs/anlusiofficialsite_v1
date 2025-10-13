import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface MaskWheelHandlerOptions {
  onComplete?: () => void
  onReset?: () => void
}

export const useMaskWheelHandler = (options: MaskWheelHandlerOptions = {}) => {
  const [maskProgress, setMaskProgress] = useState(0)
  const lastScrollTime = useRef(0)
  const isActiveRef = useRef(true)

  const handleWheel = (e: WheelEvent) => {
    // Only handle if mask handler is active
    if (!isActiveRef.current) return

    const now = Date.now()
    if (now - lastScrollTime.current < 50) return // Smooth throttling
    
    lastScrollTime.current = now

    setMaskProgress(prevProgress => {
      let newProgress = prevProgress

      if (e.deltaY > 0) {
        // Scroll down - reveal footer from bottom
        newProgress = Math.min(100, prevProgress + 3) // Smaller increments for smoother animation
      } else {
        // Scroll up - hide footer
        newProgress = Math.max(0, prevProgress - 3)
      }

      // Apply GSAP animation to footer overlay
      const footerOverlay = document.querySelector('.footer-mask-overlay')
      if (footerOverlay) {
        // Calculate transform to make footer emerge from bottom of screen
        // When progress = 0: translateY = 100% → footer completely below viewport
        // When progress = 100: translateY = 0% → footer fully in viewport
        const translateY = 100 - newProgress
        
        gsap.set(footerOverlay, {
          y: `${translateY}%`
        })
        
      }

      // Call callbacks
      if (newProgress >= 100 && prevProgress < 100 && options.onComplete) {
        options.onComplete()
      }
      
      if (newProgress <= 0 && prevProgress > 0 && options.onReset) {
        options.onReset()
      }

      return newProgress
    })

    // Prevent default to avoid page scroll
    e.preventDefault()
  }

  const activateMaskHandler = () => {
    isActiveRef.current = true
  }

  const deactivateMaskHandler = () => {
    isActiveRef.current = false
  }

  useEffect(() => {
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return {
    maskProgress,
    activateMaskHandler,
    deactivateMaskHandler,
    resetMask: () => setMaskProgress(0)
  }
}
