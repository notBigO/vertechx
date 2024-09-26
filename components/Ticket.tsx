import { space } from "@/app/layout";
import React from "react";
import TicketBarcode from "./TicketBarcode";

const Ticket = () => {
  return (
    <>
      <div className="w-full bg-[#7c09ff] rounded-md flex flex-col gap-4 items-start px-7 py-2 mt-4">
        <div className="w-full flex items-center justify-between mt-4 gap-3 md:gap-0">
          <h1 className="border border-[#d3baba70] p-1 rounded-xl text-xs md:text-sm">
            Order Number: <span className="font-semibold">3H31LA</span>
          </h1>
          {/* <h3 className="border border-transparent p-1">
            Event Type: <span className="font-bold">Solo</span>
          </h3> */}
          <h1 className="text-xs md:text-sm">
            Venue: <span className="font-bold text-md">Thikkesh Paalya</span>
          </h1>
        </div>
        <div className="space-y-2 mt-3">
          <h3
            className={`${space.className} md:text-4xl text-3xl font-semibold`}
          >
            cyberbug
          </h3>
          <h3 className="md:text-lg text-base">Debug the Code.</h3>
        </div>

        <h1 className="mb-3 mt-4 text-xs md:text-sm">
          1 TICKET(S) x Rs.300 = <span className="font-bold">Rs.300</span>
        </h1>
      </div>

      <hr className="w-full border-dashed  mt-6" />

      <div className="text-center mt-6">
        <h1 className="font-bold">Friday, 27th December 2024</h1>
        <h1 className="font-light text-[#9c9c9c]">1:00 - 3:00 PM</h1>
      </div>
      <div className="w-ful flex items-center justify-between mt-6">
        <TicketBarcode />
      </div>
    </>
  );
};

export default Ticket;
