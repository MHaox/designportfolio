import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'; 

export default function MagneticButton({ children }) {
  const buttonRef = useRef(null);
  
  useGSAP(() => {
    const button = buttonRef.current;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientWidth, clientHeight } = button;
      const { left, top } = button.getBoundingClientRect();

      // Calculate the distance from the center of the button to the mouse
      const x = e.clientX - (left + clientWidth / 2);
      const y = e.clientY - (top + clientHeight / 2);

      // Move the button slightly towards the mouse
      // The 0.4 controls how far it pulls. Lower = less pull.
      xTo(x * 0.4); 
      yTo(y * 0.4);
    };

    const handleMouseLeave = () => {
      // Snap it back to the center organically when the mouse leaves
      xTo(0);
      yTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // Empty array means this setup runs once when the button appears

  return (
    <div 
      ref={buttonRef} 
      className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-full cursor-pointer hover:bg-red-500 transition-colors"
    >
      {children}
    </div>
  );
}