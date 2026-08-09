import type { ZodIssue } from "zod";

export function refactErrors(errors: ZodIssue[]): Record<string, string[]> {
    const arrayOfErrors: Record<string, string[]> = {};

    errors.forEach(error => {
        const path = error.path.join(".") || "root";
        (arrayOfErrors[path] ??= []).push(error.message);
    });

    return arrayOfErrors;
}
