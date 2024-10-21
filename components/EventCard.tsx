import Link from "next/link";
import React from "react";

const EventCard = () => {
  return (
    <Link
      className="bg-white rounded-xl overflow-hidden shadow-md w-72 h-96 flex flex-col"
      href="/"
    >
      <img
        src="/api/placeholder/320/160"
        alt="Event"
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex-grow flex flex-col bg-primary text-white rounded-t-2xl ">
        <div className="flex items-center mb-2">
          <div className="bg-[#933cfd] text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            DEC 24
          </div>
          <div className="text-xs truncate">Rajalakshmi Seminar Hall</div>
        </div>
        <h2 className="text-xl font-bold mb-2 truncate">Cyberbug</h2>
        <p className=" text-sm mb-4 flex-grow overflow-hidden">
          Decode the code challenge.
        </p>
        <div className="flex items-center  text-xs">
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
          Starts at 10:30
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
