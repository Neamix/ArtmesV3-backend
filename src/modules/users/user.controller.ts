import type { Request, Response } from "express";
import { UserService } from "./user.service.js";

const userService = new UserService();

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
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        const user = await userService.findUserById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const { password: _password, ...safeUser } = user;

        return res.status(200).json({
            data: safeUser,
        });
    }
}
