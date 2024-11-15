import React from "react";

import SectionHeader from "./SectionHeader";

const AboutSection = () => {
  return (
    <section
      // <section
      className="relative py-20 px-6 bg-[#0F0F0F]"
    >
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div
          className="h-full w-full bg-[linear-gradient(#7c09ff_1px,_transparent_1px),_linear-gradient(90deg,_#7c09ff_1px,_transparent_1px)]"
          style={{ backgroundSize: "20px 20px" }}
        />
      </div>
      <div className="container mx-auto">
        <SectionHeader title="VertechX 12.0" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* <motion.div */}
          <div className="space-y-6">
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
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border border-primary/30 rounded-lg p-4 text-center bg-black/30">
                <h3 className="text-3xl font-bold text-primary">2500+</h3>
                <p className="text-sm text-gray-400">Participants</p>
              </div>
              <div className="border border-primary/30 rounded-lg p-4 text-center bg-black/30">
                <h3 className="text-3xl font-bold text-primary">200+</h3>
                <p className="text-sm text-gray-400">Colleges</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-4 rounded-lg overflow-hidden">
              {/* <Image
                src={Placeholder}
                alt="VertechX Event"
                fill
                className="object-cover rounded-lg"
              /> */}
              <video
                src="https://res.cloudinary.com/dqddav9jj/video/upload/v1731608885/videos/vxynmjipei0dsnrng0of.mp4"
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-full object-fit"
              ></video>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan" />
            </div>
          </div>
        </div>
      </div>
    </section>
    // </motion.section>
  );
};

export default AboutSection;
