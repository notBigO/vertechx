import React, { Suspense } from "react";
import { space } from "../layout";
import { categories } from "@/lib/constants";
import Link from "next/link";
import { redirect } from "next/navigation";
import EventCard from "@/components/EventCard";
import prisma from "@/lib/client";
import { unstable_cache } from "next/cache";
import { Event } from "@prisma/client";

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
  }
  // ["events-data"],
  // { revalidate: 60 }
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
      className={`${space.className} flex flex-col h-full w-full items-center mt-16 text-4xl text-primary`}
    >
      <h1>Explore Events</h1>

      <div className="w-full overflow-x-auto mb-6 sm:mb-8 mt-10">
        <div
          className="
            flex 
            justify-start 
            md:justify-center 
            items-center
            space-x-2 
            pb-2 
            mx-auto 
            max-w-4xl
            snap-x 
            scroll-smooth
          "
        >
          {categories.map((category) => (
            <Link
              href={`/events?category=${category}`}
              key={category}
              className={`flex items-center justify-center px-4 sm:px-5 py-2 min-w-[90px] sm:min-w-[100px] md:min-w-[120px] text-xs sm:text-sm md:text-base whitespace-nowrap rounded-xl transition-colors duration-200 text-center snap-start ${
                category === selectedCategory
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-primary/10"
              }`}
              prefetch={false}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <Suspense fallback={<div>Loading events...</div>}>
        <div
          className="
            w-full 
            px-4 
            py-7
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-4 
            justify-items-center
          "
        >
          {eventsData.length > 0 ? (
            eventsData.map((event) => (
              <EventCard key={event.id} eventData={event} />
            ))
          ) : (
            <div className="col-span-full text-center text-xl text-gray-500">
              No events found
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default EventsPage;
