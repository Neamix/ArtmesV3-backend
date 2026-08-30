import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { sendEmail } from "./mail.js";
import { renderVerificationEmail } from "../emails/renderVerificationEmail.js";
import { registerSchema } from "../modules/authentications/authentication.validation.js";
import { AuthenticationService } from "../modules/authentications/authentication.service.js";
import { createErrorResponse } from "../utilities/createErrorResponse.js";
import { errors } from "jose";


const authService = new AuthenticationService();

/** Shared so the token lifetime and the "expires in N hours" copy cannot drift. */
const EMAIL_VERIFICATION_EXPIRES_IN = 60 * 60 * 10;

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
    expiresIn: EMAIL_VERIFICATION_EXPIRES_IN,
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Confirm your email address",
        html: await renderVerificationEmail({
          name: user.name,
          verificationUrl: url,
          expiresInSeconds: EMAIL_VERIFICATION_EXPIRES_IN,
        }),
      });
    },
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

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }

      const result = registerSchema.safeParse(ctx.body);
      if (!result.success) {
        throw new APIError("UNPROCESSABLE_ENTITY", {
          message: result.error.issues[0]?.message ?? "Validation failed",
        });
      }

      const emailAvailable = await authService.checkDuplicateEmail(result.data);
      if (!emailAvailable) {
        throw new APIError("UNPROCESSABLE_ENTITY", {
          ...createErrorResponse(
            { email: "This email already exists" },
          ),
          code: "EMAIL_ALREADY_EXISTS",
        });
      }

      return { 
        context: { 
          ...ctx, 
          body: result.data 
        } 
      };
    }),
  },

  advanced: {
    database: {
      generateId: "serial",
      joins: true,
    },
  },
});
