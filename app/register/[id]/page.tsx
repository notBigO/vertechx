import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import prisma from "@/lib/client";
import { getEvent } from "@/lib/events";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";
import Link from "next/link";

const mockQr = {
  qr: "https://example.com/qr-code.png",
};

const getEventData = unstable_cache(
  async (slug: string) => {
    try {
      const event = await prisma.event.findUnique({
        where: { slug },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          poster_url: true,
          category: true,
          minParticipants: true,
          maxParticipants: true,
          time: true,
          venue: true,
          firstPrize: true,
          secondPrize: true,
          registrationFee: true,
          rules: true,
          judgingCriteria: true,
          eventCoordinatorInfo: true,
          isGroup: true,
        },
      });

      if (!event) {
        return null;
      }

      return event;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw new Error("Failed to fetch event data");
    }
  }
  // ["event-data"],
  // {
  //   revalidate: 60,
  //   tags: ["event-data"],
  // }
);

const RegistrationPage = async ({ params }: { params: any }) => {
  const session = await getServerSession(authOptions);
  const event = await getEventData(params.id);

  const registration = await prisma.registration.findFirst({
    where: {
      eventId: event?.id,
      userId: session?.user.id,
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
          href="/"
          className="px-4 py-1 bg-gray-400 bg-opacity-15 text-nowrap border-gray-400 border border-opacity-40 cursor-pointer font-satoshi backdrop-blur-sm rounded-xl m-2 hover:bg-gradient-purple transition-all duration-500 hover:scale-105"
        >
          Go back to home
        </Link>
      </div>
    );
  }

  // Render the event registration form
  return (
    <div>
      <EventRegistrationForm event={event} session={session} qr={mockQr} />
    </div>
  );
};

export default RegistrationPage;
