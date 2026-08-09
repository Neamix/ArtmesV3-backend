import type { Request, Response } from "express";
import { AuthenticationService } from "./authentication.service.js";
import type { UserCreateInput } from "../../generated/prisma/models.js";

export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {} 
       
    register = async (req: Request,res: Response) => {
        const result = await this.authService.register(req.body as UserCreateInput);

        if (!result.status) {
            return res.status(422).send(result);        
        }

        return res.status(200).send(result);
    } 

    login = async (req: Request,res: Response) => {

    }
}