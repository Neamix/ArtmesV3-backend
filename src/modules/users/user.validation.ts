import { z } from "zod";

const emailField = z.email({
    error: (issue) =>
        issue.input === undefined
            ? "Email is required"
            : "Email must be a valid email address",
});

const passwordField = z
    .string({ error: "Password is required" })
    .min(1, "Password is required");

export const registerSchema = z.object({
    name: z
        .string({ error: "Name is required" })
        .trim()
        .min(1, "Name is required"),
    email: emailField,
    password: passwordField,
});

export const loginSchema = z.object({
    email: emailField,
    password: passwordField,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
