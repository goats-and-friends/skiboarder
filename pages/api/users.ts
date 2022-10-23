// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export type UsersResponse = {
  users: User[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsersResponse>
) {
  const users = await prisma.user.findMany();
  res.status(200).json({ users });
}
