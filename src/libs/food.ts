import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllFoods() {
  const foods = await prisma.food.findMany();
  return foods;
}
