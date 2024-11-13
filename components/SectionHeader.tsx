"use client";
import { useGlitch } from "react-powerglitch";

const SectionHeader = ({ title }: { title: string }) => {
  const glitch = useGlitch({
    timing: { duration: 4000 },
    slice: { count: 4 },
  });

  return (
    <div className="relative mb-12 text-center">
      <h2
        ref={glitch.ref}
        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                   bg-gradient-to-r from-primary to-secondary"
      >
        {title}
      </h2>
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 
                      bg-primary opacity-50"
      />
    </div>
  );
};

export default SectionHeader;
