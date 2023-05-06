import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function createAdmin() {
  const password = "toor"; // Contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.admin.create({
    data: {
      username: "root", // NOmbre de usuario
      password: hashedPassword,
    },
  });

  console.log("Admin created");
}

createAdmin();
