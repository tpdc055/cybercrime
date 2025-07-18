import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define UserRole enum for production
export enum UserRole {
  ADMIN = "ADMIN",
  INVESTIGATOR = "INVESTIGATOR",
  ANALYST = "ANALYST",
  VIEWER = "VIEWER"
}

// Mock users for demonstration (replace with real database in production)
const mockUsers = [
  {
    id: "1",
    email: "admin@police.pg",
    password: "admin123", // In production, this should be hashed
    name: "Admin User",
    role: UserRole.ADMIN,
    department: "Cybercrime Division",
    isActive: true
  },
  {
    id: "2",
    email: "detective@police.pg",
    password: "detective123",
    name: "Det. John Doe",
    role: UserRole.INVESTIGATOR,
    department: "Cybercrime Division",
    isActive: true
  }
];

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
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Find user in mock data (replace with database query in production)
          const user = mockUsers.find(u =>
            u.email === credentials.email &&
            u.password === credentials.password &&
            u.isActive
          );

          if (!user) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            department: user.department,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
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
