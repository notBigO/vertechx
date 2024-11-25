import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DownloadButton } from "@/components/DownloadCSVButton";
import prisma from "@/lib/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const CSVDownload = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user || !user.role || user.role !== "ADMIN") {
    return (
      <div className="w-screen h-screen text-2xl flex flex-col items-center justify-center text-black">
        <h1>Access Denied</h1>
        <p>You need to be an admin to access this page.</p>
        <Link href="/" className="underline text-blue-400">
          Go back to home
        </Link>
      </div>
    );
  }

  const events = await prisma.event.findMany({
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  });
  return (
    <div className="flex flex-col w-full p-10 text-primary h-screen">
      <div className="grid grid-cols-3 max-w-full gap-4">
        {events.map((event) => {
          return (
            <div
              key={event.id}
              className="flex w-full flex-col gap-4 p-4 my-4 bg-white shadow-md rounded-md"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-xl text-purple-700 font-bold">
                  {event._count.registrations}
                </p>
              </div>
              {event._count.registrations > 0 && (
                <DownloadButton event={event} />
                // <h1>Download</h1>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CSVDownload;
