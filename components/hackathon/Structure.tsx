"use client";

import React from "react";
import { motion } from "framer-motion";

const Structure = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
      },
    }),
  };

  const structureItems = [
    {
      icon: (
        <svg
          className="mx-auto"
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 1C10.85 1 1 10.85 1 23C1 35.15 10.85 45 23 45C35.15 45 45 35.15 45 23C45 10.85 35.15 1 23 1Z"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 12L28.5 21.5L39 23L28.5 24.5L23 34L17.5 24.5L7 23L17.5 21.5L23 12Z"
            fill="#D4D4D8"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Theme Based",
      description: (
        <p className="mt-5 text-base text-gray-600 font-pj">
          The theme will be disclosed at the venue on{" "}
          <strong>19th at 8:00 AM</strong>. After the announcement, participants
          will have a brief brainstorming session to plan their approach.
        </p>
      ),
      borderClass: "border-0 border-gray-200 md:border md:border-gray-200",
    },
    {
      icon: (
        <svg
          className="mx-auto"
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 23C1 10.85 10.85 1 23 1C35.15 1 45 10.85 45 23C45 35.15 35.15 45 23 45C10.85 45 1 35.15 1 23Z"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 11V23L31 19"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="23"
            cy="23"
            r="4"
            fill="#D4D4D8"
            stroke="#161616"
            strokeWidth="2"
          />
        </svg>
      ),
      title: "Stages",
      description: (
        <p className="mt-5 text-base text-gray-600 font-pj">
          The hackathon will be divided into <strong>3 stages</strong>. Each
          stage will consist of an agenda to be met.
        </p>
      ),
      borderClass: "border-0 border-gray-200 md:border md:border-gray-200",
    },
    {
      icon: (
        <svg
          className="mx-auto"
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 1C10.85 1 1 10.85 1 23C1 35.15 10.85 45 23 45C35.15 45 45 35.15 45 23C45 10.85 35.15 1 23 1Z"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 23H31L23 31L15 23Z"
            fill="#D4D4D8"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 15V31"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M31 15L23 23L15 15"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Presentation & Judging",
      description: (
        <p className="mt-5 text-base text-gray-600 font-pj">
          Each team will present their solution to the judging panel at{" "}
          <strong>4:30 PM</strong>. Teams are allotted{" "}
          <strong>5 minutes for presentation</strong>, followed by a
          <strong>5-minute Q&A session</strong> with the judges.
        </p>
      ),
      borderClass: "border-0 border-gray-200 md:border md:border-gray-200",
    },
    {
      icon: (
        <svg
          className="mx-auto"
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 1C10.85 1 1 10.85 1 23C1 35.15 10.85 45 23 45C35.15 45 45 35.15 45 23C45 10.85 35.15 1 23 1Z"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 19H31V27H15V19Z"
            fill="#D4D4D8"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M31 23H35C36.1046 23 37 22.1046 37 21V19C37 17.8954 36.1046 17 35 17H31"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 23H11C9.89543 23 9 22.1046 9 21V19C9 17.8954 9.89543 17 11 17H15"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Judging Panel",
      description: (
        <p className="mt-5 text-base text-gray-600 font-pj">
          The judging panel will include experienced professionals and academics
          from the software development and technology fields. They will ensure
          a fair evaluation based on predefined criteria.
        </p>
      ),
      borderClass: "border-0 border-gray-200 md:border md:border-gray-200",
    },
    {
      icon: (
        <svg
          className="mx-auto"
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 1C10.85 1 1 10.85 1 23C1 35.15 10.85 45 23 45C35.15 45 45 35.15 45 23C45 10.85 35.15 1 23 1Z"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 11L28 21H18L23 11Z"
            fill="#D4D4D8"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M31 31C33.2091 31 35 29.2091 35 27C35 24.7909 33.2091 23 31 23"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 31C12.7909 31 11 29.2091 11 27C11 24.7909 12.7909 23 15 23"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 35V31"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Of course there's prize money!",
      description: (
        <p className="mt-5 text-base text-gray-600 font-pj">
          First place gets <strong>₹25000</strong> and the second place gets{" "}
          <strong>₹15000</strong>. We do have special-mention prizes. Best idea
          gets <strong>₹5000</strong> and best implementation gets{" "}
          <strong>₹5000</strong>
        </p>
      ),
      borderClass: "border-0 border-gray-200 md:border md:border-gray-200",
    },
    {
      icon: (
        <svg
          className="mx-auto"
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 1C10.85 1 1 10.85 1 23C1 35.15 10.85 45 23 45C35.15 45 45 35.15 45 23C45 10.85 35.15 1 23 1Z"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35 23C35 29.6274 29.6274 35 23 35C16.3726 35 11 29.6274 11 23C11 16.3726 16.3726 11 23 11"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M31 11L35 7L39 11"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 17V23L27 27"
            stroke="#161616"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Venue and Date",
      description: (
        <p className="mt-5 text-base text-gray-600 font-pj">
          <strong>
            Auditorium backstage and corridor. 19th, starting at 8:00 AM
          </strong>
        </p>
      ),
      borderClass: "border-0 border-gray-200 md:border md:border-gray-200",
    },
  ];

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl xl:text-5xl font-pj">
            Ideate, Develop and Solve.
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 font-pj">
            Here's a general outlook of the hackathon
          </p>
        </div>

        <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
          {structureItems.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className={`md:p-8 lg:p-14 ${item.borderClass}`}
            >
              {item.icon}
              <h3 className="mt-12 text-xl font-bold text-primary font-pj">
                {item.title}
              </h3>
              {item.description}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Structure;
