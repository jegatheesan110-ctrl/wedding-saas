import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (user && user.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              role: "user",
            };
          }
        }

        const shop = await prisma.shop.findUnique({ where: { email: credentials.email } });
        if (shop && shop.password) {
          const isValid = await bcrypt.compare(credentials.password, shop.password);
          if (isValid) {
            return {
              id: shop.id,
              email: shop.email,
              name: shop.shopName,
              role: "shop",
            };
          }
        }

        return null;
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "user";
      }
      if (token.email) {
        if (token.role === "shop") {
          const dbShop = await prisma.shop.findUnique({ where: { email: token.email } });
          token.isPaid = dbShop?.isActive ?? false;
        } else {
          const dbUser = await prisma.user.findUnique({ where: { email: token.email } });
          token.isPaid = dbUser?.isPaid ?? false;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id || "");
        session.user.isPaid = Boolean(token.isPaid);
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
