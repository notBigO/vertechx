import Ticket from "@/components/Ticket";
import React from "react";

const TicketPage = () => {
  return (
    <div className="h-screen container mx-auto flex items-center justify-center">
      <div className="flex justify-start flex-col">
        <h1 className="text-xl uppercase font-medium">
          Your Ticket is <span className="text-heading">Ready</span>
        </h1>
        {/* <h3>
          Please check back in later to review your ticket's payment
          confirmation status.
        </h3> */}
        <h3>
          Please make sure to get this ticket scanned at the entrance of the
          venue to check in.
        </h3>

        <Ticket />
      </div>
    </div>
  );
};

export default TicketPage;
