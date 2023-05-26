import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { categoryId } = req.query;

  try {
    let foods;

    if (categoryId) {
      foods = await prisma.food.findMany({
        where: {
          categoryId: categoryId as string,
        },
      });
    } else {
      foods = await prisma.food.findMany();
    }

    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las comidas" });
  } finally {
    await prisma.$disconnect();
  }
}
