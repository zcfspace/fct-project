import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  //Si no hay una sesión, devolvemos un error 401
  if (!session) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
}
