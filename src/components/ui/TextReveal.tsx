import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/text-reveal.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  pin?: boolean;
  scrub?: boolean;
  start?: string;
  end?: string;
  stagger?: number;
}

export default function TextReveal({ 
  children, 
  className = '', 
  style = {},
  pin = true,
  scrub = true,
  start = 'top top',
  end = '+=120%',
  stagger = 0.03
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    if (!containerRef.current || !wrapperRef.current) return;

    // Split words into spans (preserves spaces)
    function splitWords(element: HTMLElement) {
      const textNodes = element.querySelectorAll('h1, p, h2, h3, h4, h5, h6');
      let allWords: HTMLElement[] = [];

      textNodes.forEach(el => {
        const text = el.textContent || '';
        const tokens = text.split(/(\s+)/); // keep whitespace tokens
        
        el.innerHTML = tokens.map(token => {
          return /\s+/.test(token) ? token : `<span class="word">${token}</span>`;
        }).join('');
        
        const words = Array.from(el.querySelectorAll('.word')) as HTMLElement[];
        allWords = allWords.concat(words);
      });

      return allWords;
    }

    const words = splitWords(wrapperRef.current);
    
    // Refresh ScrollTrigger to pick up new DOM nodes
    ScrollTrigger.refresh();

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: start,
        end: end,
        scrub: scrub,
        pin: pin,
        anticipatePin: 1,
        // markers: true // enable for debugging
      }
    });

    // Add fromTo animation to the timeline
    tl.fromTo(words, 
      {
        opacity: 0.3,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        stagger: stagger,
        ease: 'power1.out'
      }
    );

    // Responsive handling
    function handleResponsive() {
      if (window.innerWidth < 700) {
        // Mobile: shorter scroll distance and faster stagger
        if (tl.scrollTrigger) {
          tl.scrollTrigger.vars.end = '+=80%';
          tl.invalidate();
          ScrollTrigger.refresh();
        }
      } else {
        // Desktop: longer scroll distance
        if (tl.scrollTrigger) {
          tl.scrollTrigger.vars.end = end;
          tl.invalidate();
          ScrollTrigger.refresh();
        }
      }
    }

    handleResponsive();

    const handleResize = () => {
      clearTimeout((window as any)._stResize);
      (window as any)._stResize = setTimeout(handleResponsive, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      tl.kill();
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [pin, scrub, start, end, stagger]);

  return (
    <div 
      ref={containerRef}
      className={`text-reveal-section min-h-screen flex items-center justify-center ${className}`}
      style={style}
    >
      <div className="container w-full max-w-4xl mx-auto px-8">
        <div ref={wrapperRef} className="wrapper">
          {children}
        </div>
      </div>
    </div>
  );
}
