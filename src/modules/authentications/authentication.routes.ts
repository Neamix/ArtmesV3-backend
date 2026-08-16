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
import redisClient from "../../lib/redisClient.js";

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


authRoutes.get("/test-redis", async (req: Request, res: Response) => {
    await redisClient.mSet([
        ['user:views:1','1'],
        ['user:views:2','5'],
        ['user:views:3','6']
    ]);

    await redisClient.incrBy('user:views:1',10);
    
    return res.send({
        'user': await redisClient.get('user:1')
    });
});

export default authRoutes;
