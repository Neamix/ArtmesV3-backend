import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../../lib/auth.js";
import type { Request, Response } from 'express';
import { requestContext } from "@/context/requestContext.js";

export async function authMiddleware(req: Request,res: Response ,next: () => void) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        if (!session) return res.status(401).json({
            message: "Unauthorized"
        });

        req.user = session.user;

        requestContext.run({
            user: req.user
        },() => {
            next();
        });

    } catch (error) {
        throw error;
    }
}
