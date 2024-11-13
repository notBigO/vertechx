import React from "react";
import prisma from "@/lib/client"; // Adjust import based on your prisma setup
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const getRegisteredEvents = async (userId: string) => {
  if (!userId) return [];

  const registrations = await prisma.registration.findMany({
    where: {
      userId: userId,
    },
    include: {
      event: true, // Include event details
    },
  });

  return registrations; // Return the full registration data including event
};

const MyRegistrations = async () => {
  let registeredEvents: any[] = [];

  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.id) {
      registeredEvents = await getRegisteredEvents(session.user.id);
    }
  } catch (error) {
    console.error("Error fetching registered events:", error);
  }

  return (
    <div className="flex flex-col min-h-screen w-full items-center mt-16 px-4">
      <h1 className="text-4xl text-primary mb-8">My Registrations</h1>

      {registeredEvents.length === 0 ? (
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Registrations Found</AlertTitle>
          <AlertDescription>
            You haven't registered for any events yet. Browse our events page to
            find something interesting!
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {registeredEvents.map((registration) => (
            <Link
              href={`/ticket/${registration.id}`}
              key={registration.id}
              className="w-full"
            >
              <h1 className="text-lg font-bold">{registration.event.title}</h1>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;
