"use client";

import React, { useState, useEffect } from "react";
import { useGlitch } from "react-powerglitch";
import Particles from "./ui/particles";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { display, hero } from "@/app/layout";

const CyberpunkHero = () => {
  const glitch = useGlitch();
  const [color, setColor] = useState("#7c09ff");
  const [particleQuantity, setParticleQuantity] = useState(100);

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
    <div className="relative flex h-full flex-col w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-[#0F0F0F] to-[#1C1C1C] p-20 md:shadow-xl">
      <div className="z-10 flex flex-col items-center justify-center space-y-8">
        <p
          ref={glitch.ref}
          className={`whitespace-pre-wrap text-center text-7xl md:text-9xl font-black ${hero.className} bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary`}
        >
          Paradoxia
        </p>
        <p
          className={`whitespace-pre-wrap text-center text-2xl md:text-5xl font-bold ${display.className} text-[${color}] animate-pulse`}
        >
          TECH IN MOMENTUM
        </p>
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0F0F0F] to-[#1C1C1C] opacity-80 blur-3xl"></div>

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
