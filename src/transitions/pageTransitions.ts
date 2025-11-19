// Page Transition System - Clean and Reusable
// Handles View Transitions API for page-to-page transitions

export class PageTransitionManager {
  private isTransitioning = false;
  private wheelBuffer = 0;
  private readonly wheelThreshold = 3;

  constructor() {
    this.setupViewTransitionsPolyfill();
  }

  private setupViewTransitionsPolyfill() {
    if (!(document as any).startViewTransition) {
      (window as any).document.startViewTransition = (callback: () => void) => {
        const transition = {
          ready: Promise.resolve(),
          finished: Promise.resolve(),
        };
        callback();
        return transition;
      };
    } else {
    }
  }

  // Transition from hero to intro with curtain effect
  public transitionToIntro(): Promise<void> {
    return new Promise((resolve, reject) => {
      const heroSection = document.getElementById('hero');
      const introSection = document.getElementById('introduction');
      
      if (!heroSection || !introSection) {
        console.error("Required sections not found!");
        reject(new Error("Sections not found"));
        return;
      }

      if (heroSection.classList.contains('hidden')) {
        resolve();
        return;
      }

      
      // Add transition classes
      document.body.classList.add('is-changing');
      document.body.classList.add('is-transition-active');
      
      // Set view-transition names
      heroSection.style.viewTransitionName = 'hero-section';
      introSection.style.viewTransitionName = 'intro-section';
      
      setTimeout(() => {
        try {
          const transition = (document as any).startViewTransition(() => {
            // Make DOM changes
            heroSection.classList.add('hidden');
            heroSection.style.display = 'none';
            introSection.classList.remove('hidden');
            introSection.style.display = 'block';
            
          });
          
          transition.finished.then(() => {
            document.body.classList.remove('is-changing');
            setTimeout(() => {
              document.body.classList.remove('is-transition-active');
            }, 300);
            resolve();
          }).catch((e: any) => {
            console.error("❌ Transition error:", e);
            document.body.classList.remove('is-changing', 'is-transition-active');
            reject(e);
          });
        } catch (err) {
          console.error("❌ Failed to start transition:", err);
          // Fallback
          heroSection.classList.add('hidden');
          heroSection.style.display = 'none';
          introSection.classList.remove('hidden');
          introSection.style.display = 'block';
          
          document.body.classList.remove('is-changing', 'is-transition-active');
          resolve();
        }
      }, 50);
    });
  }

  // Transition from intro to hero
  public transitionToHero(): Promise<void> {
    return new Promise((resolve, reject) => {
      const heroSection = document.getElementById('hero');
      const introSection = document.getElementById('introduction');
      
      if (!heroSection || !introSection) {
        console.error("Required sections not found!");
        reject(new Error("Sections not found"));
        return;
      }

      if (introSection.classList.contains('hidden')) {
        resolve();
        return;
      }

      
      // Add transition classes
      document.body.classList.add('is-changing');
      document.body.classList.add('is-transition-active');
      
      // Set view-transition names
      heroSection.style.viewTransitionName = 'hero-section';
      introSection.style.viewTransitionName = 'intro-section';
      
      setTimeout(() => {
        try {
          const transition = (document as any).startViewTransition(() => {
            // Make DOM changes
            introSection.classList.add('hidden');
            introSection.style.display = 'none';
            heroSection.classList.remove('hidden');
            heroSection.style.display = 'block';
            
          });
          
          transition.finished.then(() => {
            document.body.classList.remove('is-changing');
            setTimeout(() => {
              document.body.classList.remove('is-transition-active');
            }, 300);
            resolve();
          }).catch((e: any) => {
            console.error("❌ Transition error:", e);
            document.body.classList.remove('is-changing', 'is-transition-active');
            reject(e);
          });
        } catch (err) {
          console.error("❌ Failed to start transition:", err);
          // Fallback
          introSection.classList.add('hidden');
          introSection.style.display = 'none';
          heroSection.classList.remove('hidden');
          heroSection.style.display = 'block';
          
          document.body.classList.remove('is-changing', 'is-transition-active');
          resolve();
        }
      }, 50);
    });
  }

  // Check scroll position and trigger transitions if needed
  public checkScrollTransition() {
    if (this.isTransitioning) return;
    
    const heroSection = document.getElementById('hero');
    const introSection = document.getElementById('introduction');
    
    if (!heroSection || !introSection) return;
    
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.4;
    
    
    // Only trigger transitions when NOT in text reveal mode
    const isTextRevealActive = document.body.classList.contains('text-reveal-active');
    if (isTextRevealActive && currentScrollY > 50) {
      // Let text reveal handle scrolling when active
      return;
    }
    
    if (currentScrollY > threshold && !heroSection.classList.contains('hidden')) {
      this.isTransitioning = true;
      this.transitionToIntro().finally(() => {
        setTimeout(() => { this.isTransitioning = false; }, 2000);
      });
    } else if (currentScrollY < 100 && !introSection.classList.contains('hidden')) {
      this.isTransitioning = true;
      this.transitionToHero().finally(() => {
        setTimeout(() => { this.isTransitioning = false; }, 2000);
      });
    }
  }

  // Handle wheel events for transition triggering
  public handleWheelTransition(e: WheelEvent) {
    const heroSection = document.getElementById('hero');
    const introSection = document.getElementById('introduction');
    
    if (!heroSection || !introSection) return;
    
    // Don't interfere with text reveal scrolling
    const isTextRevealActive = document.body.classList.contains('text-reveal-active');
    if (isTextRevealActive && window.scrollY > 50) {
      return;
    }
    
    // Accumulate wheel events
    if (e.deltaY > 0) {
      this.wheelBuffer = Math.min(this.wheelBuffer + 1, this.wheelThreshold);
    } else if (e.deltaY < 0) {
      this.wheelBuffer = Math.max(this.wheelBuffer - 1, -this.wheelThreshold);
    }
    
    if (Math.abs(this.wheelBuffer) < this.wheelThreshold) return;
    
    if (this.wheelBuffer > 0 && !heroSection.classList.contains('hidden')) {
      if (!this.isTransitioning) {
        this.isTransitioning = true;
        this.transitionToIntro().finally(() => {
          setTimeout(() => { this.isTransitioning = false; }, 2000);
        });
        this.wheelBuffer = 0;
      }
    } else if (this.wheelBuffer < 0 && !introSection.classList.contains('hidden') && window.scrollY < 100) {
      if (!this.isTransitioning) {
        this.isTransitioning = true;
        this.transitionToHero().finally(() => {
          setTimeout(() => { this.isTransitioning = false; }, 2000);
        });
        this.wheelBuffer = 0;
      }
    }
  }

  // Get current active section
  public getCurrentSection(): 'hero' | 'intro' | null {
    const heroSection = document.getElementById('hero');
    const introSection = document.getElementById('introduction');
    
    if (heroSection && !heroSection.classList.contains('hidden')) return 'hero';
    if (introSection && !introSection.classList.contains('hidden')) return 'intro';
    
    return null;
  }
}
