import React from "react";
import { space } from "../layout";
import { categories } from "@/lib/constants";
import Link from "next/link";
import { redirect } from "next/navigation";
import EventCard from "@/components/EventCard";

const EventsPage = ({ searchParams }: { searchParams: any }) => {
  let selectedCategory: any;
  let eventsData;

  if (searchParams.category == undefined) {
    selectedCategory = "All Events";
    redirect(`/events?category=${selectedCategory}`);
  } else if (categories.includes(searchParams.category)) {
    selectedCategory = searchParams.category;
  }

  return (
    <div
      className={`${space.className} flex flex-col h-screen w-screen items-center mt-16 text-4xl text-primary`}
    >
      <h1>Explore Events</h1>

      <div className="mt-7 flex flex-row w-screen px-4 py-2 justify-start md:justify-center flex-nowrap overflow-x-scroll md:overflow-x-hidden">
        {categories &&
          categories.map((category) => (
            <Link
              href={`/events?category=${category}`}
              key={category}
              className={`px-3 text-lg py-1 text-white   text-nowrap  cursor-pointer backdrop-blur-sm rounded-xl m-2 border border-primary  ${
                category === selectedCategory ? "bg-primary" : ""
              }`}
            >
              {category}
            </Link>
          ))}
      </div>

      <div className="">
        <EventCard />
      </div>
    </div>
  );
};

export default EventsPage;
