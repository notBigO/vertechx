import React from "react";

const Timeline = () => {
  return (
    <section className="py-10 bg-[#0B0410] text-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            3 stages, 3 steps to winning this!
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-whitef">
            The hackathon will be divided into 3 stages.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <img
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt=""
            />
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 1 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-primary md:mt-10">
                First Phase (8:30 AM - 11:00 AM)
              </h3>
              <p className="mt-4 text-base text-white">
                Participants must define a clear idea and start building the
                foundation. Those who fail to establish a clear base for their
                project will be disqualified at this stage.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 2 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-primary md:mt-10">
                Second Phase (11:00 AM - 1:30 PM)
              </h3>
              <p className="mt-4 text-base text-white">
                Teams must complete at least the initial half of their idea,
                with visible progress.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 3 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-primary md:mt-10">
                Third Phase (1:30 PM - 4:30 PM)
              </h3>
              <p className="mt-4 text-base text-white">
                Teams finalize and polish their implementations to reach the
                final output by the end of the 8-hour period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
