"use client";

import React from "react";
import SectionHeader from "./SectionHeader";
import Image from "next/image";
import MVJ from "@/assets/mvjcampus.webp";
import { motion } from "framer-motion";

const UniComponent = () => {
  return (
    <motion.section
      className="relative py-20 px-6 bg-[#0F0F0F]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto">
        <SectionHeader title="MVJ College of Engineering" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative aspect-square"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-4 rounded-lg overflow-hidden">
              <Image
                src={MVJ}
                alt="MVJ College of Engineering"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan" />
            </div>
          </motion.div>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-300 leading-relaxed">
              MVJ College of Engineering, located in Bangalore, India, is a
              premier institution dedicated to excellence in engineering and
              technology education. Established with a vision to foster
              innovation and research, MVJ offers a range of undergraduate and
              postgraduate programs in engineering, supported by
              state-of-the-art facilities and experienced faculty.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Known for its vibrant campus life and emphasis on holistic
              development, MVJ College provides students with opportunities for
              academic growth, technical skill-building, and industry exposure.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border border-primary/30 rounded-lg p-4 text-center flex items-center flex-col justify-center bg-black/30">
                <h3 className="text-2xl font-bold text-primary">10,000+</h3>
                <p className="text-sm text-gray-400">Students</p>
              </div>
              <div className="border border-primary/30 rounded-lg p-4 text-center bg-black/30">
                <h3 className="text-3xl font-bold text-primary">35+</h3>
                <p className="text-sm text-gray-400">Years of Excellence</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default UniComponent;
