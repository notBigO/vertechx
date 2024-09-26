import prisma from "@/utils/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

type Session = {
  user: User;
  session: any;
};

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
