import { Router } from "express";
import type { Request, Response } from "express";
import { AuthenticationController } from "./authentication.controller.js";
import { validateRequest } from "../../utilities/validateRequest.js";
import { loginSchema, registerSchema } from "./authentication.validation.js";
import { AuthenticationService } from "./authentication.service.js";
import { limiter } from "../../utilities/createAuthLimiter.js";
import nodemailer from "nodemailer";
import { renderWelcomeEmail } from "../../emails/renderWelcomeEmail.js";
import { fileURLToPath } from "node:url";

const authRoutes = Router();
const authController = new AuthenticationController(new AuthenticationService);
const logoPath = fileURLToPath(
    new URL("../../../public/Logos/logo.png", import.meta.url),
);

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
            subject: "Welcome to Artmes — your workspace is ready",
            html,
            attachments: [
                {
                    filename: "artmes-logo.png",
                    path: logoPath,
                    cid: "artmes-logo@artmes",
                    contentDisposition: "inline",
                },
            ],
            text: [
                "Welcome to Artmes, Abdalrhman.",
                "",
                "Your workspace is ready. Start by creating your pipeline, adding your first leads, and inviting your team.",
                "",
                "Open your workspace and start moving deals forward.",
                "",
                "Need help? Contact support@artmes.com.",
            ].join("\n"),
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
