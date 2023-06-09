import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "POST") {
    const { name, price, image, categoryId } = req.body;

    const extension = image.split(";")[0].split("/")[1];

    const fileName = `${Date.now()}.${extension}`;

    const filePath = path.join(process.cwd(), "public", "img", fileName);
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFileSync(filePath, base64Data, { encoding: "base64" });

    try {
      const newFood = await prisma.food.create({
        data: {
          name,
          price: parseInt(price),
          image: `/img/${fileName}`,
          categoryId,
        },
      });
      res.status(201).json(newFood);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el plato" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
