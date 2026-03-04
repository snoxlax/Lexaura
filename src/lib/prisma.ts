import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/** Normalize DATABASE_URL to use explicit sslmode=verify-full (silences pg SSL deprecation warning) */
function normalizeConnectionString(url: string): string {
  const deprecatedModes = ["prefer", "require", "verify-ca"];
  for (const mode of deprecatedModes) {
    url = url.replace(
      new RegExp(`([?&])sslmode=${mode}\\b`, "gi"),
      "$1sslmode=verify-full",
    );
  }
  return url;
}

const prismaClientSingleton = () => {
  const connectionString = normalizeConnectionString(
    process.env.DATABASE_URL!,
  );
  const adapter = new PrismaPg({
    connectionString,
  });
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
