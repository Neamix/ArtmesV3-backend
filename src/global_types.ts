export type validationError = {
    expected: string,
    code: string,
    path: {
        name: string
    },
    message: string
}