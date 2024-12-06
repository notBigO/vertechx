"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiLightningBolt } from "react-icons/hi";
import ShineBorder from "@/components/ui/shine-border";

const MegaEventDisplay = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-black">
      <ShineBorder
        className="relative bg-gradient-to-r from-indigo-500 to-pink-500 p-12 rounded-2xl shadow-lg w-full max-w-3xl"
        color={["#7c09ff", "#c04cff", "#FFBE7B"]}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-5xl font-bold mb-4">
            Mega Event - 8 Hour Hackathon
          </h1>
          <div className="flex items-center justify-center">
            <HiLightningBolt className="text-6xl mr-4 animate-pulse" />
            <p className="text-2xl">
              Find out more{" "}
              <a
                href="/hackathon"
                className="text-indigo-400 hover:text-indigo-500 transition-colors"
              >
                here
              </a>
              !
            </p>
            <HiLightningBolt className="text-6xl ml-4 animate-pulse" />
          </div>
        </motion.div>
      </ShineBorder>
    </div>
  );
};

export default MegaEventDisplay;
