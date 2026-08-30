import type { ZodType, infer as ZodInfer } from "zod";
import { createErrorResponse } from "./createErrorResponse.js";
import { refactErrors } from "./refactError.js";

export type ValidationFailure = ReturnType<typeof createErrorResponse<Record<string, string>>>;

export type ValidationResult<T extends ZodType> =
    | { success: true; data: ZodInfer<T> }
    | { success: false; failure: ValidationFailure };

/**
 * Single source of truth for schema validation. Both the Express middleware
 * (`validateRequest`) and the Better Auth `hooks.before` middleware run their
 * payloads through this, so /api/v1/register and /api/auth/sign-up/email
 * enforce identical rules and report identical error shapes.
 */
export function validateSchema<T extends ZodType>(
    schema: T,
    payload: unknown,
): ValidationResult<T> {
    const result = schema.safeParse(payload ?? {});

    if (!result.success) {
        return {
            success: false,
            failure: createErrorResponse(refactErrors(result.error.issues), "Validation failed"),
        };
    }

    return { success: true, data: result.data };
}
