import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, contactReason, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || "user",
      pass: process.env.SMTP_PASSWORD || "password",
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_FROM_EMAIL,
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nMotivo de contacto: ${contactReason}\nMensaje: ${message}`,
    });
    res.status(200).send("Correo enviado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al enviar el correo");
  }
}
