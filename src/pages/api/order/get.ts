import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import authMiddleware from "@/libs/authMiddleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authMiddleware(req, res);

  if (req.method === "GET") {
    try {
      const status = req.query.status as string;

      const orders = await prisma.order.findMany({
        //Si no hay estado, se mostrarán las comandas de estado pendiente o procesando
        where: status
          ? { status: status }
          : {
              status: {
                in: ["pendiente", "procesando"],
              },
            },
        orderBy: {
          createdAt: "desc",
        },
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
      res.status(500).json({ message: "Error al obtener las comandas" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
