"use client";

import React from "react";
import Placeholder from "@/assets/vertechx_placeholder.jpg";
import Image from "next/image";
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

      <div className="container mx-auto">
        <SectionHeader title="VertechX 12.0" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed">
              VertechX 12.0 is a prestigious national intercollegiate technical
              event that brings together over 2,500 brilliant minds from 200
              colleges across the nation. This technical extravaganza features
              more than 30 cutting-edge competitions in domains like Robotics,
              Drone Technology, and Coding.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our vision for 2024 centers around fostering collaboration between
              students, educators, and industry professionals. Through the theme
              of Paradoxia, we explore the fascinating realm of contradictory
              innovation.
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
              <Image
                src={Placeholder}
                alt="VertechX Event"
                fill
                className="object-cover rounded-lg"
              />

              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent 
                              animate-scan"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
