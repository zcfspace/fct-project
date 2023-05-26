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
    try {
      await prisma.orderItem.deleteMany({
        where: {
          orderId: id as string,
        },
      });
      await prisma.order.delete({
        where: {
          id: id as string,
        },
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
