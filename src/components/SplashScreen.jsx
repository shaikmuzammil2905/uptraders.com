import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logoImg from '../assets/up-traders-logo.png';

export function SplashScreen({ onComplete }) {
  const container = useRef(null);
  const logoGroup = useRef(null);
  const taglineRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Logo smoothly scales and fades in
    tl.from(logoGroup.current, {
      scale: 0.85,
      opacity: 0,
      duration: 0.9,
      ease: 'back.out(1.6)'
    });

    // Tagline fades up
    tl.from(taglineRef.current, {
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3');

    // Hold for visibility
    tl.to({}, { duration: 1.2 });

    // Fade out splash screen
    tl.to(container.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });

  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center w-full h-full overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FDF8F0] to-[#FFF6E5]"
    >
      {/* Subtle radial ambient glow behind logo */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#FFC107]/15 blur-3xl pointer-events-none" />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-md text-center">
        <div ref={logoGroup} className="flex flex-col items-center justify-center">
          {/* Transparent Logo */}
          <img
            src={logoImg}
            alt="UP Traders - Complete Grocery Store"
            className="w-64 md:w-80 h-auto object-contain drop-shadow-md"
          />
        </div>

        {/* Location Badge */}
        <div
          ref={taglineRef}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#1B7A2B]/20 text-[#1B7A2B] font-bold text-xs md:text-sm tracking-wider uppercase shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#1B7A2B] animate-pulse"></span>
          <span>Sangareddy, Telangana</span>
        </div>
      </div>
    </div>
  );
}
