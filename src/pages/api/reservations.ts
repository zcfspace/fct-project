// import prisma from "../../libs/prisma";
// import { Reservation } from "../../types/types";

// export const createReservation = async (reservation: Reservation) => {
//   const createdReservation = await prisma.reservation.create({
//     data: reservation,
//   });

//   return createdReservation;
// };

// import prisma from "../../libs/prisma";
// import { NextApiRequest, NextApiResponse } from "next";
// import { Reservation } from "../../types/types";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { dateTime, numPersons, name, phone, email, address } =
//       req.body as Reservation;

//     const reservation = await prisma.reservation.create({
//       data: {
//         dateTime,
//         numPersons,
//         name,
//         phone,
//         email,
//         address,
//       },
//     });

//     res.status(201).json(reservation);
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
