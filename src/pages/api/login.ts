// import { PrismaClient } from "@prisma/client";
// import type { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { username, password } = req.body;

//   const admin = await prisma.admin.findUnique({
//     where: { username },
//   });

//   if (admin) {
//     const isPasswordValid = await bcrypt.compare(password, admin.password);
//     if (isPasswordValid) {
//       res.status(200).json({ result: "success" });
//     } else {
//       res.status(401).json({ result: "failure" });
//     }
//   } else {
//     res.status(401).json({ result: "failure" });
//   }
// }
