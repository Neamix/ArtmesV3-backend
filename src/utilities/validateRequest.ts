import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { createErrorResponse } from "./createErrorResponse.js";
import { refactErrors } from "./refactError.js";

export function validateRequest<T extends ZodType>(schema: T) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body ?? {});

        // In case error take place
        if (!result.success) {
            res.status(422).json({
                ...createErrorResponse(
                    refactErrors(result.error.issues),
                    "Validation failed",
                ),
                code: 422,
            });

            return;
        }

        // In case of success
        req.body = result.data;
        next();
    };
}
