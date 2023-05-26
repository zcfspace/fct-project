import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "@/libs/authMiddleware";



const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
   await authMiddleware(req, res);


  if (req.method === "PUT") {
    const { id } = req.query;
    const { name, slug } = req.body;

    try {
      const category = await prisma.category.update({
        where: { id: String(id) },
        data: { name, slug },
      });

      res.status(200).json({ message: "Categoría actualizada", category });
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      res.status(500).json({ message: "Error al actualizar la categoría" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
};
