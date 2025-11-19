// Text Reveal System - Clean and Reusable
// Handles GSAP-based text reveals independently of page transitions

export class TextRevealManager {
  private isActive = false;

  // Enable text reveal system for a section
  public enableTextReveal(sectionId: string) {
    if (this.isActive) return;
    
    this.isActive = true;
    document.body.classList.add('text-reveal-active');
    
    // Trigger any section-specific text reveals
    this.triggerSectionTextReveals(sectionId);
  }

  // Disable text reveal system
  public disableTextReveal() {
    if (!this.isActive) return;
    
    this.isActive = false;
    document.body.classList.remove('text-reveal-active');
  }

  // Check if text reveal is currently active
  public isTextRevealActive(): boolean {
    return this.isActive;
  }

  // Trigger text reveals for a specific section
  private triggerSectionTextReveals(sectionId: string) {
    switch (sectionId) {
      case 'introduction':
        this.setupIntroTextReveals();
        break;
      default:
    }
  }

  // Setup intro section text reveals
  private setupIntroTextReveals() {
    
    // Let the IntroSection component handle its own GSAP reveals
    // We just signal that text reveal is active
    const introSection = document.getElementById('introduction');
    if (introSection) {
      // Dispatch a custom event to trigger text reveals
      const event = new CustomEvent('textRevealEnabled');
      introSection.dispatchEvent(event);
    }
  }

  // Reset text reveals for a section (for when going back)
  public resetSectionTextReveals(sectionId: string) {
    
    switch (sectionId) {
      case 'introduction':
        this.resetIntroTextReveals();
        break;
    }
  }

  private resetIntroTextReveals() {
    // Reset intro text elements to initial state
    const introSection = document.getElementById('introduction');
    if (introSection) {
      const wordRevealItems = introSection.querySelectorAll('.word-reveal-item');
      wordRevealItems.forEach((item: any) => {
        item.style.opacity = '0.35';
        item.style.filter = 'blur(1px)';
      });
      
      const cards = introSection.querySelectorAll('.intro-card');
      cards.forEach((card: any) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(100px)';
      });
    }
  }
}
