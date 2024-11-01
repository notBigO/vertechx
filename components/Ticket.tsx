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

export default function Ticket({
  registration,
}: {
  registration: Registration;
}) {
  // Format date consistently using explicit formatting options
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Format time consistently
  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card className="relative bg-white overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="flex-1 p-6 border-r border-gray-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-sm text-gray-500 mb-1">Event Ticket</h2>
                <CardTitle className={`text-xl text-primary`}>
                  {registration.event.title}
                </CardTitle>
              </div>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  registration.paymentVerification
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                )}
              >
                {registration.paymentVerification}
              </span>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm text-gray-900">
                  {formatDate(registration.event.date)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Time</p>
                <p className="text-sm text-gray-900">
                  {formatTime(registration.event.date)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm text-gray-900">Main Venue</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Section</p>
                <p className="text-sm text-gray-900">A1</p>
              </div>
            </div>

            {/* Participants Section */}
            <div className="mt-6">
              <h3 className="text-xs text-gray-500 mb-2">Participants</h3>
              <div className="space-y-2">
                {registration.participants.map((participant: any) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm text-gray-900">
                      {participant.name}
                    </span>
                    <span className="text-xs text-gray-600">
                      {participant.phone}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="p-6 flex flex-col items-center justify-center min-w-[240px] relative bg-gray-50">
            <div className="absolute -left-[5px] top-1/3 w-[10px] h-[10px] rounded-full bg-white" />
            <div className="absolute -left-[5px] bottom-1/3 w-[10px] h-[10px] rounded-full bg-white" />

            <div className="p-3 bg-white rounded-lg shadow-sm mb-4">
              <QRCode
                value={`${process.env.NEXT_PUBLIC_APP_URL}/admin/registrations/${registration.id}`}
                size={140}
              />
            </div>
            <p className="text-xs text-gray-500 mb-2">
              Ticket ID: {registration.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 text-center bg-gray-50">
          <span className="text-xs text-primary">
            Present this ticket at the venue entrance
          </span>
        </div>
      </Card>
    </div>
  );
}
