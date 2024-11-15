import React from "react";
import SectionHeader from "./SectionHeader";

const TeaserSection = () => {
  return (
    <section className="relative py-20 px-6 bg-[#0F0F0F] text-white">
      <div className="container mx-auto">
        <SectionHeader title="Here's a glimpse!" />

        <div className="relative w-full max-w-3xl mx-auto">
          <div className="aspect-video rounded-lg overflow-hidden">
            <video
              autoPlay
              muted
              controls
              playsInline
              loop
              className="w-full h-full object-cover"
            >
              <source
                src="https://res.cloudinary.com/dqddav9jj/video/upload/v1731606505/videos/egtaeqdorgqt6lbxldsl.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeaserSection;
