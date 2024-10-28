import Image from "next/image";
import Placeholder from "@/assets/placeholder.jpg";
import { space } from "@/app/layout";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/client";
import RegisterButton from "@/components/RegisterButton";

export async function generateMetadata({ params }: { params: any }) {
  const { id } = params;
  let eventData;
  try {
    eventData = await prisma.event.findUnique({
      where: {
        slug: id,
      },
    });
  } catch (error) {
    console.error(error);
  }
  if (!eventData) {
    return {
      title: "404 - Event not found",
    };
  }
  return {
    title: eventData.title,
    description: eventData.description,
    images: [
      {
        url: eventData.poster_url
          ? eventData.poster_url
          : "/images/poster-sample.png",
        width: 1000,
        height: 1000,
        alt: "Event Poster",
      },
    ],
  };
}

const EventPage = async ({ params }: { params: any }) => {
  const { id } = params;
  let eventData;
  try {
    eventData = await prisma.event.findUnique({
      where: {
        slug: id,
      },
    });
  } catch (error) {
    console.error(error);
  }
  if (!eventData) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <h1 className="text-2xl md:text-5xl">
          Event not found. Please go back
        </h1>
      </div>
    );
  }
  return (
    <main className="px-4 md:px-24 container mx-auto py-12 flex-col flex gap-6 items-center justify-center">
      <div className="flex flex-col md:flex-row items-start justify-center gap-8">
        <div className="flex flex-col md:flex-row h-full justify-center items-start w-full gap-6 md:gap-16 ">
          <div className="w-full md:h-[400px] md:w-[400px] aspect-square rounded-lg overflow-hidden relative hover:scale-105 transition duration-200">
            <Image
              src={eventData.poster_url ? eventData.poster_url : Placeholder}
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
                {eventData.title}
              </h1>
              <h3 className="text-primary text-lg md:text-xl mb-4 mt-4">
                {eventData.category}
                <span className="text-gray-300 text-md">
                  {" | "}
                  {new Date().toLocaleDateString("en", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "Asia/Kolkata",
                  })}{" "}
                  - {eventData.time}
                </span>
              </h3>
              <p className="text-gray-300 font-satoshi text-lg leading-tight md:w-[60%]">
                {eventData.description}
              </p>
              <div className="flex flex-row gap-1 items-center md:mt-1"></div>
            </div>
            <div className="w-full md:w-[60%] mt-4 flex flex-col items-start">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row gap-1 items-center text-white">
                  <span className="text-gray-400 font-satoshi text-md">
                    Venue : {eventData.venue}
                  </span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <span className="text-gray-400 font-satoshi text-md">
                    1st Prize :{" "}
                    <span className="text-lg text-white font-semibold">
                      {eventData.firstPrize}
                    </span>
                  </span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <span className="text-gray-400 font-satoshi text-md">
                    2nd Prize :{" "}
                    <span className="text-lg text-white font-semibold">
                      {eventData.secondPrize}
                    </span>
                  </span>
                </div>
                <RegisterButton
                  slug={eventData.slug}
                  registrationFee={eventData.registrationFee}
                />
                {/* <Button className="w-full mt-4 bg-primary">Register</Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[90%] flex flex-col items-start overflow-hidden flex-wrap  px-2 md:p-8 rounded-lg">
        <h1 className={`text-5xl mt-4 ${space.className} text-primary`}>
          Event Rules
        </h1>
        <p className="text-lg mt-5 text-wrap whitespace-pre">{`${eventData.rules}`}</p>
        <h1 className={`text-5xl mt-4 ${space.className} text-primary mt-6`}>
          Judging Criteria
        </h1>
        <p className="text-lg mt-5 text-wrap whitespace-pre">{`${eventData.judgingCriteria}`}</p>

        {eventData.eventCoordinatorInfo && (
          <>
            <h1
              className={`text-5xl mt-4 ${space.className} text-primary mt-6`}
            >
              Event Coordinators
            </h1>
            <p className=" text-gray-300 text-lg mt-5">{`${eventData.eventCoordinatorInfo}
          `}</p>
          </>
        )}
      </div>
    </main>
  );
};

export default EventPage;
