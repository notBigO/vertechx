"use client";

import { display } from "@/app/layout";
import { VelocityScroll } from "./ui/scroll-based-velocity";

const Hero = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <VelocityScroll
        text="TECH IN MOMENTUM "
        default_velocity={5}
        className={`${display.className} text-center text-4xl font-bold drop-shadow-sm md:text-7xl md:leading-[5rem]`}
      />
    </div>
  );
};

export default Hero;
