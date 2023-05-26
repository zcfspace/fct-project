import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Usuario no encontrada");
        }

        const admin = await prisma.admin.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!admin || !admin?.password) {
          throw new Error("Usuario no encontrada");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isCorrectPassword) {
          throw new Error("Contraseña incorrecta");
        }
        return {
          id: admin.id,
          username: admin.username,
          email: admin.username + "@bambumexpress.com",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
};
export default NextAuth(authOptions);
