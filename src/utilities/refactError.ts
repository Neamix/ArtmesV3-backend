import type { ZodIssue } from "zod";

export function refactErrors(errors: ZodIssue[]): Record<string, string> {
    const formattedErrors: Record<string, string> = {};

    errors.forEach(error => {
        const path = error.path.join(".") || "root";
        formattedErrors[path] ??= error.message;
    });

    return formattedErrors;
}
