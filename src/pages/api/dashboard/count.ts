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
      const ordersCount = await prisma.order.count();
      const reservationsCount = await prisma.reservation.count();
      const foodCount = await prisma.food.count();
      
      res.status(200).json({ ordersCount, reservationsCount, foodCount });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener las reservas, comandas y platos" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
