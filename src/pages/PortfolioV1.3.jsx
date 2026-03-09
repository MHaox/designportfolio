import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MagneticButton from '../components/v3/atoms/MagneticButton';

export default function PortfolioV3() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonWrapperRef = useRef(null);
  
  // useNavigate lets us route back to the main portfolio
  const navigate = useNavigate();

  useGSAP(() => {
    // 1. Create the timeline
    const tl = gsap.timeline();

    // 2. Animate the giant text sliding UP from "hidden"
    // Using an ease of "power4.out" gives it that fast-snap-then-slow-drift premium feel
    tl.from(textRef.current, {
      y: 150, // Starts 150px lower
      rotation: 5, // Adds a slight tilt for flavor
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.2 // Small delay after page load
    })
    
    // 3. Chain the subtext to fade in smoothly
    // The "-=0.8" at the end tells GSAP to start this animation 0.8 seconds BEFORE the previous one finishes (overlap!)
    .from(subtextRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")

    // 4. Pop the magnetic button in last
    .from(buttonWrapperRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)" // Adds a nice little elastic bounce
    }, "-=0.6");

  }, { scope: containerRef }); // Scope ensures GSAP only targets elements inside this specific component

  return (
    // The main container is locked to the screen height and hides overflow
    <div ref={containerRef} className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* This wrapper is the secret to high-end text animation! 
        By setting overflow-hidden on the wrapper, the text looks like it's sliding out from behind an invisible wall.
      */}
      <div className="overflow-hidden mb-4">
        <h1 
          ref={textRef} 
          className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-red-600 origin-bottom-left"
        >
          V3 Incoming
        </h1>
      </div>

      <p ref={subtextRef} className="text-gray-400 text-lg md:text-xl font-light mb-12 text-center max-w-md px-4">
        Currently orchestrating some heavy motion graphics. You aren't supposed to be here yet.
      </p>

      {/* Wrap our Magnetic Button in a div we can animate and click */}
      <div ref={buttonWrapperRef} onClick={() => navigate('/')}>
        <MagneticButton>Return to Safety</MagneticButton>
      </div>

    </div>
  );
}