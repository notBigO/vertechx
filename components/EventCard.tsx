import { Event } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      className="bg-white rounded-xl overflow-hidden shadow-md w-72 h-96 flex flex-col"
      href="/"
    >
      <div className="w-full h-40 relative">
        <Image
          src={eventData.poster_url}
          alt="Event"
          layout="fill"
          objectFit="fit"
          className="rounded-t-xl"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col bg-primary text-white">
        <div className="flex items-center mb-2">
          <div className="bg-[#933cfd] text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {formattedDate}
          </div>
          <div className="text-xs truncate">{eventData.venue}</div>
        </div>
        <h2 className="text-xl font-bold mb-2 truncate">{eventData.title}</h2>
        <p className="text-sm mb-4 flex-grow overflow-hidden">
          {eventData.description}
        </p>
        <div className="flex items-center text-xs">
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
