"use client";

import React from "react";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";

const ParadoxiaSection = () => {
  return (
    <motion.section
      className="relative py-20 px-6 bg-[#0F0F0F] overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div
          className="h-full w-full bg-[linear-gradient(#7c09ff_1px,_transparent_1px),_linear-gradient(90deg,_#7c09ff_1px,_transparent_1px)]"
          style={{ backgroundSize: "20px 20px" }}
        />
      </div>
      <div className="relative container mx-auto max-w-3xl text-center space-y-8">
        <SectionHeader title="About Paradoxia" />
        <p className="text-gray-300 leading-relaxed text-lg">
          This year, VertechX introduces{" "}
          <span className="text-primary font-semibold">Paradoxia</span>—a
          journey through the unexpected intersections between expectation and
          reality. Paradoxia invites participants to explore how opposites like
          order and chaos, simplicity and complexity, coexist in surprising
          harmony, sparking new pathways for innovation.
        </p>
        <p className="text-gray-300 leading-relaxed text-lg">
          Through interactive workshops on paradoxical technology and
          competitions that blend simplicity with complexity, VertechX
          encourages creative minds to break boundaries and uncover the
          potential in opposing ideas.
        </p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="border border-primary/30 rounded-lg p-6 text-center bg-black/30 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-primary">
              Innovative Workshops
            </h3>
            <p className="text-sm text-gray-400">
              Explore paradoxical technology and systems that bridge real and
              virtual applications.
            </p>
          </div>
          <div className="border border-primary/30 rounded-lg p-6 text-center bg-black/30 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-primary">Competitions</h3>
            <p className="text-sm text-gray-400">
              Participate in paradox-themed hackathons, robotics challenges, and
              coding contests.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ParadoxiaSection;
