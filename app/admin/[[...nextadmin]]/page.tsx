import { NextAdmin, PageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import prisma from "@/lib/client";
import schema from "@/prisma/json-schema/json-schema.json";
import { Event, Participant, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import ViewScreenshotButton from "@/components/ViewScreenshotButton";

export const options = {
  basePath: "/admin",
  model: {
    Event: {
      toString: (event: Event) => `${event.title}`,
      title: "Event",
      edit: {
        display: [
          "slug",
          "title",
          "description",
          "judgingCriteria",
          "eventCoordinatorInfo",
          "rules",
          "poster_url",
          "firstPrize",
          "secondPrize",
          "registrationFee",
          "minParticipants",
          "maxParticipants",
          "time",
          "date",
          "venue",
          "category",
          "isGroup",
        ],
        fields: {
          judgingCriteria: {
            format: "textarea",
          },
          rules: {
            format: "textarea",
          },
          eventCoordinatorInfo: {
            format: "textarea",
          },
        },
      },
    },
    User: {
      toString: (user: User) => user.name,
      title: "User",
    },
    Participant: {
      title: "Participants",
      toString: (participant: Participant) =>
        participant.name + " - " + participant.phone,
    },
    Registration: {
      title: "Registrations",
      list: {
        search: ["name", "collegeName", "phone", "paymentId", "event"],
        fields: {
          event: {
            formatter: (event: Event) => event.title,
          },
          createdAt: {
            formatter: (date: Date) => new Date(date).toUTCString(),
          },
        },
        display: [
          "id",
          "name",
          "collegeName",
          "paymentVerification",
          "paymentId",
          "event",
          "phone",
          "noOfParticipants",
          "participants",
          "paymentAmount",
          "createdAt",
        ],
        defaultSort: {
          field: "createdAt",
          direction: "desc",
        },
      },
      // edit: {
      //   fields: {
      //     screenshotUrl: {
      //       input: <ViewScreenshotButton />,
      //     },
      //   },
      // },
    },
  },
  pages: {
    "/export-registrations": {
      title: "Export Registrations",
    },
  },
};

export default async function AdminPage({ params, searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user || !user.role || user.role !== "ADMIN") {
    return (
      <div className="w-screen h-screen text-2xl flex flex-col items-center justify-center">
        <h1>Yikes! Access Denied</h1>
        <p>You need to be an admin to access this page.</p>
        <Link href="/" className="underline text-purple-700">
          Go back home
        </Link>
      </div>
    );
  }
  const props = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma,
    schema,
    options,
  });

  return <NextAdmin {...props} />;
}
