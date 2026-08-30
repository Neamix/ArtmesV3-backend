import type { Request, Response } from "express";
import { AuthenticationService } from "./authentication.service.js";
import type { ForgetInput, LoginInput, RegisterInput } from "./authentication.validation.js";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../lib/auth.js";
import { sendAuthResponse } from "../../utilities/sendAuthResponse.js";

export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    register = async (req: Request, res: Response) => {
        const { name, email, password } = req.body as RegisterInput;

        const response = await auth.api.signUpEmail({
            body: { name, email, password },
            headers: fromNodeHeaders(req.headers),
            asResponse: true,
        });

        return sendAuthResponse(res, response);
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body as LoginInput;

        const response = await auth.api.signInEmail({
            body: { email, password },
            headers: fromNodeHeaders(req.headers),
            asResponse: true,
        });

        return sendAuthResponse(res, response);
    }

    logout = async (req: Request, res: Response) => {
        const response = await auth.api.signOut({
            headers: fromNodeHeaders(req.headers),
            asResponse: true,
        });

        return sendAuthResponse(res, response);
    }

    forgetPassword = async (req: Request, res: Response) => {
        const result = await this.authService.forgetPassword(req.body as ForgetInput);
        return res.status(result.code).json(result);
    }

    me = async (req: Request, res: Response) => {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        return res.json(session);
    }
}
