import { email, z } from "zod";

const emailField = z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .max(254, "Email must not exceed 254 characters")
    .pipe(z.email({ error: "Email must be a valid email address" }));

const loginPasswordField = z
    .string({ error: "Password is required" })
    .min(1, "Password is required")
    .refine((password) => Buffer.byteLength(password, "utf8") <= 72, {
        message: "Password must not exceed 72 bytes",
    });

const registerPasswordField = z
    .string({ error: "Password is required" })
    .min(8, "Password must contain at least 8 characters")
    .max(30, "Password must not exceed 30 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")

export const registerSchema = z.object({
    name: z
        .string({ error: "Name is required" })
        .trim()
        .min(1, "Name is required")
        .max(100, "Name must not exceed 100 characters"),
    email: emailField,
    password: registerPasswordField,
});

export const forgetSchema = z.object({
    email: emailField
})

export const resendVerificationSchema = z.object({
    email: emailField
})

export const resetSchema = z.object({
    token: z
        .string({ error: "Reset token is required" })
        .trim()
        .min(1, "Reset token is required"),
    password: registerPasswordField,
})


export const loginSchema = z.object({
    email: emailField,
    password: loginPasswordField,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgetInput = z.infer<typeof forgetSchema>
export type ResetInput = z.infer<typeof resetSchema>
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>
