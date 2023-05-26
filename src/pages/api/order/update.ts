import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import authMiddleware from "@/libs/authMiddleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authMiddleware(req, res);

  if (req.method === "PUT") {
    try {
      const { id, status } = req.body;
      const updatedOrder = await prisma.order.update({
        where: { id: id as string },
        data: { status: status as string },
      });
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error al actualizar el estado del pedido" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
