// Smooth Page Transition System
// Custom implementation for silky smooth page transitions using GSAP

import { gsap } from 'gsap'

export class SmoothTransitions {
  private isTransitioning = false
  private onSectionChangeCallback?: (section: 'hero' | 'intro') => void

  constructor() {
  }

  // Set callback for when section changes
  public onSectionChange(callback: (section: 'hero' | 'intro') => void) {
    this.onSectionChangeCallback = callback
  }

  // Smooth transition to intro with liquid curtain effect
  public async transitionToIntro(): Promise<void> {
    if (this.isTransitioning) return
    
    const heroSection = document.getElementById('hero')
    const introSection = document.getElementById('introduction')
    
    if (!heroSection || !introSection) {
      console.error('❌ Required sections not found')
      return
    }

    this.isTransitioning = true
    
    // Add transitioning class for CSS optimizations
    document.body.classList.add('smooth-transitioning')

    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          this.isTransitioning = false
          document.body.classList.remove('smooth-transitioning')
          this.onSectionChangeCallback?.('intro')
          resolve()
        }
      })

      // Liquid curtain effect - hero slides out elegantly
      tl.to(heroSection, {
        y: '-100%',
        rotationX: -10,
        scale: 0.95,
        opacity: 0.8,
        duration: 1.2,
        ease: 'power3.inOut',
        transformOrigin: 'center bottom'
      })
      // Hide hero and prepare intro
      .set(heroSection, { display: 'none' })
      .set(introSection, { 
        display: 'block', 
        y: '100%', 
        rotationX: 10,
        scale: 0.95,
        opacity: 0.8,
        transformOrigin: 'center top'
      })
      // Intro slides in smoothly
      .to(introSection, {
        y: '0%',
        rotationX: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      })
    })
  }

  // Smooth transition to hero with liquid curtain effect
  public async transitionToHero(): Promise<void> {
    if (this.isTransitioning) return
    
    const heroSection = document.getElementById('hero')
    const introSection = document.getElementById('introduction')
    
    if (!heroSection || !introSection) {
      console.error('❌ Required sections not found')
      return
    }

    this.isTransitioning = true
    
    // Add transitioning class for CSS optimizations
    document.body.classList.add('smooth-transitioning')

    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          this.isTransitioning = false
          document.body.classList.remove('smooth-transitioning')
          this.onSectionChangeCallback?.('hero')
          resolve()
        }
      })

      // Liquid curtain effect - intro slides out elegantly
      tl.to(introSection, {
        y: '100%',
        rotationX: 10,
        scale: 0.95,
        opacity: 0.8,
        duration: 1.2,
        ease: 'power3.inOut',
        transformOrigin: 'center top'
      })
      // Hide intro and prepare hero
      .set(introSection, { display: 'none' })
      .set(heroSection, { 
        display: 'block', 
        y: '-100%', 
        rotationX: -10,
        scale: 0.95,
        opacity: 0.8,
        transformOrigin: 'center bottom'
      })
      // Hero slides in smoothly
      .to(heroSection, {
        y: '0%',
        rotationX: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      })
    })
  }

  // Check if currently transitioning
  public get isCurrentlyTransitioning(): boolean {
    return this.isTransitioning
  }

  // Get current visible section
  public getCurrentSection(): 'hero' | 'intro' | null {
    const heroSection = document.getElementById('hero')
    const introSection = document.getElementById('introduction')
    
    if (heroSection && heroSection.style.display !== 'none') return 'hero'
    if (introSection && introSection.style.display !== 'none') return 'intro'
    
    return null
  }

  // Destroy and cleanup
  public destroy() {
    this.isTransitioning = false
    document.body.classList.remove('smooth-transitioning')
  }
}

// Export singleton instance
export const smoothTransitions = new SmoothTransitions()
