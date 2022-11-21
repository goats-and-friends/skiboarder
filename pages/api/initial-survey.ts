// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Availability, InitialSurvey, PrismaClient } from "@prisma/client";
import { Prisma } from ".prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { Availability as ClientAvailability } from "../../lib/availability";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export type InitialSurveyResponse = {
  initialSurvey: (InitialSurvey & { availabilities: Availability[] }) | null;
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
  res: NextApiResponse<InitialSurveyResponse>
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

  type InitialSurveyRequestBody = {
    availability: ClientAvailability;
  } & Prisma.InitialSurveyCreateWithoutUserInput;
  const { availability, ...rest } = req.body as InitialSurveyRequestBody;

  const availabilities = fromMap(availability);

  const user = await prisma.user.upsert({
    create: {},
    update: {
      initialSurvey: {
        upsert: {
          create: {
            availabilities: {
              createMany: { data: availabilities },
            },
            ...(rest as Prisma.InitialSurveyCreateWithoutUserInput),
          },
          update: {
            availabilities: {
              createMany: { data: availabilities },
            },
            ...rest,
          },
        },
      },
    },
    where: {
      email: session?.user.email,
    },
    include: {
      initialSurvey: {
        include: {
          availabilities: true,
        },
      },
    },
  });
  console.log(user);
  res.status(200).json({ initialSurvey: user?.initialSurvey });
}
