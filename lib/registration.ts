import { unstable_cache } from "next/cache";
import prisma from "./client";

export const getRegistration = unstable_cache(
  async (registrationId: string) => {
    try {
      const registration = await prisma.registration.findUnique({
        where: { id: registrationId },
        include: {
          event: {
            select: {
              title: true,
              date: true,
              venue: true,
            },
          },
          participants: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
        },
      });

      return registration;
    } catch (error) {
      console.error("Error fetching registration:", error);
      return null;
    }
  },
  ["registration"],
  { revalidate: 30, tags: ["registration"] }
);
