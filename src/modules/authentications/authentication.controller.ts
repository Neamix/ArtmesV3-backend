import type { Request, Response } from "express";
import { AuthenticationService } from "./authentication.service.js";
import type { ForgetInput, LoginInput, RegisterInput, ResetInput } from "./authentication.validation.js";
import { fromNodeHeaders } from "better-auth/node";

export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    register = async (req: Request, res: Response) => {
        const { name, email, password } = req.body as RegisterInput;
        const result = await this.authService.register({ name, email, password });
        
        if (!result.status) {
            res.status(result.code).json(result);
        }

        return res.status(result.code).json({user: result.payload?.user,token: result.payload?.token});
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body as LoginInput;
        const result = await this.authService.login({email,password});

        return res.status(result.code).json({user: result.payload?.user,token: result.payload?.token});
    }

    logout = async (req: Request, res: Response) => {
        const { headers, ...result } = await this.authService.logout(
            fromNodeHeaders(req.headers),
        );


        return res.status(result.code).json(result);
    }

    forgetPassword = async (req: Request, res: Response) => {
        const { email } = req.body as ForgetInput;
        const result = await this.authService.forgetPassword({email});
        
        return res.status(result.code).json(result);
    }

    resetPassword = async (req: Request, res: Response) => {
        const { token, password } = req.body as ResetInput;
        const result = await this.authService.resetPassword({ token, password });

        return res.status(result.code).json(result);
    }

    me = async (req: Request, res: Response) => {
        const { headers, ...result } = await this.authService.me(
            fromNodeHeaders(req.headers),
        );

        this.authService.applyAuthHeaders(res, headers);

        return res.status(result.code).json({user: result.payload?.user});
    }
}
