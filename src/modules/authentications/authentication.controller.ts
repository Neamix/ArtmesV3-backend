import type { Request, Response } from "express";
import { AuthenticationService } from "./authentication.service.js";
import type { LoginInput, RegisterInput } from "../users/user.validation.js";

export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {} 
       
    register = async (req: Request,res: Response) => {
        const result = await this.authService.register(req.body as RegisterInput);

        return res.status(result.code).json(result);
    } 

    login = async (req: Request,res: Response) => {
        const result = await this.authService.login(req.body as LoginInput);

        return res.status(result.code).json(result);
    }
}
