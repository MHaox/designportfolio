import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CyberpunkHero() {
  const containerRef = useRef(null);
  const skyRef = useRef(null);
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const truckRef = useRef(null);

  useGSAP(() => {
    // We use gsap.quickTo for buttery smooth mouse tracking
    const moveSky = gsap.quickTo(skyRef.current, "x", { duration: 0.8, ease: "power3.out" });
    const moveCity = gsap.quickTo(cityRef.current, "x", { duration: 0.8, ease: "power3.out" });
    const moveStreet = gsap.quickTo(streetRef.current, "x", { duration: 0.8, ease: "power3.out" });
    
    // The truck moves independently to feel like it's driving
    const driveTruck = gsap.to(truckRef.current, {
      x: "120vw", // Drives all the way across the screen
      duration: 15,
      repeat: -1, // Loops infinitely
      ease: "none" // Linear speed (cars don't ease in and out of driving)
    });

    const handleMouseMove = (e) => {
      // Get mouse position relative to the center of the screen
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2; // Returns a value between -1 and 1

      // Move layers at different speeds (Parallax effect)
      // The further back the layer, the LESS it moves.
      moveSky(xPos * 15);     // Moves very little
      moveCity(xPos * 40);    // Moves a bit more
      moveStreet(xPos * 90);  // Moves the most (closest to camera)
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      driveTruck.kill(); // Clean up the infinite animation
    };
  }, { scope: containerRef });

  return (
    // The container is relative, full screen, and hides anything that spills out
    <div 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-[#0d0d1a]" // Dark cyberpunk night sky color
    >
      
      {/* LAYER 1: DEEP BACKGROUND (Sky & Silhouettes) */}
      <div 
        ref={skyRef}
        className="absolute inset-[-5%] w-[110%] h-[110%] bg-cover bg-center pointer-events-none"
        style={{ 
          backgroundImage: "url('/assets/layer1-sky.png')",
          imageRendering: "pixelated" // CRUCIAL: Keeps your pixel art sharp!
        }} 
      />

      {/* LAYER 2: MIDGROUND (Buildings & Blank Billboard) */}
      <div 
        ref={cityRef}
        className="absolute inset-[-5%] w-[110%] h-[110%] bg-cover bg-center pointer-events-none"
        style={{ 
          backgroundImage: "url('/assets/layer2-city.png')",
          imageRendering: "pixelated"
        }} 
      >
        {/* WE WILL PUT THE GSAP BILLBOARD TEXT HERE LATER */}
      </div>

      {/* LAYER 3: THE TRUCK (Moves independently) */}
      <div 
        ref={truckRef}
        className="absolute bottom-[10%] left-[-20%] w-[300px] h-[150px] bg-contain bg-no-repeat pointer-events-none"
        style={{ 
          backgroundImage: "url('/assets/layer4-truck.png')",
          imageRendering: "pixelated"
        }}
      >
        {/* WE WILL PUT THE TRUCK SCREEN TEXT HERE LATER */}
      </div>

      {/* LAYER 4: FOREGROUND (Street, Barriers, Workers) */}
      <div 
        ref={streetRef}
        className="absolute inset-[-5%] w-[110%] h-[110%] bg-cover bg-bottom pointer-events-none"
        style={{ 
          backgroundImage: "url('/assets/layer3-street.png')",
          imageRendering: "pixelated"
        }} 
      />

      {/* THIS IS THE TEXT THE USER ACTUALLY INTERACTS WITH */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
         <h1 className="text-white text-4xl font-black uppercase drop-shadow-[0_0_15px_rgba(255,0,128,0.8)]">
            Move your mouse
         </h1>
      </div>

    </div>
  );
}