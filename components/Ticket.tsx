"use client";

import QRCode from "react-qr-code";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Registration } from "@prisma/client";
import ShineBorder from "./ui/shine-border";

export default function Ticket({
  registration,
}: {
  registration: Registration;
}) {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  console.log("Registration: ", registration);
  return (
    <div className="w-full p-2 sm:p-4 max-w-3xl mx-auto">
      <ShineBorder
        className="relative bg-black overflow-hidden shadow-lg"
        color={["#7c09ff", "#c04cff", "#FFBE7B"]}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="flex-1 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-6">
              <div>
                <h2 className="text-xs sm:text-sm text-white mb-1">
                  Event Ticket
                </h2>
                <CardTitle className="text-lg sm:text-xl text-primary break-words">
                  {registration.event.title}
                </CardTitle>
              </div>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium self-start",
                  registration.paymentVerification
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                )}
              >
                {registration.paymentVerification}
              </span>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4">
              <div className="space-y-1">
                <p className="text-xs text-primary">Date</p>
                <p className="text-xs sm:text-sm text-white">
                  {formatDate(registration.event.date)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-primary">Time</p>
                <p className="text-xs sm:text-sm text-white">
                  {formatTime(registration.event.date)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-primary">Venue</p>
                <p className="text-xs sm:text-sm text-white">
                  {registration.event.venue}
                </p>
              </div>
            </div>

            {/* Participants Section */}
            {registration.noOfParticipants > 1 ? (
              <div className="mt-6">
                <h3 className="text-xs text-primary mb-2">Participants</h3>
                <div className="space-y-2">
                  {registration.participants.map((participant: any) => (
                    <div
                      key={participant.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded bg-background"
                    >
                      <span className="text-xs sm:text-sm text-white mb-1 sm:mb-0">
                        {participant.name}
                      </span>
                      <span className="text-xs text-white">
                        {participant.phone}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right Section */}
          <div className="p-4 sm:p-6 flex flex-col items-center justify-center min-w-[200px] sm:min-w-[240px]">
            <div className="p-2 sm:p-3 rounded-lg shadow-sm mb-4">
              <QRCode
                value={`${process.env.NEXT_PUBLIC_APP_URL}/admin/registrations/${registration.id}`}
                size={120}
                className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px]"
              />
            </div>
            <p className="text-xs text-primary mb-2">
              Ticket ID: {registration.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 text-center">
          <span className="text-xs text-primary">
            Present this ticket at the venue entrance
          </span>
        </div>
      </ShineBorder>
    </div>
  );
}
