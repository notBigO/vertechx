"use client";

import React from "react";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";
import MVJ from "@/assets/mvj.webp";
import Image from "next/image";

const SponsorSection = () => {
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
        <SectionHeader title="Our Sponsor" />
        <div className="flex justify-center items-center">
          <Image
            src={MVJ}
            alt="MVJ Logo"
            width={500}
            height={50}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default SponsorSection;
