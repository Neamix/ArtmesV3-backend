import type { ZodType, infer as ZodInfer } from "zod";
import { createErrorResponse } from "./createErrorResponse.js";
import { refactErrors } from "./refactError.js";

export type ValidationFailure = ReturnType<typeof createErrorResponse>;

export type ValidationResult<T extends ZodType> =
    | { success: true; data: ZodInfer<T> }
    | { success: false; failure: ValidationFailure };


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
