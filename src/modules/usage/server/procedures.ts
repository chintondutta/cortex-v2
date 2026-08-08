import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { getUsageStatus } from "./usage";

export const usageRouter = createTRPCRouter({
  status: protectedProcedure.query(async ({ ctx }) => {
    return getUsageStatus(ctx.auth.userId);
  }),
});
