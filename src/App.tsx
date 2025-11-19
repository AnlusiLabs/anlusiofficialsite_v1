import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoaderSection from "./components/sections/LoaderSection";
import LandingSection from "./components/sections/LandingSection";
import HeroSection from "./components/sections/HeroSection";
import IntroSection from "./components/sections/IntroSection";
import ProblemSection from "./components/sections/ProblemSection";
import InterfaceSection from "./components/sections/InterfaceSection";
import ResultsSection from "./components/sections/ResultsSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import WhoAreWeSection from "./components/sections/WhoAreWeSection";
import CTASection from "./components/sections/CTASection";
import FooterSection from "./components/sections/FooterSection";
import IntegrationsSection from "./components/sections/IntegrationsSection";
import CinematicZoomTransition from "./components/ui/CinematicZoomTransition";
import MaskTransition from "./components/ui/MaskTransition";
import Navbar from "./components/ui/Navbar";
import type { SectionType } from "./types";
import "./index.css";
import "./styles/transitions.css";
import "./styles/grid.css";

gsap.registerPlugin(ScrollTrigger);

// Grid Transition Component
function PageTransition({ onComplete }: { onComplete?: () => void }) {
  useEffect(() => {
    const gridItems = document.querySelectorAll(".grid-item");
    const loadGrid = document.querySelector(".load-grid") as HTMLElement;
    
    if (!gridItems.length || !loadGrid) return;
    
    
    // Show grid and set initial states
    gsap.set(loadGrid, { display: "grid" });
    gsap.set(gridItems, { opacity: 0 });

    // Animate grid items from opacity 0 to 1
    gsap.fromTo(
      gridItems,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.001,
        stagger: {
          amount: 0.5,
          from: "random",
        },
        onComplete: () => {
          if (onComplete) onComplete();
          
          setTimeout(() => {
            gsap.to(loadGrid, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                gsap.set(loadGrid, { display: "none" });
              }
            });
          }, 100);
        },
      }
    );
  }, [onComplete]);

  const gridCells = Array.from({ length: 96 }, (_, i) => (
    <div className="grid-item" key={i}></div>
  ));

  return <div className="load-grid">{gridCells}</div>;
}

