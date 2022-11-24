// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Availability, InitialSurvey, PrismaClient } from "@prisma/client";
import { Prisma } from ".prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { RequiredAvailability as ClientAvailability } from "../../lib/availability";
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
  const email = session.user.email;

  type InitialSurveyRequestBody = {
    availability: ClientAvailability;
  } & Prisma.InitialSurveyCreateWithoutUserInput;
  const { availability, ...rest } = req.body as InitialSurveyRequestBody;

  const availabilities = fromMap(availability);

  const initialSurvey = await prisma.initialSurvey.findFirst({
    where: {
      userEmail: email,
    },
  });
  console.log(initialSurvey);
  if (initialSurvey === null) {
    await prisma.user.update({
      data: {
        initialSurvey: {
          create: {
            availabilities: {
              createMany: { data: availabilities },
            },
            ...rest,
          },
        },
      },
      where: {
        email,
      },
    });
  } else {
    await prisma.$transaction([
      // Nested upsert is finnicky so we just delete the existing
      // availability entities. This also means we can replace
      // the dates entirely if needed.
      prisma.availability.deleteMany({
        where: {
          initialSurvey,
        },
      }),
      prisma.user.update({
        data: {
          initialSurvey: {
            upsert: {
              create: {
                availabilities: {
                  createMany: { data: availabilities },
                },
                ...rest,
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
          email,
        },
      }),
    ]);
  }
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email,
    },
    include: {
      initialSurvey: {
        include: {
          availabilities: true,
        },
      },
    },
  });
  res.status(200).json({ initialSurvey: user?.initialSurvey });
}
