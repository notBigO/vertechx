import React from "react";
import SectionHeader from "./SectionHeader";

const TeaserSection = () => {
  return (
    <section className="relative py-20 px-6 bg-[#0F0F0F] text-white">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div
          className="h-full w-full bg-[linear-gradient(#7c09ff_1px,_transparent_1px),_linear-gradient(90deg,_#7c09ff_1px,_transparent_1px)]"
          style={{ backgroundSize: "20px 20px" }}
        />
      </div>

      <div className="container mx-auto">
        <SectionHeader title="Here's a glimpse!" />

        <div className="relative w-full max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-primary opacity-75 blur-sm animate-pulse" />

          <div className="relative bg-black p-4 rounded-lg">
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary" />

            <div className="relative rounded-lg overflow-hidden w-full pb-[42.85%]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none z-10" />
              <video
                autoPlay
                muted
                controls
                playsInline
                loop
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source
                  src="https://pub-ad7b9dfb5d1942639c6f3b5196e947c8.r2.dev/glimpse.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeaserSection;
