import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Ticket from "@/components/Ticket";

import { Skeleton } from "@/components/ui/skeleton";
import { getRegistration } from "@/lib/registration";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function TicketDisplay({ registrationId }: { registrationId: string }) {
  const registration = await getRegistration(registrationId);
  const session = await getServerSession(authOptions);

  if (!registration || registration.userId !== session?.user?.id) {
    notFound();
  }

  return <Ticket registration={registration} />;
}

const TicketSkeleton = () => (
  <div className="flex flex-col items-center justify-center gap-4 w-screen px-10 md:max-w-[512px] md:w-full">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-6 w-full max-w-96" />
    <Skeleton className="h-[400px] w-full aspect-[16/9]" />
  </div>
);
export default async function TicketPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen container mx-auto flex items-center justify-center relative px-3 md:px-0 py-10 lg:py-0">
      <div className="flex justify-start flex-col gap-4">
        <h1 className="text-lg md:text-xl uppercase font-bold tracking-wide ml-3 md:ml-0">
          Your Ticket is{" "}
          <span className="text-primary bg-primary/10 px-2 py-1 rounded">
            Ready
          </span>
        </h1>

        <h3 className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-md ml-3 md:ml-0">
          Please make sure to get this ticket scanned at the entrance of the
          venue to check in.
        </h3>

        <Suspense fallback={<TicketSkeleton />}>
          <TicketDisplay registrationId={id} />
        </Suspense>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
          Having issues? Contact support at support@example.com
        </p>
      </div>
    </div>
  );
}
