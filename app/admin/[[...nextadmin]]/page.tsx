import { db } from "@/utils/db";
import { NextAdmin, PageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import schema from "@/prisma/json-schema/json-schema.json";
import "@/app/globals.css";

export const options = {
  basePath: "/admin",
  model: {
    Event: {
      toString: (event) => `${event.title}`,
      title: "Event",
      edit: {
        display: [
          "slug",
          "title",
          "description",
          "judgingCriteria",
          "eventCoordinatorInfo",
          "rules",
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
      toString: (item) => item.name,
      title: "User",
    },
    Participant: {
      title: "Participants",
      toString: (participant) => participant.name + " - " + participant.phone,
    },
    Registration: {
      title: "Registrations",
      list: {
        search: ["name", "collegeName", "phone", "paymentId", "event"],
        fields: {
          event: {
            formatter: (event) => event.title,
          },
          createdAt: {
            formatter: (date) => new Date(date).toUTCString(),
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
      //   edit: {
      //     fields: {
      //       screenshotUrl: {
      //         input: <ViewScreenshotButton />,
      //       },
      //     },
      //   },
    },
  },
  pages: {
    "/export-registrations": {
      title: "Export Registrations",
    },
  },
};

export default async function AdminPage({ params, searchParams }: PageProps) {
  const props = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma: db,
    schema,
    options,
  });

  return (
    // <div className="w-screen h-full text-black">
    <NextAdmin {...props} />
    // </div>
  );
}
