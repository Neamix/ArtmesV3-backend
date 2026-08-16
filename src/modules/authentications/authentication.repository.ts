import type { ForgetPasswordCreateInput } from "../../generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";

export class AuthenticationRepository {
    createForgetToken(forgetData: ForgetPasswordCreateInput) {
        return prisma.forgetPassword.create({
            data: forgetData
        });
    }
}