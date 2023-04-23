import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prismadb";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, description, price, image } = req.body;
  const food = await prisma.food.create({
    data: {
      name,
      description,
      price,
      image,
    },
  });
  res.json(food);
}
