// Main Transition Controller - Coordinates all transition systems
// Clean separation of concerns between page transitions and text reveals

import { PageTransitionManager } from './pageTransitions';
import { TextRevealManager } from './textReveal';

export class TransitionController {
  private pageTransitions: PageTransitionManager;
  private textReveal: TextRevealManager;

  constructor() {
    this.pageTransitions = new PageTransitionManager();
    this.textReveal = new TextRevealManager();
  }

  // Main method to transition from hero to intro
  public async transitionToIntro(callback?: () => void) {
    try {
      // First do the page transition
      await this.pageTransitions.transitionToIntro();
      
      // Then enable text reveal for intro section
      this.textReveal.enableTextReveal('introduction');
      
      // Call React callback to update state
      if (callback) callback();
      
    } catch (error) {
      console.error('❌ Error in transition to intro:', error);
    }
  }

  // Main method to transition from intro to hero
  public async transitionToHero(callback?: () => void) {
    try {
      // First disable text reveal
      this.textReveal.disableTextReveal();
      this.textReveal.resetSectionTextReveals('introduction');
      
      // Then do the page transition
      await this.pageTransitions.transitionToHero();
      
      // Call React callback to update state
      if (callback) callback();
      
    } catch (error) {
      console.error('❌ Error in transition to hero:', error);
    }
  }

  // Scroll listener functions - store references for proper cleanup
  private scrollHandler?: () => void;
  private wheelHandler?: (e: WheelEvent) => void;

  // Setup scroll listeners
  public setupScrollListeners() {
    // Remove existing listeners first
    this.removeScrollListeners();

    // Create bound functions for proper cleanup
    this.scrollHandler = () => {
      this.pageTransitions.checkScrollTransition();
    };

    this.wheelHandler = (e: WheelEvent) => {
      this.pageTransitions.handleWheelTransition(e);
    };

    // Add listeners
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    window.addEventListener('wheel', this.wheelHandler, { passive: true });

  }

  // Remove scroll listeners
  public removeScrollListeners() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = undefined;
    }

    if (this.wheelHandler) {
      window.removeEventListener('wheel', this.wheelHandler);
      this.wheelHandler = undefined;
    }

  }

  // Get current section
  public getCurrentSection(): 'hero' | 'intro' | null {
    return this.pageTransitions.getCurrentSection();
  }

  // Check if text reveal is active
  public isTextRevealActive(): boolean {
    return this.textReveal.isTextRevealActive();
  }


}

// Export singleton instance
export const transitionController = new TransitionController();
