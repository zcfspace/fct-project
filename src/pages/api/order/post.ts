import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

interface OrderItem {
  foodId: string;
  quantity: number;
}

interface OrderData {
  table: number;
  foods: { food: { id: string }; quantity: number }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { table, foods } = req.body as OrderData;
    
    const orderItems: OrderItem[] = foods.map((food: any) => ({
      foodId: food.food.id,
      quantity: food.quantity,
    }));

    try {
      const createdOrder = await prisma.order.create({
        data: {
          table: table,
          orderItems: {
            create: orderItems,
          },
        },
      });
      res.status(200).json({ success: true, order: createdOrder });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}