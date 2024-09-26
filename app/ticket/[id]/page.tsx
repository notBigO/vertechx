import Ticket from "@/components/Ticket";

const TicketPage = () => {
  return (
    <div className="h-screen container mx-auto flex items-center justify-center relative px-3 md:px-0">
      {/* <Image
        src={CPU}
        alt="CPU"
        width={30}
        height={30}
        className="absolute top-10 left-10 rotate-6"
      /> */}

      <div className="flex justify-start flex-col">
        <h1 className="text-lg md:text-lg uppercase font-bold">
          Your Ticket is <span className="text-primary">Ready</span>
        </h1>
        {/* <h3>
          Please check back in later to review your ticket's payment
          confirmation status.
        </h3> */}
        <h3 className="text-sm md:text-base">
          Please make sure to get this ticket scanned at the entrance of the
          venue to check in.
        </h3>

        <Ticket />
      </div>
    </div>
  );
};

export default TicketPage;
