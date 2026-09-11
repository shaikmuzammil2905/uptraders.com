import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logoImg from '../assets/up-traders-logo.png';
import splashBg from '../assets/splash_bg.png';

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

    // Logo pops in
    tl.from(logoGroup.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });

    // Tagline fades up
    tl.from(taglineRef.current, {
      y: 12,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.2');

    // Hold for a moment
    tl.to({}, { duration: 1.2 });

    // Fade everything out
    tl.to(container.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    });

  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center w-full h-full overflow-hidden bg-[#FDF8F0]"
    >
      {/* Background pattern or subtle gradient */}
      <img
        src={splashBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-sm text-center">
        <div ref={logoGroup} className="flex flex-col items-center">
          {/* Logo with preserved aspect ratio */}
          <img
            src={logoImg}
            alt="UP Traders - Complete Grocery Store"
            className="w-56 md:w-64 h-auto object-contain drop-shadow-xl"
          />
        </div>

        {/* Supporting badge / tagline */}
        <div
          ref={taglineRef}
          className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/10 border border-green-900/20 text-[#1B7A2B] font-bold text-xs md:text-sm tracking-wider uppercase"
        >
          <span>Sangareddy, Telangana</span>
        </div>
      </div>
    </div>
  );
}
