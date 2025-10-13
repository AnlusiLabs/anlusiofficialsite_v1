import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypewriterText } from '../animations';
import Navbar from '../ui/Navbar';
import type { HeroSectionProps } from '../../types';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function HeroSection({ hasAudio, onReadyToTalk, onSoundToggle }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const cubeInitialized = useRef(false);

  useEffect(() => {
    const initCube = () => {
      if (!heroRef.current || cubeInitialized.current) return;
      
      
      const hero = heroRef.current;
      const w = hero.clientWidth;
      const h = hero.clientHeight;


      // Create a scene with the requested background color
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x152636);

      const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000); 
      camera.position.z = 5;
      
      const renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize(w, h);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      
      // Create a container for the canvas
      const canvasContainer = document.createElement('div');
      canvasContainer.style.position = 'absolute';
      canvasContainer.style.top = '0';
      canvasContainer.style.left = '0';
      canvasContainer.style.width = '100%';
      canvasContainer.style.height = '100%';
      canvasContainer.style.zIndex = '1';
      canvasContainer.style.pointerEvents = 'auto';
      canvasContainer.style.touchAction = 'none';
      canvasContainer.id = 'canvas-container';
      
      hero.insertBefore(canvasContainer, hero.firstChild);
      canvasContainer.appendChild(renderer.domElement);
      
      
      // Canvas styling
      renderer.domElement.style.cursor = 'grab';
      renderer.domElement.style.pointerEvents = 'auto';
      renderer.domElement.style.touchAction = 'none';
      renderer.domElement.style.position = 'relative';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';

      // Create OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;
      controls.enableZoom = true;
      controls.zoomSpeed = 1.2;
      controls.minDistance = 2.5;
      controls.maxDistance = 15;
      controls.enableRotate = true;
      controls.rotateSpeed = 1.5;
      controls.enablePan = false;


      // Initialize model/cube object
      let mainObject: THREE.Object3D;
      let mixer: THREE.AnimationMixer | null = null;
      
      // Try to load Blender model first, fallback to basic cube
      const gltfLoader = new GLTFLoader();
      const textureLoader = new THREE.TextureLoader();
      
      // First, try to load GLTF/GLB model from Blender
      gltfLoader.load(
        '/models/cube.glb', // This will be your Blender export
        (gltf) => {
          mainObject = gltf.scene;
          mainObject.scale.set(1.5, 1.5, 1.5);
          scene.add(mainObject);
          
          // Setup animations if they exist
          if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(mainObject);
            gltf.animations.forEach((clip) => {
              const action = mixer!.clipAction(clip);
              action.play();
            });
          }
          
          // Apply enhanced materials to all meshes
          mainObject.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              // Enhance materials with better lighting properties
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.roughness = 0.5;
                child.material.metalness = 0.3;
                child.material.envMapIntensity = 1.0;
              }
              
              // Enable shadows
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
        },
        (progress) => {
        },
        () => {
          createFallbackCube();
        }
      );
      
      // Fallback cube creation function
      function createFallbackCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ 
          color: 0xfd713a,
          roughness: 0.5,
          metalness: 0.3,
          flatShading: false
        });

        // Try to load texture
        textureLoader.load(
          '/cube.jpg', 
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            material.map = texture;
            material.needsUpdate = true;
          },
          undefined,
          (err) => {
            console.error('Error loading cube texture:', err);
          }
        );

        mainObject = new THREE.Mesh(geometry, material);
        mainObject.scale.set(1.5, 1.5, 1.5);
        scene.add(mainObject);
      }


      // Lighting setup
      const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
      scene.add(ambientLight);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x553311, 1.0);
      scene.add(hemiLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
      directionalLight.position.set(5, 5, 5);
      directionalLight.lookAt(0, 0, 0);
      scene.add(directionalLight);

      const secondaryLight = new THREE.DirectionalLight(0x3366ff, 0.5);
      secondaryLight.position.set(-5, 3, -5);
      scene.add(secondaryLight);


      // Animation variables
      let time = 0;
      let animationRunning = true;

      // Animation function
      function animate() {
        if (!animationRunning) return;
        
        requestAnimationFrame(animate);
        
        const deltaTime = 0.016; // Approximate 60fps
        time += 0.01;
        
        controls.update();
        
        // Update Blender animations if they exist
        if (mixer) {
          mixer.update(deltaTime);
        }
        
        // Apply floating motion for both Blender models and fallback cube
        if (mainObject && controls.autoRotate) {
          mainObject.position.y = Math.sin(time) * 0.1;
          
          // Only apply scale animation to fallback cube, not Blender models
          if (!mixer) {
            const scale = 1.5 + Math.sin(time * 2) * 0.05;
            mainObject.scale.set(scale, scale, scale);
          }
        }
        
        renderer.render(scene, camera);
      }

      // Handle window resize
      const handleResize = () => {
        if (!heroRef.current) return;
        
        const newW = heroRef.current.clientWidth;
        const newH = heroRef.current.clientHeight;
        
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };

      window.addEventListener('resize', handleResize);

      // Enhanced interaction
      renderer.domElement.addEventListener('mousedown', (e) => {
        e.preventDefault();
        controls.autoRotate = false;
        renderer.domElement.style.cursor = 'grabbing';
      });
      
      renderer.domElement.addEventListener('mouseup', () => {
        renderer.domElement.style.cursor = 'grab';
      });
      
      renderer.domElement.addEventListener('dblclick', () => {
        controls.autoRotate = !controls.autoRotate;
      });

      // Start animation
      animate();
      cubeInitialized.current = true;


      // Cleanup function
      return () => {
        animationRunning = false;
        window.removeEventListener('resize', handleResize);
        if (canvasContainer && canvasContainer.parentNode) {
          canvasContainer.parentNode.removeChild(canvasContainer);
        }
        cubeInitialized.current = false;
      };
    };

    // Initialize cube after component mounts
    const timer = setTimeout(initCube, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleReadyToTalkClick = () => {
    // Your Ready to Talk button functionality
    if (onReadyToTalk) {
      onReadyToTalk();
    }
  };

  return (
    <motion.section 
      id="hero" 
      ref={heroRef}
      className="hero-section hero-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        backgroundColor: '#152636', // fallback
        viewTransitionName: 'hero-section'
      }}
    >
      {/* Navbar */}
      <Navbar hasAudio={hasAudio} onSoundToggle={onSoundToggle} />
      
      {/* Background Layer */}
      <div className="hero-bg-layer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        {/* Three.js canvas will be inserted here */}
      </div>

      {/* Midground Layer */}
      <div 
        className="hero-inner hero-mid hero-content"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          padding: '120px 60px 100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 20,
          minHeight: '100vh',
          boxSizing: 'border-box',
          overflow: 'visible',
          pointerEvents: 'auto'
        }}
      >
        {/* Top Text */}
        <div 
          className="hero-top hero-fg"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 25
          }}
        >
          <motion.h1 
            className="cutting-edge hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1,
              textTransform: 'uppercase',
              margin: 0,
              color: '#f2e2c1',
              fontFamily: 'Orbitron, monospace'
            }}
          >
            Crafted<br />Code
          </motion.h1>
          
          {/* Marquee Scrolling Text */}
          <motion.div 
            className="marquee desktop-only"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              maxWidth: '50%'
            }}
          >
            <div 
              className="marquee-inner"
              style={{
                display: 'inline-block',
                paddingLeft: '100%',
                animation: 'marquee 20s linear infinite'
              }}
            >
              <span style={{ display: 'inline-block', margin: '0 clamp(15px, 3vw, 30px)', fontSize: 'clamp(1rem, 3vw, 2rem)', fontWeight: 600, textTransform: 'uppercase', opacity: 0.8, color: '#f2e2c1', fontFamily: 'Orbitron, monospace' }}>
                three.js
              </span>
              <span style={{ display: 'inline-block', margin: '0 clamp(15px, 3vw, 30px)', fontSize: 'clamp(1rem, 3vw, 2rem)', fontWeight: 600, textTransform: 'uppercase', opacity: 0.8, color: '#f2e2c1', fontFamily: 'Orbitron, monospace' }}>
                storytelling
              </span>
              <span style={{ display: 'inline-block', margin: '0 clamp(15px, 3vw, 30px)', fontSize: 'clamp(1rem, 3vw, 2rem)', fontWeight: 600, textTransform: 'uppercase', opacity: 0.8, color: '#f2e2c1', fontFamily: 'Orbitron, monospace' }}>
                web3
              </span>
              <span style={{ display: 'inline-block', margin: '0 clamp(15px, 3vw, 30px)', fontSize: 'clamp(1rem, 3vw, 2rem)', fontWeight: 600, textTransform: 'uppercase', opacity: 0.8, color: '#f2e2c1', fontFamily: 'Orbitron, monospace' }}>
                next js
              </span>
              <span style={{ display: 'inline-block', margin: '0 clamp(15px, 3vw, 30px)', fontSize: 'clamp(1rem, 3vw, 2rem)', fontWeight: 600, textTransform: 'uppercase', opacity: 0.8, color: '#f2e2c1', fontFamily: 'Orbitron, monospace' }}>
                react js
              </span>
              
              <span style={{ display: 'inline-block', margin: '0 clamp(15px, 3vw, 30px)', fontSize: 'clamp(1rem, 3vw, 2rem)', fontWeight: 600, textTransform: 'uppercase', opacity: 0.8, color: '#f2e2c1', fontFamily: 'Orbitron, monospace' }}>
                webgl
              </span>

              <span style={{ display: 'inline-block', margin: '0 clamp(15px, 3vw, 30px)', fontSize: 'clamp(1rem, 3vw, 2rem)', fontWeight: 600, textTransform: 'uppercase', opacity: 0.8, color: '#f2e2c1', fontFamily: 'Orbitron, monospace' }}>
                gsap
              </span>
               
            </div>
          </motion.div>
        </div>

        {/* Center button container */}
        <motion.div 
          className="center-button-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 20,
            margin: '3rem 0',
            width: '100%'
          }}
        >
          <button
            className="ready-to-talk-btn"
            onClick={handleReadyToTalkClick}
            style={{
              background: 'rgba(250, 104, 54, 0.3)',
              color: '#f2e2c1',
              padding: '15px 30px',
              borderRadius: '40px',
              fontSize: '1.2rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(250, 104, 54, 0.5)',
              cursor: 'pointer',
              fontFamily: 'Orbitron, monospace'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(250, 104, 54, 0.5)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(250, 104, 54, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Ready to Talk
            <svg 
              className="right-arrow" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ transition: 'transform 0.3s ease' }}
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </motion.div>

        {/* Bottom Text - enhanced styling for better visibility */}
        <div 
          className="hero-bottom hero-fg"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            position: 'relative',
            zIndex: 25,
            marginTop: 'auto',
            width: '100%',
            padding: '0 2rem 3rem 2rem',
            overflow: 'visible',
            boxSizing: 'border-box',
            visibility: 'visible',
            opacity: 1
          }}
        >
          <motion.div 
            className="specialise-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            style={{ maxWidth: '50%' }}
          >
            <TypewriterText
              text="We specialize in crafting interfaces that deliver an <br>unparalleled user experience. Prototyping, designing, <br>and developing for web2 and web3 interfaces."
              speed={30}
              delay={600}
              preserveHtml={true}
              className="specialise"
              style={{
                margin: 0,
                color: '#f2e2c1',
                minHeight: '5em',
                position: 'relative',
                overflow: 'visible',
                visibility: 'visible',
                opacity: 1,
                display: 'block',
                zIndex: 25,
                fontSize: '1.1rem',
                lineHeight: 1.6,
                fontFamily: 'Orbitron, monospace'
              }}
            />
          </motion.div>
          
          <motion.h2 
            className="frontend-solutions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              fontSize: '5.5rem',
              fontWeight: 800,
              lineHeight: 1,
              textTransform: 'uppercase',
              margin: '0 30px 0 0',
              position: 'relative',
              zIndex: 15,
              visibility: 'visible',
              maxWidth: '100%',
              wordWrap: 'break-word',
              color: '#f2e2c1',
              fontFamily: 'Orbitron, monospace'
            }}
          >
            Local<br />Roots
          </motion.h2>
        </div>
      </div>



      {/* CSS Animation for Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        @media (max-width: 900px) {
          .hero-top {
            flex-direction: column !important;
            gap: 30px;
          }
          
          .cutting-edge {
            font-size: 3.5rem !important;
          }
          
          .frontend-solutions {
            font-size: 3.5rem !important;
            margin: 0 0 20px 0 !important;
            width: 100%;
          }
          
          .marquee {
            max-width: 100% !important;
          }
          
          .hero-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 15px;
            padding-bottom: 3rem !important;
          }
          
          .specialise-wrapper {
            max-width: 100% !important;
          }
          
          .specialise {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
