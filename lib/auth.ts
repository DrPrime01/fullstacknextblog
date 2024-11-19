/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authConfig } from "@/config/auth.config";
import { loginUser, signInUser } from "@/helpers/auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  ...authConfig,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await loginUser(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
      credentials: {},
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "github") {
        await signInUser(profile.email, profile.avatar_url, profile.login);
      }
      if (account.provider === "google") {
        const isEmailGood =
          profile.email_verified && profile.email.endsWith("@gmail.com");
        if (isEmailGood) {
          await signInUser(profile.email, profile.picture, profile.name);
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
};
