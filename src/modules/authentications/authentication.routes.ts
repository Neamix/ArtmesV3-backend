import { Router } from "express";
import { AuthenticationController } from "./authentication.controller.js";
import { validateRequest } from "../../utilities/validateRequest.js";
import { forgetSchema, loginSchema, registerSchema, resendVerificationSchema, resetSchema } from "./authentication.validation.js";
import { AuthenticationService } from "./authentication.service.js";
import { limiter } from "../../utilities/createAuthLimiter.js";

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

authRoutes.post(
    "/forget-password",
    limiter(10),
    validateRequest(forgetSchema),
    authController.forgetPassword,
);

authRoutes.post(
    "/resend-verification",
    limiter(5),
    validateRequest(resendVerificationSchema),
    authController.resendVerification,
);

authRoutes.post(
    "/reset-password",
    limiter(10),
    validateRequest(resetSchema),
    authController.resetPassword,
);

authRoutes.post("/logout", authController.logout);

authRoutes.get("/me", authController.me);

export default authRoutes;
