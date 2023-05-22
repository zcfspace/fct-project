import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const orders = await prisma.order.findMany({
        include: {
          orderItems: {
            include: {
              food: true,
            },
          },
        },
      });
      res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener las ordenes" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
