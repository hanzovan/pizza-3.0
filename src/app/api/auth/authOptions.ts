import { clientPromise } from "@/database/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions, Session } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { UserService } from "@/lib/services";

import { CredentialType, CustomSessionUser, JwtProps, SessionProps, AuthUserType } from "@/types";
import { standardizeProfile } from "@/lib/utils";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "NEXTAUTH_SECRET not found",
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,
  },
  providers: [
    Credentials({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(
        credentials: CredentialType | undefined
      ): Promise<AuthUserType | null> {
        try {
          const email = credentials?.email;
          const password = credentials?.password;

          if (!email || !password) {
            return null;
          }

          const user = await UserService.loginUser(email, password);

          if (user.isError) {
            return null;
          } else {
            return user.data;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "GOOGLE_CLIENT_ID not found",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ?? "GOOGLE_CLIENT_SECRET not found",
      profile: (user) => standardizeProfile(user),
    }),
  ],
  callbacks: {
    // the jwt token will pass into session
    async jwt({ token, user, trigger, session }: JwtProps) {
      if (token && user) {
        const _user: CustomSessionUser = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          avatar: user.avatar,
        };
        token.user = _user;
      }
      if (token && !user) {
        const _user = token?.user;
        token.user = _user;
      }

      // If there's a trigger that want to update session
      if (trigger === 'update' && session?.user) {
        token.user = {
          ...(token.user ?? {}),// preserve the other user info
          ...session.user,// merging new change to user in token
        }
      }
      return token;
    },
    async session({ session, token }: SessionProps): Promise<Session> {
      const customSession = session;

      if (token) {
        customSession.user = token?.user as CustomSessionUser;
      }

      return customSession;
    },
  },
  debug: false,
};

export { authOptions };
