import React from "react";

const Hero = () => {
  return (
    <div className=" relative">
      <section className="relative lg:min-h-[1000px] pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pb-24">
        <div className="absolute inset-x-0 bottom-0 z-10 hidden lg:flex">
          <img
            className="hidden w-full lg:block"
            src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards.png"
            alt="Credit Cards Desktop"
          />
          <img
            className="block w-full lg:hidden"
            src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards-mobile.png"
            alt="Credit Cards Mobile"
          />
        </div>

        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl font-black sm:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                The Mega Event
                <br />8 Hour Hackathon
              </span>
            </h1>
            <p className="mt-5 text-base text-white sm:text-xl">
              Ready to take on some of the toughest and fast-paced coding
              challenges with your friends? This 8 hour long hackathon is just
              the right event for you!
            </p>

            <a
              href="#"
              className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-primary rounded-lg sm:mt-16 hover:bg-secondary focus:bg-secondary"
            >
              Register Now
              <svg
                className="w-6 h-6 ml-8 -mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>

            <div className="grid grid-cols-1 px-20 mt-12 text-left gap-x-12 gap-y-8 sm:grid-cols-3 sm:px-0">
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0"
                  width="31"
                  height="25"
                  viewBox="0 0 31 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG path data */}
                </svg>
                <p className="ml-3 text-sm text-white">30+ Teams!</p>
              </div>

              <div className="flex items-center">
                <svg
                  className="flex-shrink-0"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG path data */}
                </svg>
                <p className="ml-3 text-sm text-white">Theme-based</p>
              </div>

              <div className="flex items-center">
                <svg
                  className="flex-shrink-0"
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG path data */}
                </svg>
                <p className="ml-3 text-sm text-white">Faaast Paced!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
