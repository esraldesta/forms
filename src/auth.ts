import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/schemas";
import db from "./lib/db";
import { compare } from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: parsedCredentials.data.email,
          },
        });

        if (!user) {
          return null;
        }

        const isMatch = await compare(
          credentials.password as string,
          user?.password as string
        );

        if (!isMatch) return null;

        return {
          id: user?.id.toString(),
          name: user?.name,
          email: user?.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  // to add more data to the token and session
  // callbacks: {

  //   jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },

  //   session({ session, token }) {
  //     session.user.id = token.id as string;
  //     return session;
  //   },
  // },
});
