import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosInstance } from "@/lib/axios"; // pastikan import axiosInstance atau pakai fetch

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { data } = await axiosInstance.post("/auth/login", {
            username: credentials?.username,
            password: credentials?.password,
          });

          if (data) return data; // data = user + accessToken
          return null;
        } catch (error) {
          console.error("Authorize error", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // <- simpan user dan accessToken ke dalam token
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});
