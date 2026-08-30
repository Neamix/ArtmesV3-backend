import type { Request, Response } from "express";
import { AuthenticationService } from "./authentication.service.js";
import type { ForgetInput, LoginInput, RegisterInput } from "./authentication.validation.js";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../lib/auth.js";

export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    register = async (req: Request, res: Response) => {
        const result = await this.authService.register(req.body as RegisterInput);
        return res.status(result.code).json(result);
    }

    login = async (req: Request, res: Response) => {
        const result = await this.authService.login(req.body as LoginInput);
        return res.status(result.code).json(result);
    }

    forgetPassword = async (req: Request, res: Response) => {
        const result = await this.authService.forgetPassword(req.body as ForgetInput);
        return res.status(result.code).json(result);
    }

    me = async (req: Request,res: Response) => {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        return res.json(session);
    }
}
