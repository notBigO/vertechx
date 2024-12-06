import Image from "next/image";
import Placeholder from "@/assets/placeholder.jpg";
import { space } from "@/app/layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/client";
import RegisterButton from "@/components/RegisterButton";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";
import { Event } from "@prisma/client";

const getEventData = unstable_cache(
  async (slug: string) => {
    try {
      const event = await prisma.event.findUnique({
        where: { slug },
        select: {
          slug: true,
          title: true,
          description: true,
          poster_url: true,
          category: true,
          time: true,
          date: true,
          venue: true,
          firstPrize: true,
          secondPrize: true,
          registrationFee: true,
          rules: true,
          judgingCriteria: true,
          eventCoordinatorInfo: true,
        },
      });

      if (!event) {
        return null;
      }

      return event;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw new Error("Failed to fetch event data");
    }
  },
  ["event-data"],
  {
    revalidate: 60,
    tags: ["event-data"],
  }
);

export async function generateMetadata({ params }: { params: { id: string } }) {
  const eventData = await getEventData(params.id);

  if (!eventData) {
    return {
      title: "404 - Event not found",
    };
  }
  console.log("Event poster URL: ", eventData.poster_url);
  console.log("Event desc: ", eventData.description);
  return {
    title: eventData.title,
    description: eventData.description,
    openGraph: {
      title: eventData.title,
      description: eventData.description,
      images: [
        {
          url: eventData.poster_url ?? "/images/poster-sample.png",
          width: 1000,
          height: 1000,
          alt: "Event Poster",
        },
      ],
    },
  };
}

const EventSkeleton = () => (
  <div className="px-4 md:px-24 container mx-auto py-12">
    <div className="flex flex-col md:flex-row items-start justify-center gap-8">
      <div className="flex flex-col md:flex-row h-full justify-center items-start w-full gap-6 md:gap-16">
        <Skeleton className="w-full md:h-[400px] md:w-[400px] aspect-square rounded-lg" />

        <div className="flex flex-col basis-1/2 md:min-h-[400px] justify-between items-start w-full">
          <div className="flex flex-col gap-4 w-full">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>

          <div className="w-full md:w-[60%] mt-8 space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="h-6 w-[70%]" />

            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>

    <div className="md:w-[90%] mt-8 space-y-6">
      <Skeleton className="h-10 w-48" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[90%]" />
      </div>

      <Skeleton className="h-10 w-48 mt-8" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-[88%]" />
      </div>

      <Skeleton className="h-10 w-48 mt-8" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  </div>
);

const EventDetails = ({ eventData }: { eventData: any }) => (
  <main className="px-4 md:px-24 container mx-auto py-12 flex-col flex gap-6 items-center justify-center">
    <div className="flex flex-col md:flex-row items-start justify-center gap-8">
      <div className="flex flex-col md:flex-row h-full justify-center items-start w-full gap-6 md:gap-16">
        <div className="w-full md:h-[400px] md:w-[400px] aspect-square rounded-lg overflow-hidden relative hover:scale-105 transition duration-200">
          <Image
            src={eventData.poster_url ?? Placeholder}
            alt="Event"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="flex flex-col basis-1/2 md:min-h-[400px] justify-between items-start">
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
                {new Date(eventData.date).toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  timeZone: "Asia/Kolkata",
                })}{" "}
                - {eventData.time}
              </span>
            </h3>
            <p className="text-gray-300 font-satoshi text-lg leading-tight md:w-[60%]">
              {eventData.description}
            </p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="md:w-[90%] flex flex-col items-start overflow-hidden flex-wrap px-2 md:p-8 rounded-lg">
      <h1 className={`text-5xl mt-4 ${space.className} text-primary`}>
        Event Rules
      </h1>
      <p className="text-lg mt-5 text-wrap whitespace-pre">{eventData.rules}</p>
      <h1 className={`text-5xl mt-4 ${space.className} text-primary mt-6`}>
        Judging Criteria
      </h1>
      <p className="text-lg mt-5 text-wrap whitespace-pre">
        {eventData.judgingCriteria}
      </p>

      {eventData.eventCoordinatorInfo && (
        <>
          <h1 className={`text-5xl mt-4 ${space.className} text-primary mt-6`}>
            Event Coordinators
          </h1>
          <p className="text-gray-300 text-lg mt-5">
            {eventData.eventCoordinatorInfo}
          </p>
        </>
      )}
    </div>
  </main>
);

const EventPage = async ({ params }: { params: { id: string } }) => {
  const eventData = await getEventData(params.id);

  if (!eventData) {
    notFound();
  }

  return (
    <Suspense fallback={<EventSkeleton />}>
      <EventDetails eventData={eventData} />
    </Suspense>
  );
};

export default EventPage;
