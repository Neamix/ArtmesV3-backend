import type { Request, Response } from "express";

export class UserController {
    static async register(_req: Request, res: Response): Promise<Response> {
        return res.status(201).json({
            status: "success",
            data: {
                name: "Abdalrhman",
            },
        });
    }
}
