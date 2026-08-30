import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { sendEmail } from "./mail.js";

const configuredOrigins = [
  ...(process.env.CORS_ORIGINS?.split(",") ?? []),
  process.env.FRONTEND_URL,
]
  .filter((origin): origin is string => Boolean(origin?.trim()))
  .map((origin) => origin.trim());


export const auth = betterAuth({
  appName: "Artmes",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },

  emailVerification: {
    expiresIn: 60 * 60 * 10,
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your Artmes email address",
        html: `<p>Confirm your email address to finish setting up your Artmes account.</p>
<p><a href="${url}">Verify email</a></p>
<p>This link expires in 10 hours. If you didn't create an account, you can ignore this email.</p>`,
      });
    }
  },


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
