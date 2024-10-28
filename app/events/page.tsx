import React, { Suspense } from "react";
import { space } from "../layout";
import { categories } from "@/lib/constants";
import Link from "next/link";
import { redirect } from "next/navigation";
import EventCard from "@/components/EventCard";
import prisma from "@/lib/client";
import { unstable_cache } from "next/cache";
import { Event } from "@prisma/client";

// Cached data fetching function for events
const getEventsData = unstable_cache(
  async (selectedCategory: string) => {
    return await prisma.event.findMany({
      where: {
        category:
          selectedCategory === "All Events" ? undefined : selectedCategory,
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

  let eventsData: any = [];
  try {
    eventsData = await getEventsData(selectedCategory);

    eventsData.sort((a: any, b: any) => {
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
      className={`${space.className} flex flex-col h-screen w-screen items-center mt-16 text-4xl text-primary`}
    >
      <h1>Explore Events</h1>

      <div className="mt-7 flex flex-row w-screen px-4 py-2 justify-start md:justify-center flex-nowrap overflow-x-scroll md:overflow-x-hidden">
        {categories.map((category) => (
          <Link
            href={`/events?category=${category}`}
            key={category}
            className={`px-3 text-lg py-1 text-white text-nowrap cursor-pointer backdrop-blur-sm rounded-xl m-2 border border-primary ${
              category === selectedCategory ? "bg-primary" : ""
            }`}
            prefetch={false}
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Event listing */}
      <Suspense fallback={<div>Loading events...</div>}>
        <div className="event-container flex flex-col items-center">
          {eventsData.length > 0 ? (
            eventsData.map((event: Event) =>
              event.category === "Mega Event" ? (
                <div key={event.id} className="mega-event-highlight">
                  Mega Event
                </div>
              ) : (
                <EventCard key={event.id} eventData={event} />
              )
            )
          ) : (
            <p>No events found</p>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default EventsPage;
