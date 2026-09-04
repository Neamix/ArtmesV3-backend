import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { enqueueEmail } from "../jobs/queues/email/email.queue.js";
import { bearer } from "better-auth/plugins";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {    
    enabled: true,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: 60 * 60,
    sendResetPassword: async ({ user, token }) => {
      await enqueueEmail({
        type: "reset-password",
        to: user.email,
        name: user.name,
        resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${token}`,
        expiresInSeconds: 60 * 60,
      });
    },
    onPasswordReset: async ({ user }) => {
      await enqueueEmail({
        type: "password-changed",
        to: user.email,
        name: user.name,
        changedAt: new Date().toUTCString(),
      });
    },
  }, 
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await enqueueEmail({
        type: "verify-email",
        to: user.email,
        name: user.name,
        verifyUrl: url,
      });
    },
  },
  plugins: [
    bearer()
  ],
  advanced: {
    database: {
      generateId: "serial",
    },
  },
})
