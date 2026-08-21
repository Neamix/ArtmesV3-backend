import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

const configuredOrigins = [
  ...(process.env.CORS_ORIGINS?.split(",") ?? []),
  process.env.FRONTEND_URL,
]
  .filter((origin): origin is string => Boolean(origin?.trim()))
  .map((origin) => origin.trim());

const trustedOrigins = [
  ...new Set([
    ...configuredOrigins,
    ...(process.env.NODE_ENV === "production"
      ? []
      : ["http://localhost:3000"]),
  ]),
];

export const auth = betterAuth({
  appName: "Artmes",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins,

  user: {
    modelName: "User",
    fields: {
      image: "avatar",
    },

    additionalFields: {
      nationality: {
        type: "string",
        required: false,
        input: true,
        returned: true,
      },
    },
  },

  advanced: {
    database: {
      generateId: "serial",
      joins: true,
    },
  },
});
