"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const themes = [
  {
    title: "Smart Cities and Urban Innovation",
    description: "Solutions for sustainable and efficient urban living.",
  },
  {
    title: "Health and Wellness Tech",
    description: "Technology that improves physical and mental health.",
  },
  {
    title: "Environmental Sustainability",
    description: "Solutions for a greener, more sustainable future.",
  },
  {
    title: "EdTech and Remote Learning",
    description: "Improving education through technology.",
  },
  {
    title: "Financial Inclusion and Literacy",
    description: "Making financial services accessible to all.",
  },
  {
    title: "Disaster Preparedness and Emergency Response",
    description: "Tech for managing emergencies and disaster scenarios.",
  },
  {
    title: "Agriculture and Food Security",
    description:
      "Innovations to support sustainable farming and food distribution.",
  },
  {
    title: "Mental Health and Social Well-being",
    description: "Promoting mental health awareness and support.",
  },
  {
    title: "Access to Clean Water",
    description: "Solutions for ensuring clean and accessible water.",
  },
  {
    title: "Transportation and Mobility",
    description: "Improving accessibility and sustainability in transport.",
  },
  {
    title: "Smart Homes and IoT",
    description: "Making homes smarter, safer, and more efficient.",
  },
  {
    title: "Inclusive Design and Accessibility",
    description:
      "Tech that improves accessibility for individuals with disabilities.",
  },
];

const ThemesComponent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary mb-12"
        >
          Hackathon Themes
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {themes.map((theme, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="
                bg-white border-2 border-gray-200 rounded-lg p-6 
                transition-all duration-300 
                hover:shadow-xl hover:border-primary/50
              "
            >
              <h3 className="text-xl font-semibold text-primary mb-3">
                {theme.title}
              </h3>
              <p className="text-gray-600 mb-4">{theme.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ThemesComponent;
