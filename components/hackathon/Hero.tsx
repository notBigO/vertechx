"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-30 pointer-events-none"></div>

      <div className="absolute inset-0 bg-grid-white/5 opacity-50 pointer-events-none"></div>

      <motion.div
        className="absolute inset-0 border-4 border-primary/30 pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 10px rgba(var(--color-primary), 0.3)",
            "0 0 20px rgba(var(--color-primary), 0.5)",
            "0 0 10px rgba(var(--color-primary), 0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <section className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              The Mega Event
            </span>
            <br />
            <span className="text-4xl md:text-6xl text-white">
              8 Hour Hackathon
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Dive into an electrifying 8-hour coding marathon where innovation
            meets intensity. Push your limits, hack the impossible, and
            transform ideas into reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              href="#"
              className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-lg 
              hover:bg-secondary transition-all duration-300 
              hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
            >
              Register Now
              <svg
                className="w-6 h-6 ml-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-8 mt-16 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm">30+ Teams</span>
            </div>
            <div className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-sm">Theme-based</span>
            </div>
            <div className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm">Fast Paced!</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
