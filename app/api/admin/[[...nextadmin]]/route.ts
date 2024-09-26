import schema from "@/prisma/json-schema/json-schema.json";
import prisma from "@/utils/client";
import { createHandler } from "@premieroctet/next-admin/appHandler";

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  schema,
  /*options*/
});

export { run as DELETE, run as GET, run as POST };
