import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@prisma/client";

const EventCard = ({ eventData }: { eventData: Event }) => {
  const formattedDate = eventData.date
    ? new Date(eventData.date).toLocaleDateString("en", {
        month: "long",
        day: "numeric",
        timeZone: "Asia/Kolkata",
      })
    : "Date not available";

  return (
    <Link
      className="rounded-xl overflow-hidden shadow-md w-72 flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-lg"
      href={`/events/${eventData.slug}`}
    >
      <div className="w-full relative aspect-square">
        <Image
          src={eventData.poster_url}
          alt={`${eventData.title} poster`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
          priority
        />
      </div>
      <div className="p-4 flex-grow flex flex-col bg-primary text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-[#933cfd] text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {formattedDate}
          </span>
          <span className="text-xs truncate">{eventData.venue}</span>
        </div>
        <h2 className="text-xl font-bold mb-2 line-clamp-2">
          {eventData.title}
        </h2>
        <p className="text-sm mb-4 flex-grow line-clamp-3">
          {eventData.description}
        </p>
        <div className="flex items-center text-xs text-gray-100">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Starts at {eventData.time}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
