import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users;
}
