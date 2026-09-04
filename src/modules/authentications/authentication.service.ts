import { createErrorResponse } from "../../utilities/createErrorResponse.js";
import { UserService } from "../users/user.service.js";
import type { ForgetInput, LoginInput, RegisterInput, ResendVerificationInput, ResetInput } from "./authentication.validation.js";
import { auth } from "../../lib/auth.js";
import type { Response } from "express";
import { isAPIError } from "better-auth/api";


export class AuthenticationService {
    private readonly userService: UserService = new UserService;

    async register(userData: RegisterInput) {
        try {
            const {response,headers} = await auth.api.signUpEmail({
                returnHeaders: true,
                body: {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                },
            });

            return {
                status: true as const,
                code: 201,
                payload: response,
                headers
            };
        } catch (e) {
            if (isAPIError(e)) {
                return {
                    ...createErrorResponse({
                        root: e.message
                    }),
                    code: 422,
                };
            }

            throw e;
        }
    }

    async login(userData: LoginInput) {
        try {
            const {response, headers} = await auth.api.signInEmail({
                body: {
                    email: userData.email,
                    password: userData.password,
                    rememberMe: true,
                },

                returnHeaders: true
            });

            return {
                status: true,
                code: 200,
                payload: response,
                headers
            }
        } catch(e) {
            if (isAPIError(e)) {
                return {
                    code: e.statusCode,
                    ...createErrorResponse({
                        root: e.message
                    }),
                    status: false,
                }
            }

            throw e;
        }
    }

    async checkDuplicateEmail(userData: RegisterInput) {
        const checkUserByEmail = await this.userService.findUserByEmail(userData.email);
        if (checkUserByEmail) {
            return false
        }

        return true;
    }

    async forgetPassword(forgetData: ForgetInput) {
        const response = await auth.api.requestPasswordReset({
            body: {
                email: forgetData.email,
            },
        });

        return {
            status: true as const,
            code: 200,
            message: response.message,
        };
    }

    async resendVerification(resendData: ResendVerificationInput) {
        try {
            await auth.api.sendVerificationEmail({
                body: {
                    email: resendData.email,
                },
            });

            return {
                status: true as const,
                code: 200,
                message: "If that address needs verifying, a new link is on its way",
            };
        } catch (error) {
            if (isAPIError(error)) {
                return {
                    ...createErrorResponse({
                        root: error.message,
                    }),
                    code: error.statusCode,
                };
            }

            throw error;
        }
    }

    async resetPassword(resetData: ResetInput) {
        try {
            const response = await auth.api.resetPassword({
                body: {
                    newPassword: resetData.password,
                    token: resetData.token,
                },
            });

            return {
                status: true as const,
                code: 200,
                message: "Password reset successfully",
                payload: response,
            };
        } catch (error) {
            if (isAPIError(error)) {
                return {
                    ...createErrorResponse({
                        root: error.message,
                    }),
                    code: error.statusCode,
                };
            }

            throw error;
        }
    }

    async me(headers: Headers) {
        const { response: session, headers: responseHeaders } = await auth.api.getSession({
            headers,
            returnHeaders: true,
        });

        if (!session) {
            return {
                ...createErrorResponse({
                    root: "Unauthorized",
                }),
                code: 401,
                headers: responseHeaders,
            };
        }

        return {
            status: true as const,
            code: 200,
            payload: session,
            headers: responseHeaders,
        };
    }

    async logout(headers: Headers) {
        const { response, headers: responseHeaders } = await auth.api.signOut({
            headers,
            returnHeaders: true,
        });

        return {
            status: true as const,
            code: 200,
            payload: response,
            headers: responseHeaders,
        };
    }



    applyAuthHeaders(res: Response, headers: Headers) {
        const cookies = headers.getSetCookie();

        for (const cookie of cookies) {
            res.append("Set-Cookie", cookie);
        }
    }

}
