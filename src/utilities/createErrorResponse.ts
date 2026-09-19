type ErrorValue = string | string[];

export function createErrorResponse(
    errors: Record<string, ErrorValue>,
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
