// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User, PrismaClient } from "@prisma/client";
import { Prisma } from ".prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { RequiredAvailability as ClientAvailability } from "../../lib/availability";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export type ProfileResponse = {
  user: User | null;
};

function fromMap(
  availability: ClientAvailability
): Prisma.AvailabilityCreateWithoutInitialSurveyInput[] {
  const availabilities = [];
  for (const date of Object.keys(availability)) {
    availabilities.push({
      date,
      status: availability[date],
    });
  }
  return availabilities;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileResponse>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (
    session === undefined ||
    session?.user === undefined ||
    session?.user?.email === undefined ||
    session?.user?.email === null
  ) {
    return;
  }
  const email = session.user.email;

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email,
    },
  });
  user.name = req.body.name;
  session.user.name = req.body.name;
  await prisma.user.update({
    where: {
      email,
    },
    data: user,
  });
  res.status(200).json({ user: user });
}
