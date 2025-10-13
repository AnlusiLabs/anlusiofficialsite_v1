import { gsap } from 'gsap';

/**
 * Grid-based Page Transition System
 * 
 * Creates a grid overlay with 12 columns x 8 rows (96 cells total)
 * Each cell covers the full viewport with no gaps
 * Animates with GSAP using random stagger pattern
 * Provides smooth transitions between pages
 */

export class GridTransitions {
  private gridContainer: HTMLElement | null = null;

  constructor() {
  }

  /**
   * Load and create the grid overlay
   * Sets up 12x8 grid covering 100vh with no gaps
   */
  private loadGrid(): HTMLElement {
    
    // Remove existing grid if present
    const existingGrid = document.getElementById('grid-transition');
    if (existingGrid) {
      existingGrid.remove();
    }

    // Create grid container
    this.gridContainer = document.createElement('div');
    this.gridContainer.id = 'grid-transition';
    this.gridContainer.className = 'grid-transition-overlay';
    
    // Apply CSS grid styling
    this.gridContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(8, 1fr);
      gap: 0;
      z-index: 9999;
      pointer-events: none;
    `;

    // Create 96 grid cells (12 columns x 8 rows)
    const totalCells = 12 * 8; // 96 cells
    
    for (let i = 0; i < totalCells; i++) {
      const gridItem = document.createElement('div');
      gridItem.className = 'load-grid-item';
      gridItem.style.cssText = `
        background-color: #000;
        opacity: 0;
        width: 100%;
        height: 100%;
      `;
      
      this.gridContainer.appendChild(gridItem);
    }

    // Append to body
    document.body.appendChild(this.gridContainer);
    
    return this.gridContainer;
  }

  /**
   * Animate grid cells IN (covering the page)
   * Uses GSAP fromTo with random stagger pattern
   */
  private animateGridIn(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.gridContainer) {
        console.error('❌ Grid container not found');
        resolve();
        return;
      }

      const loadGridItems = this.gridContainer.querySelectorAll('.load-grid-item');

      // GSAP animation: opacity 0 → 1 with random stagger
      gsap.fromTo(loadGridItems, 
        { 
          opacity: 0 
        },
        {
          opacity: 1,
          duration: 0.001, // Very fast individual animation
          stagger: {
            amount: 0.5, // Total stagger time: 0.5 seconds
            from: "random" // Random order for dynamic effect
          },
          ease: "none",
          onComplete: () => {
            resolve();
          }
        }
      );
    });
  }

  /**
   * Animate grid cells OUT (revealing the new page)
   * Uses GSAP fromTo with random stagger pattern
   */
  private animateGridOut(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.gridContainer) {
        console.error('❌ Grid container not found');
        resolve();
        return;
      }

      const loadGridItems = this.gridContainer.querySelectorAll('.load-grid-item');

      // GSAP animation: opacity 1 → 0 with random stagger
      gsap.fromTo(loadGridItems,
        {
          opacity: 1
        },
        {
          opacity: 0,
          duration: 0.001, // Very fast individual animation
          stagger: {
            amount: 0.5, // Total stagger time: 0.5 seconds
            from: "random" // Random order for dynamic effect
          },
          ease: "none",
          onComplete: () => {
            // Clean up grid after animation
            if (this.gridContainer) {
              this.gridContainer.remove();
              this.gridContainer = null;
            }
            resolve();
          }
        }
      );
    });
  }

  /**
   * Execute full grid transition between pages
   * @param callback Function to execute during transition (page change)
   */
  public async executeGridTransition(callback?: () => void): Promise<void> {
    
    try {
      // Phase 1: Load grid and animate IN
      this.loadGrid();
      await this.animateGridIn();
      
      // Phase 2: Execute callback (change page content)
      if (callback) {
        callback();
      }
      
      // Small delay to ensure page content is ready
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Phase 3: Animate grid OUT
      await this.animateGridOut();
      
      
    } catch (error) {
      console.error('❌ Grid transition error:', error);
      // Clean up on error
      if (this.gridContainer) {
        this.gridContainer.remove();
        this.gridContainer = null;
      }
    }
  }

  /**
   * Transition to intro section with grid effect
   */
  public async transitionToIntro(callback?: () => void): Promise<void> {
    await this.executeGridTransition(callback);
  }

  /**
   * Transition to hero section with grid effect
   */
  public async transitionToHero(callback?: () => void): Promise<void> {
    await this.executeGridTransition(callback);
  }

  /**
   * Clean up grid transition system
   */
  public destroy(): void {
    if (this.gridContainer) {
      this.gridContainer.remove();
      this.gridContainer = null;
    }
    // Kill any running GSAP animations
    gsap.killTweensOf('.load-grid-item');
  }
}

// Export singleton instance
export const gridTransitions = new GridTransitions();
