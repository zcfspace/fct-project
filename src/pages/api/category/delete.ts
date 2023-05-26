import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import authMiddleware from "@/libs/authMiddleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authMiddleware(req, res);

  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: "Se requiere el ID de la categoría" });
      return;
    }

    try {
      await prisma.category.delete({
        where: {
          id: id as string,
        },
      });

      res.status(200).json({ message: "Reserva eliminada categoría" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la categoría" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
