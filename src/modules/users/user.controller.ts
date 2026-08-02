import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

export class UserController {
    static async register(req: Request, res: Response): Promise<Response> {
        return res.status(201).json({
            status: "success",
            data: {
                name: "Abdalrhman",
            },
        });
    }

    static async findUser(req: Request, res: Response): Promise<Response> {
        const user = await prisma.user.findUnique({
            where: {email: 'ahmed.ali@example.com'}
        });

        return res.status(201).json({
            data: user
        })
    }
}
