"use client";
import { space } from "@/app/layout";
import { useGlitch } from "react-powerglitch";

const SectionHeader = ({ title }: { title: string }) => {
  // const glitch = useGlitch({
  //   timing: { duration: 4000 },
  //   slice: { count: 4 },
  // });

  return (
    <div className="relative mb-12">
      <h2
        // ref={glitch.ref}
        className={`${space.className} text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                   bg-gradient-to-r from-primary to-secondary`}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
