import { getServerSession } from "next-auth";
import NavbarClient from "./NavbarClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const NavbarServer = async () => {
  const session = await getServerSession(authOptions);

  return <NavbarClient initialSession={session} />;
};

export default NavbarServer;
