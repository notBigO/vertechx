import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/client";
import { Frown, PartyPopper, Repeat2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import upiqr from 'upiqr';


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
      console.log("Event Data: ", event);
      if (!event) {
        return null;
      }

      return event;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw new Error("Failed to fetch event data");
    }
  },
  ["event-data"],
  {
    revalidate: 60,
    tags: ["event-data"],
  }
);

const RegistrationPage = async ({ params }: { params: any }) => {
  const session = await getServerSession(authOptions);
  const event = await getEventData(params.id);

  const qr = await upiqr({
    payeeVPA: 'EzE0046709@CUB',
    payeeName: 'THE PRINCIPAL MVJ COLLEGE',
    amount: event?.registrationFee,
  })

  if (!session) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6 text-primary">Yikes!</h1>
          <p className="text-xl mb-8 text-white">
            Looks like you're not logged in. Please log in to register for this
            event.
          </p>
        </div>
      </div>
    );
  }

  const registration = await prisma.registration.findFirst({
    where: {
      eventId: event?.id,
      userId: session?.user.id,
    },
  });

  if (registration) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md">
          <div className="flex justify-center items-center mb-6 space-x-4">
            <PartyPopper className="w-16 h-16 text-yellow-500 animate-bounce" />
            <Frown
              className="w-16 h-16 text-red-500"
              style={{ transform: "screw(45deg)" }}
            />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Whoopsie-Daisy! 🎉
          </h1>
          <p className="text-xl mb-8 text-white">
            Looks like you've already got a golden ticket to this shindig!
            You're all set and ready to rock{" "}
            <Repeat2 className="inline-block w-5 h-5 text-primary" />
          </p>
          <Button
            asChild
            className="bg-primary hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Link
              href="/events"
              className="flex items-center justify-center gap-2"
            >
              <Frown className="w-5 h-5" />
              Back to Events
              <PartyPopper className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EventRegistrationForm event={event} session={session} qr={qr} />
    </div>
  );
};

export default RegistrationPage;
