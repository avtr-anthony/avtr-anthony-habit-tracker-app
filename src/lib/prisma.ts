import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prosma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma ??
  new PrismaClient({
    log: ["query", "error", "warn"]
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
