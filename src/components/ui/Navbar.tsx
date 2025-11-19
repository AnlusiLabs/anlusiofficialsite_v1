import React, { useState } from 'react';

interface NavbarProps {
  hasAudio: boolean;
  onSoundToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ hasAudio, onSoundToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGetStartedClick = () => {
    // Add your navigation logic here
  };

  const handleNavLinkClick = (_section: string) => {
    // Add your navigation logic here
    setIsMenuOpen(false); // Close mobile menu
  };

  return (
    <header 
      id="main-nav"
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '5px 40px',
        zIndex: 1000,
        width: '90%',
        maxWidth: '1400px',
        background: 'rgba(21, 38, 54, 0.7)',
        backdropFilter: 'blur(20px)',
        border: 'none',
        borderRadius: '20px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        fontFamily: 'Orbitron, monospace'
      }}
    >
      <div 
        className="nav-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: '20px'
        }}
      >
        {/* Logo */}
        <div 
          className="logo"
          style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img 
            src="/logo-trans.png" 
            alt="CubeMail Logo"
            style={{
              height: '70px',
              width: 'auto',
              borderRadius: '0'
            }}
          />
        </div>

        {/* Navigation Links */}
        <nav 
          className={`nav-links ${isMenuOpen ? 'open' : ''}`}
          style={{
            display: 'flex',
            gap: '30px',
            flexGrow: 1,
            justifyContent: 'center'
          }}
        >
          <a 
            href="#what-we-do"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick('what-we-do');
            }}
            style={{
              color: '#f2e2c1',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fa6836'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#f2e2c1'}
          >
            What we do
          </a>
          <a 
            href="#problem"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick('problem');
            }}
            style={{
              color: '#f2e2c1',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fa6836'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#f2e2c1'}
          >
            The problem
          </a>
          <a 
            href="#solution"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick('solution');
            }}
            style={{
              color: '#f2e2c1',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fa6836'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#f2e2c1'}
          >
            The solution
          </a>
          <a 
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick('projects');
            }}
            style={{
              color: '#f2e2c1',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fa6836'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#f2e2c1'}
          >
            Projects
          </a>
          <a 
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick('about');
            }}
            style={{
              color: '#f2e2c1',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fa6836'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#f2e2c1'}
          >
            About
          </a>
        </nav>

        {/* Right Side - Sound Toggle and Get Started */}
        <div 
          className={`nav-right ${isMenuOpen ? 'open' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          {/* Sound Toggle Button */}
          <button
            id="sound-toggle"
            className="sound-toggle"
            onClick={onSoundToggle}
            style={{
              background: 'none',
              border: '1px solid #fa6836',
              color: '#f2e2c1',
              padding: '8px 16px',
              borderRadius: '30px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'Orbitron, monospace'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(250, 104, 54, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            Sound ({hasAudio ? 'on' : 'off'})
          </button>

          {/* Get Started Button */}
          <button
            className="get-started-btn"
            onClick={handleGetStartedClick}
            style={{
              background: 'rgba(250, 104, 54, 0.2)',
              color: '#f2e2c1',
              padding: '8px 20px',
              borderRadius: '30px',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Orbitron, monospace'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(250, 104, 54, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(250, 104, 54, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Get Started
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              viewBox="0 0 16 16" 
              className="right-arrow"
            >
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
          style={{
            display: 'none',
            flexDirection: 'column',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            gap: '3px'
          }}
        >
          <span 
            className="bar"
            style={{
              width: '25px',
              height: '3px',
              background: '#f2e2c1',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
            }}
          />
          <span 
            className="bar"
            style={{
              width: '25px',
              height: '3px',
              background: '#f2e2c1',
              transition: 'all 0.3s ease',
              opacity: isMenuOpen ? 0 : 1
            }}
          />
          <span 
            className="bar"
            style={{
              width: '25px',
              height: '3px',
              background: '#f2e2c1',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
            }}
          />
        </button>
      </div>

      {/* Mobile Styles */}
      <style>{`
        @media (max-width: 900px) {
          #main-nav {
            width: 95% !important;
            padding: 8px 20px !important;
          }
          
          .nav-inner {
            justify-content: space-between !important;
            gap: 10px !important;
          }
          
          .nav-right {
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            gap: 15px !important;
            padding: 15px !important;
            background: rgba(21, 38, 54, 0.8) !important;
            border-radius: 0 0 15px 15px !important;
            backdrop-filter: blur(20px) !important;
            border: none !important;
            transform: ${isMenuOpen ? 'translateY(0)' : 'translateY(-200%)'} !important;
            transition: transform 0.4s ease !important;
            z-index: -1 !important;
            opacity: ${isMenuOpen ? 1 : 0} !important;
          }
          
          .nav-links {
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            right: 0 !important;
            flex-direction: column !important;
            background: rgba(21, 38, 54, 0.8) !important;
            border-radius: 15px !important;
            border: none !important;
            backdrop-filter: blur(20px) !important;
            margin-top: 10px !important;
            padding: 25px 0 !important;
            align-items: center !important;
            gap: 20px !important;
            transform: ${isMenuOpen ? 'translateY(0)' : 'translateY(-200%)'} !important;
            transition: transform 0.4s ease !important;
          }
          
          .nav-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
