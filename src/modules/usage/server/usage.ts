import { prisma } from "@/lib/db";
import { TRPCError } from "@trpc/server";

export const DAILY_GENERATION_LIMIT = 5;

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const getDailyGenerationCount = (userId: string) => {
  return prisma.message.count({
    where: {
      role: "USER",
      project: { userId },
      createdAt: { gte: new Date(Date.now() - DAY_IN_MS) },
    },
  });
};

export const assertUnderDailyGenerationLimit = async (userId: string) => {
  const count = await getDailyGenerationCount(userId);

  if (count >= DAILY_GENERATION_LIMIT) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `You've reached your daily limit of ${DAILY_GENERATION_LIMIT} generations. Please try again tomorrow.`,
    });
  }
};

export const getUsageStatus = async (userId: string) => {
  const used = await getDailyGenerationCount(userId);
  return {
    used,
    limit: DAILY_GENERATION_LIMIT,
    remaining: Math.max(DAILY_GENERATION_LIMIT - used, 0),
  };
};
