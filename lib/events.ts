// lib/events.ts
import { unstable_cache } from "next/cache";
import prisma from "./client";

export const getEvent = unstable_cache(
  async (eventId: string) => {
    return await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });
  },
  ["event"],
  { revalidate: 60, tags: ["event"] }
);

export const getEvents = unstable_cache(
  async (category?: string, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where: category ? { category } : undefined,
        take: limit,
        skip,
        orderBy: { date: "desc" },
        include: {
          _count: {
            select: { registrations: true },
          },
        },
      }),
      prisma.event.count({
        where: category ? { category } : undefined,
      }),
    ]);

    return {
      events,
      total,
      pages: Math.ceil(total / limit),
    };
  },
  ["events"],
  { revalidate: 60, tags: ["events"] }
);
