import { useEffect } from "react";
import { gsap } from "gsap";

interface CinematicZoomTransitionProps {
  onComplete?: () => void;
}

export default function CinematicZoomTransition({ onComplete }: CinematicZoomTransitionProps) {
  useEffect(() => {
    const overlay = document.querySelector(".cinematic-overlay") as HTMLElement;
    const zoomElement = document.querySelector(".cinematic-zoom") as HTMLElement;
    
    if (!overlay || !zoomElement) return;
    
    
    // Show overlay
    gsap.set(overlay, { display: "block", opacity: 1 });
    gsap.set(zoomElement, { scale: 1, opacity: 1 });

    // Create cinematic zoom effect
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
        
        // Fade out the transition
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
          }
        });
      }
    });

    // Zoom in effect with dramatic scaling
    tl.to(zoomElement, {
      scale: 20,
      duration: 1.5,
      ease: "power2.inOut"
    })
    // Fade to black at the peak of zoom
    .to(zoomElement, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.3");

  }, [onComplete]);

  return (
    <div 
      className="cinematic-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#0f1f2b',
        zIndex: 9999,
        display: 'none',
        overflow: 'hidden'
      }}
    >
      <div 
        className="cinematic-zoom"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250, 104, 54, 0.3) 0%, rgba(15, 31, 43, 0.8) 50%, rgba(15, 31, 43, 1) 100%)',
          border: '2px solid rgba(250, 104, 54, 0.5)'
        }}
      />
    </div>
  );
}
