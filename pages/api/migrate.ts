// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as prisma from "@prisma/client";
import * as prismaMongo from "@prismaMongo/client";

const pg = new prisma.PrismaClient();
const mongo = new prismaMongo.PrismaClient();

export type UsersResponse = {
  users: prisma.User[];
};

async function convertUsers(users: prismaMongo.User[]) {
  const ids: any = {};
  for (const user of users) {
    const { id, ...newUser } = user;
    const pgUser = await pg.user.create({
      data: newUser,
    });
    ids[id] = pgUser.id;
  }
  return ids;
}

async function convertSessions(sessions: prismaMongo.Session[], userIds: any) {
  for (const session of sessions) {
    const { id, userId, ...newSession } = session;
    await pg.session.create({
      data: { userId: userIds[userId], ...newSession },
    });
  }
}

async function convertAccounts(accounts: prismaMongo.Account[], userIds: any) {
  for (const account of accounts) {
    const { id, userId, ...newAccount } = account;
    await pg.account.create({
      data: { userId: userIds[userId], ...newAccount },
    });
  }
}

async function convertInitialSurveys(
  initialSurveys: prismaMongo.InitialSurvey[]
) {
  const ids: any = {};
  for (const initialSurvey of initialSurveys) {
    const { id, ...newInitialSurvey } = initialSurvey;
    const pgInitialSurveys = await pg.initialSurvey.create({
      data: { ...newInitialSurvey },
    });
    ids[id] = pgInitialSurveys.id;
  }
  return ids;
}

async function convertAvailabilities(
  availabilities: prismaMongo.Availability[],
  initialSurveyIds: any
) {
  for (const availability of availabilities) {
    const { id, initialSurveyId, ...newAvailability } = availability;
    await pg.availability.create({
      data: {
        initialSurveyId: initialSurveyIds[initialSurveyId],
        ...newAvailability,
      },
    });
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const mongoUsers = await mongo.user.findMany();
  const mongoSessions = await mongo.session.findMany();
  const mongoAccounts = await mongo.account.findMany();
  const mongoInitialSurveys = await mongo.initialSurvey.findMany();
  const mongoAvailabilies = await mongo.availability.findMany();
  const mongoVerificationTokens = await mongo.verificationToken.findMany();

  const userIds = await convertUsers(mongoUsers);
  await convertSessions(mongoSessions, userIds);
  await convertAccounts(mongoAccounts, userIds);
  const initialSurveyIds = await convertInitialSurveys(mongoInitialSurveys);
  await convertAvailabilities(mongoAvailabilies, initialSurveyIds);
  // await convertVerificationTokens(mongoVerificationTokens);

  const pgUsers = await pg.user.findMany();
  const pgSessions = await pg.session.findMany();
  const pgAccounts = await pg.account.findMany();
  const pgInitialSurveys = await pg.initialSurvey.findMany();
  const pgAvailabilities = await pg.availability.findMany();
  res.status(200).json({
    pg: {
      // users: pgUsers,
      // sessions: pgSessions,
      // accounts: pgAccounts,
      // initialSurveys: pgInitialSurveys,
      availability: pgAvailabilities,
    },
    mongo: {
      // users: mongoUsers,
      // sessions: mongoSessions,
      // accounts: mongoAccounts,
      // initialSurveys: mongoInitialSurveys,
      availability: mongoAvailabilies,
    },
  });
}
