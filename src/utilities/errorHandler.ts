import type { NextFunction, Request, Response } from "express";
import { isAPIError } from "better-auth/api";

/**
 * Express' default error handler renders an HTML page, which is useless to an
 * API client. This turns everything — including Better Auth's `APIError`, which
 * our `hooks.before` throws — into JSON with the original status preserved.
 *
 * Must be registered after every route, and must keep all four parameters or
 * Express will treat it as ordinary middleware and never call it.
 */
export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    if (res.headersSent) {
        next(error);
        return;
    }

    if (isAPIError(error)) {
        res.status(error.statusCode).json(error.body);
        return;
    }

    console.error("Unhandled error", error);
    res.status(500).json({
        status: false,
        message: "Internal server error",
        code: 500,
    });
}
