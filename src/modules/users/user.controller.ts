import type { Request, Response } from "express";

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
        const id = req.params.id;

        return res.status(201).json({
            status: "success",
            data: {
                id: id,
                name: "Abdalrhman",
            },
        });
    }
}