function App() {
  const [currentSection, setCurrentSection] = useState<SectionType>("loader");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCinematicTransitioning, setIsCinematicTransitioning] = useState(false);
  const [isMaskTransitioning, setIsMaskTransitioning] = useState(false);
  const [targetSection, setTargetSection] = useState<SectionType | null>(null);
  const [hasAudio, setHasAudio] = useState(false);
  const [showBenefitsCards, setShowBenefitsCards] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = () => {
    setHasAudio(!hasAudio);
    
    if (audioRef.current) {
      if (!hasAudio) {
        // Currently off, turning on
        audioRef.current.play().catch(console.error);
      } else {
        // Currently on, turning off
        audioRef.current.pause();
      }
    }
    
  };

  const initializeAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio('/audio.mp3');
      audio.loop = true;
      audioRef.current = audio;
    }
    
    audioRef.current.play().catch(console.error);
    setHasAudio(true);
  };
  const [benefitsCardPosition, setBenefitsCardPosition] = useState(0);
  const [additionalScrollsAfterCards, setAdditionalScrollsAfterCards] = useState(0);
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollTime = useRef(0);

  const handlePageTransition = (target: SectionType) => {
    if (isTransitioning) {
      return;
    }
    
    setTargetSection(target);
    setIsTransitioning(true);
  };

  const showIntro = () => {
    handlePageTransition("intro");
  };

  const showHero = () => {
    handlePageTransition("hero");
  };

  const showBenefits = () => {
    setShowBenefitsCards(false);
    setBenefitsCardPosition(0);
    setAdditionalScrollsAfterCards(0);
    handlePageTransition("benefits");
  };

  const showProblem = () => {
    handlePageTransition("problem");
  };

  const showBenefitsFromProblem = () => {
    handlePageTransition("benefits");
  };

  const showInterface = () => {
    setIsCinematicTransitioning(true);
    setTargetSection("interface");
  };

  const showProblemFromInterface = () => {
    handlePageTransition("problem");
  };

  const showResults = () => {
    setIsCinematicTransitioning(true);
    setTargetSection("results");
  };

  const showInterfaceFromResults = () => {
    setIsCinematicTransitioning(true);
    setTargetSection("interface");
  };

  const showHowItWorks = () => {
    setIsCinematicTransitioning(true);
    setTargetSection("how-it-works");
  };

  const showResultsFromHowItWorks = () => {
    setIsCinematicTransitioning(true);
    setTargetSection("results");
  };

  const showProjects = () => {
    handlePageTransition("projects");
  };

  const showHowItWorksFromProjects = () => {
    handlePageTransition("how-it-works");
  };

  const showWhoAreWe = () => {
    handlePageTransition("whoarewe");
  };

  const [isFromWhoAreWe, setIsFromWhoAreWe] = useState(false);

  const showProjectsFromWhoAreWe = () => {
    setIsFromWhoAreWe(true);
    setIsCinematicTransitioning(true);
    setTargetSection("projects");
  };

  const showCTA = () => {
    setIsCinematicTransitioning(true);
    setTargetSection("cta");
  };

  const showWhoAreWeFromCTA = () => {
    setIsCinematicTransitioning(true);
    setTargetSection("whoarewe");
  };

  const showFooter = () => {
    setIsMaskTransitioning(true);
    setTargetSection("footer");
  };

  const showCTAFromFooter = () => {
    setIsMaskTransitioning(true);
    setTargetSection("cta");
  };

  const showHowItWorksFromIntegrations = () => {
    setIsCinematicTransitioning(true);
    setTargetSection("how-it-works");
  };

  useEffect(() => {
    if (currentSection === "hero" || currentSection === "intro" || currentSection === "benefits" || currentSection === "problem" || currentSection === "interface" || currentSection === "results" || currentSection === "how-it-works" || currentSection === "integrations") {
      
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        
        // Handle intro section scroll behavior - NOW ENABLED!
        if (currentSection === "intro") {
          const now = Date.now();
          if (now - lastScrollTime.current < 1000) return;
          
          lastScrollTime.current = now;
          
          if (event.deltaY < 0) {
            setTimeout(() => showHero(), 100);
          }
          return;
        }
        
        // Handle benefits section scroll behavior
        if (currentSection === "benefits") {
          const now = Date.now();
          if (now - lastScrollTime.current < 600) {
            return;
          }
          
          lastScrollTime.current = now;
          const scrollDirection = event.deltaY > 0 ? 'DOWN' : 'UP';
          
          
          if (event.deltaY > 0) {
            // SCROLL DOWN = MOVE CARDS LEFT (right to left motion)
            setBenefitsCardPosition(prevPos => {
              if (prevPos < 15) {
                setAdditionalScrollsAfterCards(0); // Reset additional scrolls when still moving cards
                return prevPos + 1;
              } else {
                // Cards are at max position, count additional scrolls
                setAdditionalScrollsAfterCards(additionalCount => {
                  if (additionalCount + 1 >= 2) {
                    setTimeout(() => showProblem(), 100);
                    return 0; // Reset counter
                  }
                  return additionalCount + 1;
                });
                return prevPos;
              }
            });
            setShowBenefitsCards(true);
          } else if (event.deltaY < 0) {
            // SCROLL UP = MOVE CARDS RIGHT (left to right motion)
            setBenefitsCardPosition(prevPos => {
              if (prevPos > 0) {
                setAdditionalScrollsAfterCards(0); // Reset additional scrolls when moving cards
                return prevPos - 1;
              } else if (prevPos === 0) {
                setShowBenefitsCards(false);
                setAdditionalScrollsAfterCards(0);
                setTimeout(() => showIntro(), 100);
              }
              return prevPos;
            });
          }
          return;
        }
        
        // Handle problem section scroll behavior
        if (currentSection === "problem") {
          const now = Date.now();
          if (now - lastScrollTime.current < 1000) return;
          
          lastScrollTime.current = now;
          
          if (event.deltaY > 0) {
            setTimeout(() => showInterface(), 100);
          } else if (event.deltaY < 0) {
            setTimeout(() => showBenefitsFromProblem(), 100);
          }
          return;
        }
        
        // Handle interface section scroll behavior
        if (currentSection === "interface") {
          const now = Date.now();
          if (now - lastScrollTime.current < 1000) return;
          
          lastScrollTime.current = now;
          
          if (event.deltaY > 0) {
            setTimeout(() => showResults(), 100);
          } else if (event.deltaY < 0) {
            setTimeout(() => showProblemFromInterface(), 100);
          }
          return;
        }

        // Handle results section scroll behavior - let ResultsSection handle its own scroll logic
        if (currentSection === "results") {
          // Results section handles its own scroll logic for menu items
          // Only handle up navigation to interface here
          const now = Date.now();
          if (now - lastScrollTime.current < 1000) return;
          
          lastScrollTime.current = now;
          
          // Note: Up scroll is handled by ResultsSection internal logic
          // Down scroll to How It Works will be handled by ResultsSection
          return;
        }
        
        // Handle hero section
        if (currentSection === "hero") {
          const now = Date.now();
          if (now - lastScrollTime.current < 1000) return;
          
          lastScrollTime.current = now;
          
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          
          scrollTimeoutRef.current = setTimeout(() => {
            const deltaY = event.deltaY;
            
            if (deltaY > 0) {
              showIntro();
            }
          }, 100);
        }
      };
      
      window.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        window.removeEventListener('wheel', handleWheel);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [currentSection, benefitsCardPosition, additionalScrollsAfterCards]);

  return (
    <div className="app">
      {isTransitioning && (
        <PageTransition onComplete={() => {
          if (targetSection) {
            setCurrentSection(targetSection);
            setTargetSection(null);
          }
          setIsTransitioning(false);
        }} />
      )}
      
      {isCinematicTransitioning && (
        <CinematicZoomTransition onComplete={() => {
          if (targetSection) {
            setCurrentSection(targetSection);
            setTargetSection(null);
          }
          setIsCinematicTransitioning(false);
        }} />
      )}

      {isMaskTransitioning && (
        <>
          {/* Always render current section behind mask during transition */}
          {currentSection === "cta" && (
            <CTASection 
              onBackToWhoAreWe={showWhoAreWeFromCTA}
              onRevealFooter={showFooter}
              disableScrollHandling={true} // Disable scroll when used as background
              hasAudio={hasAudio}
              onSoundToggle={toggleSound}
            />
          )}
          
          {/* Render target section behind the mask */}
          {targetSection === "footer" && (
            <FooterSection 
              hasAudio={hasAudio}
              onSoundToggle={toggleSound}
              onBackToCTA={showCTAFromFooter}
            />
          )}
          {targetSection === "cta" && currentSection !== "cta" && (
            <CTASection 
              onBackToWhoAreWe={showWhoAreWeFromCTA}
              onRevealFooter={showFooter}
              disableScrollHandling={true} // Disable scroll when used as background
              hasAudio={hasAudio}
              onSoundToggle={toggleSound}
            />
          )}
          
          <MaskTransition 
            onComplete={() => {
              if (targetSection) {
                setCurrentSection(targetSection);
                setTargetSection(null);
              }
              setIsMaskTransitioning(false);
            }}
            onScrollBack={() => {
              if (targetSection === "footer") {
                // Going back to CTA from footer transition
                setCurrentSection("cta");
              } else {
                // Going back to CTA from footer transition  
                setCurrentSection("cta");
              }
              setTargetSection(null);
              setIsMaskTransitioning(false);
            }}
          />
        </>
      )}
      
      {currentSection === "loader" && (
        <LoaderSection onComplete={() => setCurrentSection("landing")} />
      )}
      
      {currentSection === "landing" && (
        <LandingSection
          onEnterWithAudio={() => {
            initializeAudio();
            setCurrentSection("hero");
          }}
          onEnterWithoutAudio={() => {
            setHasAudio(false);
            setCurrentSection("hero");
          }}
        />
      )}
      
      {currentSection === "problem" && (
        <ProblemSection 
          onBackToBenefits={showBenefitsFromProblem}
          hasAudio={hasAudio}
          onSoundToggle={toggleSound}
        />
      )}
      
      {currentSection === "interface" && (
        <InterfaceSection 
          onBackToProblem={showProblemFromInterface}
          hasAudio={hasAudio}
          onSoundToggle={toggleSound}
        />
      )}
      
      {currentSection === "results" && (
        <ResultsSection 
          onBackToInterface={showInterfaceFromResults} 
          onNextToHowItWorks={showHowItWorks}
          hasAudio={hasAudio}
          onSoundToggle={toggleSound}
        />
      )}
      
      {currentSection === "how-it-works" && (
        <HowItWorksSection 
          onBackToResults={showResultsFromHowItWorks} 
          onShowProjects={showProjects}
          hasAudio={hasAudio}
          onSoundToggle={toggleSound}
        />
      )}
      
      {currentSection === "projects" && (
        <ProjectsSection 
          onBackToHowItWorks={showHowItWorksFromProjects}
          onNextToWhoAreWe={() => {
            setIsFromWhoAreWe(false); // Reset flag when leaving
            showWhoAreWe();
          }}
          fromWhoAreWe={isFromWhoAreWe}
          hasAudio={hasAudio}
          onSoundToggle={toggleSound}
        />
      )}
      
      {currentSection === "whoarewe" && (
        <WhoAreWeSection 
          onBackToProjects={showProjectsFromWhoAreWe}
          onNextToCTA={showCTA}
          hasAudio={hasAudio}
          onSoundToggle={toggleSound}
        />
      )}
      
      {currentSection === "cta" && (
        <>
          <CTASection 
            onBackToWhoAreWe={showWhoAreWeFromCTA}
            onRevealFooter={showFooter}
            hasAudio={hasAudio}
            onSoundToggle={toggleSound}
          />
        </>
      )}
      
      {currentSection === "footer" && !isMaskTransitioning && (
        <FooterSection 
          hasAudio={hasAudio}
          onSoundToggle={toggleSound}
          onBackToCTA={showCTAFromFooter}
        />
      )}
      
      {currentSection === "integrations" && (
        <IntegrationsSection 
          onBackToHowItWorks={showHowItWorksFromIntegrations}
          hasAudio={hasAudio}
          onSoundToggle={toggleSound}
        />
      )}
      
      {(currentSection === "hero" || currentSection === "intro" || currentSection === "benefits") && (
        <div style={{ height: "200vh", position: "relative" }}>
          <div 
            id="hero"
            style={{ 
              display: currentSection === "hero" ? "block" : "none",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              zIndex: 1,
              background: "#000"
            }}
          >
            <HeroSection hasAudio={hasAudio} onReadyToTalk={() => {}} onSoundToggle={toggleSound} />

          </div>
          
          <div 
            id="introduction"
            style={{ 
              display: currentSection === "intro" ? "block" : "none",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%", 
              height: "100vh",
              zIndex: 1
            }}
          >
            <IntroSection 
              onScrollToBenefits={showBenefits} 
              isTransitioning={isTransitioning}
              hasAudio={hasAudio}
              onSoundToggle={toggleSound}
            />
            


          </div>

          <div 
            id="benefits"
            style={{ 
              display: currentSection === "benefits" ? "block" : "none",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%", 
              height: "100vh",
              zIndex: 5000,
              background: "#0f1f2b",
              color: "#f2e2c1",
              fontFamily: 'Orbitron, monospace',
              overflow: 'visible'
            }}
          >
            {/* Horizontal Scrolling Cards */}
            <div 
              id="benefits-cards-container"
              className="benefits-cards-container"
              style={{
                position: 'fixed',
                bottom: 'clamp(40px, 8vw, 80px)',
                left: '0',
                right: '0',
                width: '100vw',
                height: 'clamp(200px, 25vh, 250px)',
                overflow: 'visible',
                pointerEvents: 'none',
                zIndex: 10000
              }}
            >
              <div 
                id="benefits-cards-track"
                style={{
                  display: 'flex',
                  gap: '20px',
                  height: '100%',
                  width: 'auto',
                  transform: benefitsCardPosition === 0 && !showBenefitsCards 
                    ? `translateX(100vw)` 
                    : `translateX(calc(100vw - ${(benefitsCardPosition + 1) * 220}px))`,
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Card 01 - Stunning Animations */}
                <div className="benefits-card" style={{
                  minWidth: '200px',
                  height: '250px',
                  background: 'rgba(250, 104, 54, 0.1)',
                  border: '1px solid rgba(250, 104, 54, 0.3)',
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(10px)',
                  flexShrink: 0
                }}>
                  <div>
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: '#fa6836',
                      marginBottom: '10px'
                    }}>01</div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#f2e2c1',
                      marginBottom: '15px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>Stunning Animations</h3>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    color: '#f2e2c1',
                    opacity: 0.8,
                    margin: 0
                  }}>
                    Create captivating visual <br />
                    experiences with smooth, <br />
                    performant animations that <br />
                    engage users.
                  </p>
                </div>

                {/* Card 02 - Flexible Integration */}
                <div style={{
                  minWidth: '200px',
                  height: '250px',
                  background: 'rgba(250, 104, 54, 0.1)',
                  border: '1px solid rgba(250, 104, 54, 0.3)',
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(10px)',
                  flexShrink: 0
                }}>
                  <div>
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: '#fa6836',
                      marginBottom: '10px'
                    }}>02</div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#f2e2c1',
                      marginBottom: '15px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>Flexible Integration</h3>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    color: '#f2e2c1',
                    opacity: 0.8,
                    margin: 0
                  }}>
                    Seamlessly integrate with <br />
                    existing systems and <br />
                    frameworks. Scalable <br />
                    architecture solutions.
                  </p>
                </div>

                {/* Card 03 - Speed and Stability */}
                <div style={{
                  minWidth: '200px',
                  height: '250px',
                  background: 'rgba(250, 104, 54, 0.1)',
                  border: '1px solid rgba(250, 104, 54, 0.3)',
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(10px)',
                  flexShrink: 0
                }}>
                  <div>
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: '#fa6836',
                      marginBottom: '10px'
                    }}>03</div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#f2e2c1',
                      marginBottom: '15px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>Speed and Stability</h3>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    color: '#f2e2c1',
                    opacity: 0.8,
                    margin: 0
                  }}>
                    Optimized performance with <br />
                    lightning-fast load times <br />
                    and rock-solid reliability <br />
                    across all devices.
                  </p>
                </div>

                {/* Card 04 - Unique Experience */}
                <div style={{
                  minWidth: '200px',
                  height: '250px',
                  background: 'rgba(250, 104, 54, 0.1)',
                  border: '1px solid rgba(250, 104, 54, 0.3)',
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(10px)',
                  flexShrink: 0
                }}>
                  <div>
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: '#fa6836',
                      marginBottom: '10px'
                    }}>04</div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#f2e2c1',
                      marginBottom: '15px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>Unique Experience</h3>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    color: '#f2e2c1',
                    opacity: 0.8,
                    margin: 0
                  }}>
                    Stand out with distinctive, <br />
                    memorable interfaces that <br />
                    reflect your brand identity <br />
                    and create lasting impressions.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Right Text Content */}
            <div className="benefits-text-content" style={{ 
              position: 'absolute',
              bottom: 'clamp(40px, 8vw, 80px)',
              right: 'clamp(20px, 6vw, 60px)',
              maxWidth: 'clamp(300px, 60vw, 600px)',
              textAlign: 'left',
              zIndex: 1
            }}>
              <span style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#fa6836',
                fontWeight: 600,
                marginBottom: '20px',
                display: 'block'
              }}>
                [Why is WOW Frontend so Important]
              </span>
              
              <h6 style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: '#f2e2c1',
                marginBottom: '0',
                textTransform: 'uppercase'
              }}>
                The Benefits of Modern <br />Frontend Development
              </h6>
            </div>
            


            {/* Navbar */}
            <Navbar hasAudio={hasAudio} onSoundToggle={toggleSound} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
