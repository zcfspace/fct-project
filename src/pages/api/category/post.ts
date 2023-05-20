import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, slug } = req.body;

    try {
      const category = await prisma.category.create({
        data: {
          name,
          slug,
        },
      });

      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la categoría" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
