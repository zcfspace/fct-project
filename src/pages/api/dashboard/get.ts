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
      const ordersByDay = await prisma.order.groupBy({
        by: ["createdAt"],
        _count: {
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      res.status(200).json({ ordersByDay });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los datos" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
