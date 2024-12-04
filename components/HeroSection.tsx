"use client";

import React, { useState, useEffect, memo } from "react";
import { useGlitch } from "react-powerglitch";
import Particles from "./ui/particles";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { display, hero } from "@/app/layout";

const Hero = memo(function CyberpunkHero() {
  const glitch = useGlitch({
    timing: { duration: 4000, iterations: Infinity },
    slice: { count: 6, velocity: 15, minHeight: 0.02, maxHeight: 0.15 },
  });

  const [color, setColor] = useState("#7c09ff");
  const [particleQuantity, setParticleQuantity] = useState(100);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }, 1000);

    const updateParticleQuantity = () => {
      setParticleQuantity(window.innerWidth <= 768 ? 20 : 100);
    };
    updateParticleQuantity();
    window.addEventListener("resize", updateParticleQuantity);

    return () => {
      clearInterval(colorInterval);
      window.removeEventListener("resize", updateParticleQuantity);
    };
  }, []);

  return (
    <div className="relative flex h-screen flex-col w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-[#0F0F0F] to-[#1C1C1C] p-20 md:shadow-xl">
      <div className="absolute inset-0 pointer-events-none bg-repeat bg-[length:100%_4px] z-50 mix-blend-overlay opacity-10" />
      <div className="z-10 flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <p
            ref={glitch.ref}
            className={`text-7xl md:text-9xl font-black ${hero.className} bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary [text-shadow:_2px_2px_10px_rgb(124_9_255_/_50%)]`}
          >
            Paradoxia
          </p>
          <div className="absolute -left-4 top-1/2 w-8 h-[2px] bg-[#7c09ff] opacity-70 animate-pulse" />
          <div className="absolute -right-4 top-1/2 w-8 h-[2px] bg-[#7c09ff] opacity-70 animate-pulse" />
        </div>
        <div className="relative">
          <p
            className={`text-2xl md:text-5xl text-center font-bold ${display.className} animate-pulse relative`}
          >
            TECH IN MOMENTUM
          </p>
          <p
            className={`text-lg md:text-5xl md:mt-14 font-bold ${display.className}  relative`}
          >
            19th, 20th and 21st December, 2024
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
});

export default Hero;
