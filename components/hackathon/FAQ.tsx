"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Faq = () => {
  const [faq, setFaq] = useState([
    {
      question: "Rules and Regulations",
      answer: `
        <ul class="list-disc pl-5">
          <li><strong>Theme:</strong> Adherence to the theme announced on the day of the hackathon is mandatory.</li>
          <li><strong>Time Management:</strong> Development must be completed within the 8-hour limit.</li>
          <li><strong>Originality:</strong> Only original work developed during the event is acceptable.</li>
          <li><strong>Resources:</strong> 
            <ul class="list-disc pl-5">
              <li>Any programming language or tools can be used</li>
              <li>Internet access is provided</li>
              <li>Participants must bring their own devices</li>
            </ul>
          </li>
          <li><strong>Conduct:</strong> Professionalism and respect are expected towards everyone at the event.</li>
          <li><strong>Submission:</strong> 
            <ul class="list-disc pl-5">
              <li>Final submissions must be uploaded to GitHub by the end of the 8-hour period</li>
              <li>Hourly pushes are required</li>
              <li>Late submissions will not be accepted</li>
            </ul>
          </li>
          <li><strong>Judges' Decision:</strong> 
            <ul class="list-disc pl-5">
              <li>The judges' decision is final</li>
              <li>Any disputes must be reported to the event coordinator within 30 minutes after the results</li>
            </ul>
          </li>
        </ul>
      `,
      open: false,
    },
    {
      question: "What are the cash prizes?",
      answer: `
        <div class="space-y-4">
          <h3 class="font-bold">Main Prizes:</h3>
          <ul class="list-disc pl-5">
            <li><strong>First Place:</strong> ₹25,000</li>
            <li><strong>Second Place:</strong> ₹15,000</li>
          </ul>
          
          <h3 class="font-bold mt-4">Special Mention Prizes:</h3>
          <ul class="list-disc pl-5">
            <li><strong>Best Idea:</strong> ₹5,000</li>
            <li><strong>Best Implementation:</strong> ₹5,000</li>
          </ul>
          
          <p class="mt-4"><strong>Registration Fees:</strong> ₹600/- per team</p>
          
          <p class="text-sm italic">Note: All monetary prizes are in Indian Rupees (₹)</p>
        </div>
      `,
      open: false,
    },
    {
      question: "Who will be on the judging panel?",
      answer:
        "The judging panel will include experienced professionals and academics from the software development and technology fields. They will ensure a fair evaluation based on predefined criteria.",
      open: false,
    },
    {
      question: "What are the judging criteria?",
      answer: `
        <ul class="list-disc pl-5">
          <li><strong>Innovation:</strong> Creativity and originality of the solution.</li>
          <li><strong>Functionality:</strong> Technical quality and effectiveness of the solution.</li>
          <li><strong>Usability:</strong> User-friendliness and design.</li>
          <li><strong>Relevance:</strong> How well the solution addresses the theme.</li>
          <li><strong>Presentation:</strong> Clarity and effectiveness of the presentation.</li>
        </ul>`,
      open: false,
    },
    {
      question: "What happens in the first phase (8:30 AM - 11:00 AM)?",
      answer: `
        <p><strong>Focus:</strong> Idea Clarity and Foundation Building</p>
        <ul class="list-disc pl-5">
          <li><strong>Clarity of Idea (30%):</strong>
            <ul class="list-disc pl-5">
              <li>How well-defined is the problem the team is addressing?</li>
              <li>Is the proposed solution feasible and aligned with the theme?</li>
            </ul>
          </li>
          <li><strong>Initial Setup (40%):</strong>
            <ul class="list-disc pl-5">
              <li>Has the team successfully built the foundation of their software?</li>
              <li>Does the project have a clear structure (e.g., project framework, database setup)?</li>
            </ul>
          </li>
          <li><strong>Team Collaboration (30%):</strong>
            <ul class="list-disc pl-5">
              <li>Are team members working effectively and dividing tasks efficiently?</li>
            </ul>
          </li>
        </ul>
        <p><strong>Outcome:</strong> Teams failing to establish a clear base or demonstrate meaningful progress will be disqualified at this stage.</p>
      `,
      open: false,
    },
    {
      question: "What happens in the second phase (11:00 AM - 1:30 PM)?",
      answer: `
        <p><strong>Focus:</strong> Midpoint Progress and Functional Prototype</p>
        <ul class="list-disc pl-5">
          <li><strong>Progress Towards Completion (40%):</strong>
            <ul class="list-disc pl-5">
              <li>Is there visible and substantial progress on the project (e.g., working prototype or initial features)?</li>
              <li>Are the key functionalities halfway implemented?</li>
            </ul>
          </li>
          <li><strong>Functionality (30%):</strong>
            <ul class="list-disc pl-5">
              <li>Do the implemented features function as intended?</li>
              <li>Is there evidence of a working backend or user interface?</li>
            </ul>
          </li>
          <li><strong>Usability and Design (30%):</strong>
            <ul class="list-disc pl-5">
              <li>Does the project demonstrate a focus on user experience (e.g., intuitive design, navigation)?</li>
            </ul>
          </li>
        </ul>
        <p><strong>Outcome:</strong> Teams are expected to have a functional prototype. Those with minimal or unclear progress risk elimination.</p>
      `,
      open: false,
    },
    {
      question: "What happens in the third phase (1:30 PM - 4:30 PM)?",
      answer: `
        <p><strong>Focus:</strong> Final Product and Presentation</p>
        <ul class="list-disc pl-5">
          <li><strong>Completeness and Functionality (40%):</strong>
            <ul class="list-disc pl-5">
              <li>Is the software complete and does it perform all intended functions?</li>
              <li>Are there minimal bugs and smooth workflows?</li>
            </ul>
          </li>
          <li><strong>Innovation and Relevance to Theme (30%):</strong>
            <ul class="list-disc pl-5">
              <li>How creative and original is the solution?</li>
              <li>Does the project align well with the hackathon theme?</li>
            </ul>
          </li>
          <li><strong>Presentation and User Experience (30%):</strong>
            <ul class="list-disc pl-5">
              <li>How well did the team present their project (clear explanation, demo, and Q&A)?</li>
              <li>Is the final product user-friendly and visually appealing?</li>
            </ul>
          </li>
        </ul>
        <p><strong>Outcome:</strong> Final judging will determine the winners based on the quality and impact of their final solution.</p>
      `,
      open: false,
    },
  ]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const toggleFaq = (index) => {
    setFaq(
      faq.map((item, i) => {
        if (i === index) {
          item.open = !item.open;
        } else {
          item.open = false;
        }

        return item;
      })
    );
  };

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

  const itemVariants = {
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
    <section ref={ref} className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16"
        >
          {faq.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
            >
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                onClick={() => toggleFaq(index)}
              >
                <span className="flex text-lg font-semibold text-black">
                  {item.question}
                </span>

                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                    item.open ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${
                    item.open
                      ? "max-h-screen opacity-100 visible"
                      : "max-h-0 opacity-0 invisible"
                  } 
                  px-4 pb-5 sm:px-6 sm:pb-6
                `}
              >
                <div
                  className="text-primary"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-600 textbase mt-9"
        >
          Didn't find the answer you are looking for?{" "}
          <Link href="/contact" className="text-primary font-bold">
            Contact Us!
          </Link>
        </motion.p>
      </div>
    </section>
  );
};

export default Faq;
