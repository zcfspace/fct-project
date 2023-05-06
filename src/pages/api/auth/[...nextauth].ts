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

        return admin;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {

//         const { username, password } = credentials;

//         const admin = await prisma.admin.findUnique({
//           where: { username },
//         });
//         if (admin && admin.password === password) {
//           return { id: admin.id, name: admin.name };
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   // Aquí puedes agregar otras opciones y callbacks de NextAuth
// });
// import NextAuth from "next-auth";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import CredentialsProvider from "next-auth/providers/credentials";

// const prisma = new PrismaClient();

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorized(Credentials) {
//         const admin = await prisma.admin.findUnique({
//           where: { username: credentials.username },
//         });

//         if (admin) {
//           const isPasswordValid = await bcrypt.compare(
//             credentials.password,
//             admin.password
//           );
//           if (isPasswordValid) {
//             return { name: "Admin" };
//           } else {
//             return null;
//           }
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
// });

// // callbacks: {
// //   async jwt(token, admin) {
// //     if (admin) {
// //       token.name = admin.name;
// //     }
// //     return token;
// //   },
// //   async session(session, token) {
// //     session.admin = token;
// //     return session;
// //   },
// // },
// // import NextAuth, { NextAuthOptions } from "next-auth";
// // import GithubProvider from "next-auth/providers/github";

// // export const authOptions: NextAuthOptions = {
// //   providers: [
// //     GithubProvider({
// //       clientId: process.env.GITHUB_ID,
// //       clientSecret: process.env.GITHUB_SECRET,
// //     }),
// //   ],
// //   callbacks: {
// //     async jwt({ token }) {
// //       token.userRole = "admin";
// //       return token;
// //     },
// //   },
// // };

// // export default NextAuth(authOptions);
