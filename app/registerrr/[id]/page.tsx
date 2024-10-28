import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { space } from "@/app/layout";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import prisma from "@/lib/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

const RegistrationPage = async ({ params }: { params: any }) => {
  const { id } = params;
  let event;

  try {
    event = await prisma.event.findFirst({
      where: { slug: id },
    });

    if (!event) {
      return (
        <div className="h-screen w-screen flex items-center justify-center text-5xl">
          Event not found. Please go back
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }

  // const qr = await upiqr({
  //   payeeVPA: "EzE0046709@CUB",
  //   payeeName: "THE PRINCIPAL MVJ COLLEGE",
  //   amount: event.registrationFee,
  // });

  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect(
      `/login?callbackUrl=${encodeURIComponent("/register/" + id)}`
    );
  }
  const registration = await prisma.registration.findFirst({
    where: {
      eventId: event?.id,
      userId: session?.user?.id,
    },
  });
  if (registration) {
    return (
      <div className="w-screen h-screen p-8 font-satoshi flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold">
          You have already registered for this event.
        </h1>
        <p>
          Unfortunately, you cannot register for the same event more than once.
        </p>
        <Link
          href="/events"
          className="px-4 py-1 bg-gray-400 bg-opacity-15 text-nowrap border-gray-400 border border-opacity-40 cursor-pointer font-satoshi backdrop-blur-sm rounded-xl m-2 hover:bg-gradient-purple transition-all duration-500 hover:scale-105"
        >
          Go back to home
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <div className="container px-6 md:px-60 mx-auto flex flex-col gap-2 justify-start mt-10">
        <h1 className={`text-4xl md:text-5xl ${space.className} text-primary`}>
          {event?.title}
        </h1>

        <EventRegistrationForm session={session} event={event} />
      </div>
    </div>
  );
};

export default RegistrationPage;
