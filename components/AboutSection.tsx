import React from "react";
import SectionHeader from "./SectionHeader";

const AboutSection = () => {
  return (
    <section className="relative py-20 px-6 bg-[#0F0F0F]">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div
          className="h-full w-full bg-[linear-gradient(#7c09ff_1px,_transparent_1px),_linear-gradient(90deg,_#7c09ff_1px,_transparent_1px)]"
          style={{ backgroundSize: "20px 20px" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl">
        <SectionHeader title="VertechX 12.0" />

        <div className="flex flex-col items-center gap-12">
          <div className="relative w-full max-w-5xl">
            <div className="absolute -inset-1 bg-primary opacity-75 blur-sm animate-pulse" />

            <div className="relative bg-black p-4 rounded-lg">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary" />

              <div className="relative rounded-lg overflow-hidden w-full pb-[42.85%]">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none z-10" />
                <video
                  src="https://pub-ad7b9dfb5d1942639c6f3b5196e947c8.r2.dev/teaser.mp4"
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="max-w-3xl text-center space-y-6">
            <p className="text-gray-300 leading-relaxed">
              VertechX is the annual tech fest organized by MVJ College of
              Engineering in Bangalore, India, bringing together students and
              tech enthusiasts from diverse colleges and universities. This
              vibrant event provides a stage for participants to demonstrate
              their technical expertise and insights.
            </p>
            <p className="text-gray-300 leading-relaxed">
              VertechX 12.0 features a wide range of activities, including
              competitive events, hands-on workshops, and informative seminars
              across various technology domains, such as robotics, artificial
              intelligence, machine learning, and cybersecurity.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto pt-4">
              <div className="relative group">
                <div className="relative border border-primary/30 flex flex-col items-center justify-center rounded-lg p-4 text-center bg-black">
                  <h3 className="text-3xl font-bold text-primary">2500+</h3>
                  <p className="text-sm text-gray-400">Participants</p>
                </div>
              </div>

              <div className="relative group">
                <div className="relative border border-primary/30 rounded-lg p-4 text-center bg-black">
                  <h3 className="text-3xl font-bold text-primary">200+</h3>
                  <p className="text-sm text-gray-400">Colleges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
