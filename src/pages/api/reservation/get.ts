import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import authMiddleware from "@/libs/authMiddleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authMiddleware(req, res);

  if (req.method === "GET") {
    const dateFilter = req.query.date
      ? new Date(req.query.date as string)
      : undefined;

    try {
      const reservations = await prisma.reservation.findMany({
        where: {
          date: dateFilter ? { equals: dateFilter } : undefined,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: dateFilter ? undefined : 9,
      });

      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las reservas" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
