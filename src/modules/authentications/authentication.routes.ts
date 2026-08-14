import { Router } from "express";
import type { Request, Response } from "express";
import { AuthenticationController } from "./authentication.controller.js";
import { validateRequest } from "../../utilities/validateRequest.js";
import { loginSchema, registerSchema } from "./authentication.validation.js";
import { AuthenticationService } from "./authentication.service.js";
import { limiter } from "../../utilities/createAuthLimiter.js";
import nodemailer from "nodemailer";
import { renderWelcomeEmail } from "../../emails/renderWelcomeEmail.js";

const authRoutes = Router();
const authController = new AuthenticationController(new AuthenticationService);

authRoutes.post(
    "/register",
    limiter(5),
    validateRequest(registerSchema),
    authController.register,
);

authRoutes.post(
    "/login",
    limiter(10),
    validateRequest(loginSchema),
    authController.login,
);


authRoutes.get(
    "/test-email",
    async (_req: Request, res: Response) => {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            connectionTimeout: 10_000,
            greetingTimeout: 10_000,
            socketTimeout: 15_000,
            auth: {
                user: "9bb275809f4be9",
                pass: "9988feeedd6228",
            },
        });

        const html = await renderWelcomeEmail({
            name: "Abdalrhman",
        });

        const info = await transporter.sendMail({
            from: "Artmes",
            subject: "Artmes - Welcome to Artmes",
            html,
            text: "Welcome, Abdalrhman! Verify your email to finish creating your account.",
            to: "abdalrhmanhussin44@gmail.com",
        });

        return res.status(200).json({
            status: true,
            message: "Test email sent successfully",
            messageId: info.messageId,
        });
    },
);
export default authRoutes;
