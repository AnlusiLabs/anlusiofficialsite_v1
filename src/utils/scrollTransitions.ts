import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class ScrollTransitionManager {
  private isTransitioning = false;
  private currentSection: 'hero' | 'intro' = 'hero';
  private onSectionChange?: (section: 'hero' | 'intro') => void;

  constructor(onSectionChange?: (section: 'hero' | 'intro') => void) {
    this.onSectionChange = onSectionChange;
    this.init();
  }

  init() {
    this.setupScrollTriggers();
  }

  private setupScrollTriggers() {
    let lastScrollY = 0;
    const threshold = window.innerHeight * 0.4; // 40% of viewport height

    // Main scroll handler
    const handleScroll = () => {
      if (this.isTransitioning) return;

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      // Transition to intro when scrolling down past threshold
      if (currentScrollY > threshold && this.currentSection === 'hero' && delta > 0) {
        this.transitionToIntro();
      }
      // Transition to hero when scrolling up near top
      else if (currentScrollY < 100 && this.currentSection === 'intro' && delta < 0) {
        this.transitionToHero();
      }

      lastScrollY = currentScrollY;
    };

    // Wheel event handler for better responsiveness
    let wheelBuffer = 0;
    const wheelThreshold = 3;

    const handleWheel = (e: WheelEvent) => {
      if (this.isTransitioning) return;

      // Accumulate wheel events
      if (e.deltaY > 0) {
        wheelBuffer = Math.min(wheelBuffer + 1, wheelThreshold);
      } else if (e.deltaY < 0) {
        wheelBuffer = Math.max(wheelBuffer - 1, -wheelThreshold);
      }

      if (Math.abs(wheelBuffer) < wheelThreshold) return;

      // Wheel down in hero section
      if (wheelBuffer > 0 && this.currentSection === 'hero') {
        this.transitionToIntro();
        wheelBuffer = 0;
      }
      // Wheel up in intro section when near top
      else if (wheelBuffer < 0 && this.currentSection === 'intro' && window.scrollY < 100) {
        this.transitionToHero();
        wheelBuffer = 0;
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    // Store cleanup function
    this.cleanup = () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }

  private transitionToIntro() {
    if (this.isTransitioning || this.currentSection === 'intro') return;

    this.isTransitioning = true;
    this.currentSection = 'intro';


    // Add transition classes for CSS animations
    document.body.classList.add('is-changing', 'is-transition-active');

    // Use view transition API if available
    if ('startViewTransition' in document) {
      const transition = (document as any).startViewTransition(() => {
        this.onSectionChange?.('intro');
      });

      transition.finished.then(() => {
        this.isTransitioning = false;
        document.body?.classList.remove('is-changing', 'is-transition-active');
      }).catch(() => {
        this.isTransitioning = false;
        document.body?.classList.remove('is-changing', 'is-transition-active');
      });
    } else {
      // Simple fallback without GSAP body animations
      setTimeout(() => {
        this.onSectionChange?.('intro');
        this.isTransitioning = false;
        document.body?.classList.remove('is-changing', 'is-transition-active');
      }, 500);
    }
  }

  private transitionToHero() {
    if (this.isTransitioning || this.currentSection === 'hero') return;

    this.isTransitioning = true;
    this.currentSection = 'hero';


    // Add transition classes for CSS animations
    document.body?.classList.add('is-changing', 'is-transition-active');

    // Use view transition API if available
    if ('startViewTransition' in document) {
      const transition = (document as any).startViewTransition(() => {
        this.onSectionChange?.('hero');
      });

      transition.finished.then(() => {
        this.isTransitioning = false;
        document.body?.classList.remove('is-changing', 'is-transition-active');
      }).catch(() => {
        this.isTransitioning = false;
        document.body?.classList.remove('is-changing', 'is-transition-active');
      });
    } else {
      // Simple fallback without GSAP body animations
      setTimeout(() => {
        this.onSectionChange?.('hero');
        this.isTransitioning = false;
        document.body?.classList.remove('is-changing', 'is-transition-active');
      }, 500);
    }
  }

  // Public methods for manual control
  public setCurrentSection(section: 'hero' | 'intro') {
    this.currentSection = section;
  }

  public getCurrentSection() {
    return this.currentSection;
  }

  // Cleanup method
  public cleanup: () => void = () => {};

  // Force transitions (for button clicks, etc.)
  public forceTransitionToIntro() {
    this.transitionToIntro();
  }

  public forceTransitionToHero() {
    this.transitionToHero();
  }
}
