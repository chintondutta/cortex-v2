import { PrismaClient } from "../generated/prisma/client";
import { join } from "path";

// Set the binary path for production
if (process.env.NODE_ENV === "production") {
  process.env.PRISMA_QUERY_ENGINE_LIBRARY = join(
    process.cwd(),
    "src/generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node"
  );
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;