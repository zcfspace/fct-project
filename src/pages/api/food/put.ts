import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "@/libs/authMiddleware";
import prisma from "@/libs/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await authMiddleware(req, res);

  if (req.method === "PUT") {
    const { id } = req.query;
    const { name, image, price, categoryId } = req.body;

    try {
      const food = await prisma.food.update({
        where: { id: String(id) },
        data: { name, image, price, categoryId },
      });

      res.status(200).json({ message: "Comida actualizada", food });
    } catch (error) {
      console.error("Error al actualizar la comida:", error);
      res.status(500).json({ message: "Error al actualizar la comida" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
};
