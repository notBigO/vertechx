import Image from "next/image";
import Placeholder from "@/assets/placeholder.jpg";
import { space } from "@/app/layout";
import { Button } from "@/components/ui/button";

const EventPage = () => {
  let eventData;
  return (
    <main className="px-4 md:px-24 container mx-auto py-12 flex-col flex gap-6 items-center justify-center">
      <div className="flex flex-col md:flex-row items-start justify-center gap-8">
        <div className="flex flex-col md:flex-row h-full justify-center items-start w-full gap-6 md:gap-16 ">
          <div className="w-full md:h-[400px] md:w-[400px] aspect-square rounded-lg overflow-hidden relative hover:scale-105 transition duration-200">
            <Image
              src={Placeholder}
              alt="Event"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex  flex-col basis-1/2 md:min-h-[400px] justify-between items-start">
            <div className="flex-col justify-start items-start">
              <h1
                className={`text-4xl md:text-5xl ${space.className} text-primary font-bold`}
              >
                Cyberbug - Decode the code challenge
              </h1>
              <h3 className="text-primary text-lg md:text-xl mb-4 mt-4">
                CSE
                <span className="text-gray-300 text-md">
                  {" | "}
                  {new Date().toLocaleDateString("en", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "Asia/Kolkata",
                  })}{" "}
                  - 23:00
                </span>
              </h3>
              <p className="text-gray-300 font-satoshi text-lg leading-tight md:w-[60%]">
                Come with a team of 4, find and fix bugs in code. Come with a
                team of 4, find and fix bugs in code.
              </p>
              <div className="flex flex-row gap-1 items-center md:mt-1"></div>
            </div>
            <div className="w-full md:w-[60%] mt-4 flex flex-col items-start">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row gap-1 items-center text-white">
                  <span className="text-gray-400 font-satoshi text-md">
                    Venue : MVJCE
                  </span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <span className="text-gray-400 font-satoshi text-md">
                    1st Prize :{" "}
                    <span className="text-lg text-white font-semibold">
                      First Prize
                    </span>
                  </span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <span className="text-gray-400 font-satoshi text-md">
                    2nd Prize :{" "}
                    <span className="text-lg text-white font-semibold">
                      Second Prize
                    </span>
                  </span>
                </div>
                {/* <RegisterButton
                  slug={eventData.slug}
                  registrationFee={eventData.registrationFee}
                /> */}
                <Button className="w-full mt-4">Register</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[90%] flex flex-col items-start overflow-hidden flex-wrap  px-2 md:p-8 rounded-lg">
        <h1 className={`text-5xl mt-4 ${space.className} text-primary`}>
          Event Rules
        </h1>
        <p className="text-lg mt-5">
          Rule <br />
          Rule <br />
          Rule <br />
          Rule <br />
          Rule <br />
          Rule <br />
          Rule <br />
        </p>
        <h1 className={`text-5xl mt-4 ${space.className} text-primary mt-6`}>
          Judging Criteria
        </h1>
        <p className="text-lg mt-5">
          Criteria <br />
          Criteria <br />
          Criteria <br />
          Criteria <br />
          Criteria <br />
          Criteria <br />
        </p>

        <h1 className={`text-5xl mt-4 ${space.className} text-primary mt-6`}>
          Event Coordinators
        </h1>
        <p className="text-lg mt-5">
          Coordinator <br />
          Coordinator <br />
        </p>
      </div>
    </main>
  );
};

export default EventPage;
