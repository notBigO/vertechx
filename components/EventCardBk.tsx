import { space } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EventCard = ({
  eventData,
  featured,
}: {
  eventData: any;
  featured: boolean;
}) => {
  return (
    <Link
      href={"/events/"}
      className={`flex cursor-pointer flex-col items-center rounded-xl w-[20rem] hover:scale-105 transition duration-500 bg-gray-400  p-2 backdrop-blur-sm hover:shadow-purple-600 shadow-xl ${
        featured
          ? "main-event basis-full bg-opacity-35 bg-gray-700 border-2 border-opacity-65 border-primary"
          : "bg-opacity-10 border-2 border-opacity-65 border-gray-600  hover:border-primary"
      }`}
    >
      <div className="w-full aspect-square rounded-lg overflow-hidden relative">
        {/* <Image
          src={eventData.poster_url}
          className="w-full rounded-md"
          fill
          alt="poster"
        /> */}
      </div>

      <div className="flex flex-col justify-center items-center">
        <h3
          className={`text-center leading-none tracking-wide text-primary text-2xl mt-3 text-wrap ${space.className}`}
        >
          Cyberbug
        </h3>
        <h3 className="font-satoshi  text-gray-400 text-base">Category</h3>
      </div>
    </Link>
  );
};

export default EventCard;
