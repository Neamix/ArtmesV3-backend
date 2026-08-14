import { Prisma } from "../../generated/prisma/client.js";
import type { UserModel } from "../../generated/prisma/models.js";
import { hashPassword, verifyPassword } from "../../utilities/hash.js";
import { generateToken } from "../../utilities/jwt.js";
import { createErrorResponse } from "../../utilities/createErrorResponse.js";
import userResource from "../users/user.resource.js";
import { UserService } from "../users/user.service.js";
import type { ForgetInput, LoginInput, RegisterInput } from "./authentication.validation.js";

const DUMMY_PASSWORD_HASH = "$2b$10$INQiuupT1.a4MYLS5T7EG.xGbo0t73YE6aCNDzwwN5S4BBlaftKV";

function invalidCredentialsResponse() {
    return {
        ...createErrorResponse({
            email: "Wrong user credentials",
        }),
        code: 401,
    };
}

export class AuthenticationService {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async login(userData: LoginInput) {
        const email = userData.email.trim().toLowerCase();
        const user: UserModel | null = await this.userService.findUserByEmail(email);
        const passwordMatching = await verifyPassword(
            userData.password,
            user?.password ?? DUMMY_PASSWORD_HASH,
        );

        if (!user || !passwordMatching) {
            return invalidCredentialsResponse();
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

    async forgetPassword(_forgetData: ForgetInput) {
        return {
            ...createErrorResponse({
                root: "Password reset is not implemented yet",
            }),
            code: 501,
        };
    }

    async refreshToken () {

    }

}
