import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.isActive) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // Update last login
        await db.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          department: user.department,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.department = user.department;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as UserRole;
        session.user.department = token.department as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url.includes("/auth/signin")) {
        return baseUrl + "/dashboard";
      }
      if (url.startsWith("/")) return baseUrl + url;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/dashboard";
    },
  },
};

declare module "next-auth" {
  interface User {
    role: UserRole;
    department: string;
  }
  interface Session {
    user: User & {
      id: string;
      role: UserRole;
      department: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    department: string;
  }
}
