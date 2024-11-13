"use client";

import { useGlitch } from "react-powerglitch";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { orbitron, space } from "@/app/layout";
const Glitch = () => {
  const glitch = useGlitch();
  //   return <Image src={Logo} ref={glitch.ref} alt="image" />;
  return (
    <h1
      ref={glitch.ref}
      className={`${space.className} text-7xl font-bold text-primary`}
    >
      Paradoxia
    </h1>
  );
};

export default Glitch;
