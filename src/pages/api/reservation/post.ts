import type { NextApiRequest, NextApiResponse } from "next";
import { format } from "date-fns";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { date, time, numPersons, name, lastName, email, phone } = req.body;
    const formattedDate = format(
      new Date(date),
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
    );

    try {
      const reservation = await prisma.reservation.create({
        data: {
          date: formattedDate,
          time,
          numPersons: parseInt(numPersons),
          name,
          lastName,
          email,
          phone,
        },
      });

      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la reserva" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
