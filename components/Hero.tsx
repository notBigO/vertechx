"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGlitch } from "react-powerglitch";
import Particles from "./ui/particles";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { display, hero } from "@/app/layout";

const CyberpunkHero = () => {
  const glitch = useGlitch({
    timing: {
      duration: 4000,
      iterations: Infinity,
    },
    slice: {
      count: 6,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.15,
    },
  });

  const [color, setColor] = useState("#7c09ff");
  const [particleQuantity, setParticleQuantity] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }, 1000);

    const updateParticleQuantity = () => {
      const isMobile = window.innerWidth <= 768;
      setParticleQuantity(isMobile ? 20 : 100);
    };

    updateParticleQuantity();
    window.addEventListener("resize", updateParticleQuantity);

    return () => {
      clearInterval(colorInterval);
      window.removeEventListener("resize", updateParticleQuantity);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen flex-col w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-[#0F0F0F] to-[#1C1C1C] p-20 md:shadow-xl"
    >
      <div
        className="absolute inset-0 pointer-events-none bg-repeat bg-[length:100%_4px] z-50 mix-blend-overlay opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 50%, rgba(124, 9, 255, 0.5) 50%)",
        }}
      />

      <div className="z-10 flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <p
            ref={glitch.ref}
            className={`whitespace-pre-wrap text-center text-7xl md:text-9xl font-black ${hero.className} 
                        bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary
                        [text-shadow:_2px_2px_10px_rgb(124_9_255_/_50%)]`}
          >
            Paradoxia
          </p>

          <div className="absolute -left-4 top-1/2 w-8 h-[2px] bg-[#7c09ff] opacity-70 animate-pulse" />
          <div className="absolute -right-4 top-1/2 w-8 h-[2px] bg-[#7c09ff] opacity-70 animate-pulse" />
        </div>

        <div className="relative">
          <p
            className={`whitespace-pre-wrap text-center text-2xl md:text-5xl font-bold ${display.className} 
                        animate-pulse relative`}
          >
            TECH IN MOMENTUM
          </p>
          <p
            className={`whitespace-pre-wrap text-center text-2xl md:text-3xl mt-5 font-bold ${display.className} 
                         relative`}
          >
            LAUNCH DAY - 19th November, 2024
          </p>

          <div className="absolute -left-6 top-0 h-full w-[2px] bg-[#7c09ff] opacity-50" />
          <div className="absolute -right-6 top-0 h-full w-[2px] bg-[#7c09ff] opacity-50" />
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F0F] to-[#1C1C1C] opacity-80 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,9,255,0.1),transparent_50%)]" />
      </div>

      <AnimatedGridPattern
        numSquares={80}
        maxOpacity={0.3}
        duration={3}
        repeatDelay={1}
        className="text-[#7c09ff] animate-pulse"
      />

      <Particles
        className="absolute inset-0 z-0"
        quantity={particleQuantity}
        ease={50}
        color={color}
        refresh
      />
    </div>
  );
};

export default CyberpunkHero;
