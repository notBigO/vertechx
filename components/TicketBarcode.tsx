"use client";

import { useBarcode } from "next-barcode";

const TicketBarcode = () => {
  const { inputRef } = useBarcode({
    value: "3H31LA",
    options: {
      displayValue: false,
    },
  });
  return (
    <div className="w-full">
      <svg ref={inputRef} className="w-full" />
    </div>
  );
};

export default TicketBarcode;
