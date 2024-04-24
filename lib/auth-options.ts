import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialProvider({
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "password", type: "password", placeholder: "********"}
      },
      async authorize(credentials, req) {
        
        //const user = { id: "1", name: "John", email: credentials?.email };
        if(!credentials?.email) {
          return null;
        }
        const userRes = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          }
        });
        
        if(credentials.password !== userRes?.password) {
          return null;
        }
        const user = {
          id: `${userRes?.id}`, // Cast to string
          name: userRes?.name,
          email: userRes?.email,
        }
        if (user && user.id && user.email && user.name) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/", //sigin page
  },
};
