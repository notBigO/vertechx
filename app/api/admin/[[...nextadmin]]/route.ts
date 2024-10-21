import prisma from "..\..\..\..\lib\client";
import schema from "..\..\..\..\prisma\json-schema\json-schema.json";
import { createHandler } from "@premieroctet/next-admin/appHandler";
import options from "..\..\..\..\nextAdminOptions";

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  schema,
  options
});
 
export { run as DELETE, run as GET, run as POST };
