import type { Request, Response } from "express";
import { AuthenticationService } from "./authentication.service.js";
import type { ForgetInput, LoginInput, RegisterInput } from "./authentication.validation.js";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../lib/auth.js";

export class AuthenticationController {
    me = async (req: Request,res: Response) => {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        return session;
    }
}
