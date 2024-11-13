"use client";

import React from "react";

import Image from "next/image";

const ThemeSection = () => {
  return (
    <section className="relative py-20 px-6 bg-[#0F0F0F] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 border-t border-primary/30 animate-slide-1" />
        <div className="absolute inset-0 border-t border-primary/30 animate-slide-2" />
        <div className="absolute inset-0 border-t border-primary/30 animate-slide-3" />
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-video">
              <Image
                src="/api/placeholder/800/450"
                alt="Paradoxia Theme"
                fill
                className="object-cover rounded-lg"
              />

              <div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent 
                              mix-blend-overlay"
              />
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <h3 className="text-2xl font-bold text-primary">Theme 2024</h3>
            <p className="text-gray-300 leading-relaxed">
              Paradoxia explores the beautiful contradiction in innovation,
              where chaos meets order, and traditional methods blend with
              cutting-edge technology. This theme challenges participants to
              think beyond conventional boundaries and embrace the power of
              paradoxical thinking in technological advancement.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <span className="text-primary">⚡</span>
                <span className="text-gray-300">
                  Technical Workshops on Balancing Chaos and Order
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary">⚡</span>
                <span className="text-gray-300">
                  Innovation through Contradictory Approaches
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary">⚡</span>
                <span className="text-gray-300">
                  Blending Traditional and Modern Technologies
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeSection;
