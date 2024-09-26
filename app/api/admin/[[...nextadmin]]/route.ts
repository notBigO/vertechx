import schema from "@/prisma/json-schema/json-schema.json";
import { db } from "@/utils/db";
import { createHandler } from "@premieroctet/next-admin/appHandler";

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma: db,
  schema,
  /*options*/
});

export { run as DELETE, run as GET, run as POST };
