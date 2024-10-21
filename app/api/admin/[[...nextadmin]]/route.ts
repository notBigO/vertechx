import { createHandler } from "@premieroctet/next-admin/appHandler";
import prisma from "@/lib/client";
import schema from "@/prisma/json-schema/json-schema.json";
import { options } from "@/app/admin/[[...nextadmin]]/page";

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  schema,
  options,
});

export { run as DELETE, run as GET, run as POST };
