// Barba.js Page Transition System
// Smooth, cinematic page transitions using GSAP Split Screen effects

import { gsap } from 'gsap'

export class BarbaTransitions {
  private isInitialized = false

  constructor() {
    // Don't initialize Barba automatically - use manual transitions instead
  }

  // � Cinematic Zoom Transition to Intro - Theatrical & Dramatic
  public async transitionToIntro(callback?: () => void) {
    const heroContainer = document.getElementById('hero')
    const introContainer = document.getElementById('introduction')
    
    if (!heroContainer || !introContainer) return
    
    // Prepare intro - hidden and scaled down at center
    gsap.set(introContainer, { 
      display: 'block', 
      opacity: 0,
      scale: 0.3,
      filter: 'blur(10px)',
      zIndex: 2
    })
    
    // Cinematic transition timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(heroContainer, { display: 'none' })
        gsap.set(introContainer, { scale: 1, opacity: 1, filter: 'blur(0px)', zIndex: 1 })
        if (callback) callback()
      }
    })
    
    // Phase 1: Current section recedes into distance
    tl.to(heroContainer, {
      scale: 0.3,
      opacity: 0,
      filter: 'blur(15px)',
      duration: 0.8,
      ease: 'power2.inOut',
      transformOrigin: 'center center'
    })
    
    // Phase 2: New section emerges from center (starts slightly before hero finishes)
    .to(introContainer, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'back.out(1.4)',
      transformOrigin: 'center center'
    }, '-=0.4')
  }

  // � Cinematic Zoom Transition to Hero - Theatrical & Dramatic
  public async transitionToHero(callback?: () => void) {
    const heroContainer = document.getElementById('hero')
    const introContainer = document.getElementById('introduction')
    
    if (!heroContainer || !introContainer) return
    
    // Prepare hero - hidden and scaled down at center
    gsap.set(heroContainer, { 
      display: 'block', 
      opacity: 0,
      scale: 0.3,
      filter: 'blur(10px)',
      zIndex: 2
    })
    
    // Cinematic transition timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(introContainer, { display: 'none' })
        gsap.set(heroContainer, { scale: 1, opacity: 1, filter: 'blur(0px)', zIndex: 1 })
        if (callback) callback()
      }
    })
    
    // Phase 1: Current section recedes into distance
    tl.to(introContainer, {
      scale: 0.3,
      opacity: 0,
      filter: 'blur(15px)',
      duration: 0.8,
      ease: 'power2.inOut',
      transformOrigin: 'center center'
    })
    
    // Phase 2: New section emerges from center (starts slightly before intro finishes)
    .to(heroContainer, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'back.out(1.4)',
      transformOrigin: 'center center'
    }, '-=0.4')
  }

  // No additional elements needed for cinematic zoom - uses existing containers

  // Cleanup method
  public destroy() {
    if (this.isInitialized) {
      // Clean up any GSAP animations
      gsap.killTweensOf('*')
      this.isInitialized = false
    }
  }
}

// Export singleton instance
export const barbaTransitions = new BarbaTransitions()
