import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const foods = await prisma.food.findMany();
      res.status(200).json(foods);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las categorias" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
