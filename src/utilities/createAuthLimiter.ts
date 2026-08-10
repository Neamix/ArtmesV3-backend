import { rateLimit } from "express-rate-limit";
import { createErrorResponse } from "./createErrorResponse.js";

export function limiter(limit: number,time?: number) {
    return rateLimit({
        windowMs: (time ?? 15) * 60 * 1000,
        limit,
        standardHeaders: "draft-8",
        legacyHeaders: false,
        handler: (_req, res) => {
            res.status(429).json({
                ...createErrorResponse({
                    root: "Too many attempts. Please try again later.",
                }),
                code: 429,
            });
        },
    });
}
