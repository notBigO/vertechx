import React, { Suspense } from "react";
import { space } from "../layout";
import Link from "next/link";
import { redirect } from "next/navigation";
import EventCard from "@/components/EventCard";
import prisma from "@/lib/client";
import { unstable_cache } from "next/cache";
import { Event } from "@prisma/client";
import ShineBorder from "@/components/ui/shine-border";
import MegaEventDisplay from "@/components/hackathon/MegaEventDisplay";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const categories = [
  "All Events",
  "CSE",
  "ISE",
  "ECE",
  "AS/AE",
  "EEE",
  "ME",
  "CV",
  "CH",
  "AI",
  "DS",
];

const getEventsData = unstable_cache(
  async (selectedCategory: string) => {
    return await prisma.event.findMany({
      where: {
        category:
          selectedCategory !== "All Events"
            ? { equals: selectedCategory }
            : undefined,
      },
    });
  },
  ["events-data"],
  { revalidate: 60 }
);

const EventsPage = async ({ searchParams }: { searchParams: any }) => {
  let selectedCategory = searchParams.category ?? "All Events";

  if (!categories.includes(selectedCategory)) {
    selectedCategory = "All Events";
    redirect(`/events?category=${selectedCategory}`);
  }

  let eventsData: Event[] = [];
  try {
    eventsData = await getEventsData(selectedCategory);

    eventsData.sort((a, b) => {
      if (a.category === "Mega Event" && b.category !== "Mega Event") {
        return -1;
      } else if (a.category !== "Mega Event" && b.category === "Mega Event") {
        return 1;
      } else {
        return 0;
      }
    });
  } catch (error) {
    console.error("Error fetching events data:", error);
  }

  return (
    <div
      className={` flex flex-col h-full w-full items-center mt-16 text-4xl text-primary`}
    >
      <h1>Explore Events</h1>

      <div className="w-full px-2 lg:px-0">
        <ShineBorder
          className="relative bg-black p-10 text-white gap-3 overflow-hidden shadow-lg w-full max-w-7xl mx-auto flex flex-col items-start mt-10"
          color={["#7c09ff", "#c04cff", "#FFBE7B"]}
        >
          <h1 className={`${space.className} text- text-primary`}>
            Looking for the Mega Event?
          </h1>
          <h1 className="text-sm">
            Bring your team mates along and take on the challenge!
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-10 w-full">
            <Image
              src="https://pub-ad7b9dfb5d1942639c6f3b5196e947c8.r2.dev/hackathon.png"
              width={200}
              height={200}
              alt="megaevent"
              className="mt-10"
            />
            <div className="flex flex-col justify-start">
              <h1 className={`${space.className}  text-primary font-bold`}>
                8-Hour Software Hackathon
              </h1>
              <h1 className="text-sm">
                19th December, 2024 | MVJ College of Engineering
              </h1>
              <Button className="bg-primary hover:bg-secondary mt-5">
                <Link href={"/hackathon"} className="text-white">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </ShineBorder>
      </div>

      <div className={`w-full mt-10 ${space.className}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-full xl:flex md:items-center md:justify-center overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-max pb-4">
              {categories.map((category) => (
                <Link
                  href={`/events?category=${category}`}
                  key={category}
                  className={`
                    px-4 py-2
                    rounded-xl
                    text-sm
                    min-w-[100px]
                    text-center
                    transition-colors
                    duration-200
                    ${
                      category === selectedCategory
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-secondary hover:text-white"
                    }
                  `}
                  prefetch={false}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading events...</div>}>
        <div className="w-full px-4 py-7 flex items-center">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {eventsData.length > 0 ? (
                eventsData.map((event) => (
                  <EventCard key={event.id} eventData={event} />
                ))
              ) : (
                <div className="col-span-full h-screen text-center text-xl text-gray-500">
                  No events found
                </div>
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default EventsPage;
