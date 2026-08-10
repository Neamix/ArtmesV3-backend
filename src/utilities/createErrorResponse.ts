type ErrorValue = string | string[];

export function createErrorResponse<const TErrors extends Record<string, ErrorValue>>(
    errors: TErrors,
    message?: string,
) {
    const firstError = Object.values(errors)[0];
    const defaultMessage = Array.isArray(firstError) ? firstError[0] : firstError;

    return {
        status: false as const,
        errors,
        message: message ?? defaultMessage ?? "Request failed",
    };
}
