import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { refactErrors } from "./refactError.js";

export function validateRequest<T extends ZodType>(schema: T) {
    return (req: Request, res: Response, next: NextFunction): void => {
        console.log(req.headers["content-type"]);
        console.log(req.body);
        const result = schema.safeParse(req.body ?? {});

        // In case error take place
        if (!result.success) {
            res.status(422).json({
                message: "Validation failed",
                errors: refactErrors(result.error.issues),
            });

            return;
        }

        // In case of success
        req.body = result.data;
        next();
    };
}
