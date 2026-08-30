import { Prisma } from "../../generated/prisma/client.js";
import type { UserModel } from "../../generated/prisma/models.js";
import { hashPassword, verifyPassword } from "../../utilities/hash.js";
import { generateToken } from "../../utilities/jwt.js";
import { createErrorResponse } from "../../utilities/createErrorResponse.js";
import userResource from "../users/user.resource.js";
import { UserService } from "../users/user.service.js";
import type { ForgetInput, LoginInput, RegisterInput } from "./authentication.validation.js";
import tokenGenerator from "../../utilities/tokenGenerator.js";
import { AuthenticationRepository } from "./authentication.repository.js";
import { email } from "zod";
import redisClient from "../../lib/redisClient.js";
import emailQueue from "../../jobs/queues/email/email.queue.js";
import { fromNodeHeaders } from "better-auth/node";


export class AuthenticationService {
    private readonly userService: UserService = new UserService;
    private readonly authenticationRepository: AuthenticationRepository = new AuthenticationRepository


    async login(userData: LoginInput) {
        const email = userData.email.trim().toLowerCase();
        const user: UserModel | null = await this.userService.findUserByEmail(email);
        if (!user) {
            return {
                ...createErrorResponse({
                    root: "Registration could not be completed",
                }),
                code: 422,
            };
        }

        const passwordMatching = await verifyPassword(userData.password,user.password);
        if (!passwordMatching) {
            return {
                ...createErrorResponse({
                    root: "Registration could not be completed",
                }),
                code: 422,
            };
        }

        const accessToken = generateToken(user.id);

        return {
            status: true as const,
            code: 200,
            payload: {
                user: userResource(user),
                access_token: accessToken,
            },
        };
    }

    async register(userData: RegisterInput) {
        try {
            const userRegister = await this.userService.createUser({
                ...userData,
                email: userData.email.trim().toLowerCase(),
                password: await hashPassword(userData.password),
            });

            const token = generateToken(userRegister.id);

            return {
                status: true as const,
                code: 201,
                payload: {
                    user: userResource(userRegister),
                    access_token: token,
                },
            };
        } catch (error: unknown) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
                return {
                    ...createErrorResponse({
                        root: "Registration could not be completed",
                    }),
                    code: 409,
                };
            }

            return {
                ...createErrorResponse({
                    root: "Registration could not be completed",
                }),
                code: 500,
            };
        }
    }

    async forgetPassword(forgetData: ForgetInput) {
        const user = await this.userService.findUserByEmail(forgetData.email);
        if (!user) {
            return {
                ...createErrorResponse({
                    root: "Can't find this user"
                }),
                code: 422,
            };
        }

        const passwordResestToken = await tokenGenerator();
        await redisClient.set(`password_reset:${passwordResestToken}`,forgetData.email,{EX: 10 * 60});
        await emailQueue.add("forget-password-email",{
            to: user.email,
            subject: "Forget Password",
            data: {
                token: "passwordResestToken"
            }
        });

        return {
            status: true as const,
            code: 200,
            message: "Password reset request created",
        };
    }

    async sendVerificationEmail(userData: RegisterInput) {
        
    }

    async refreshToken () {

    }

}
