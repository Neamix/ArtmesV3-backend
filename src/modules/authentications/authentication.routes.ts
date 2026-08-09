import { Router } from "express";
import { AuthenticationController } from "./authentication.controller.js";
import { validateRequest } from "../../utilities/validateRequest.js";
import { loginSchema, registerSchema } from "../users/user.validation.js";
import { AuthenticationService } from "./authentication.service.js";

const authRoutes = Router();
const authController = new AuthenticationController(new AuthenticationService);

authRoutes.post('/register',validateRequest(registerSchema),authController.register);
authRoutes.post('/login',validateRequest(loginSchema),authController.login);

export default authRoutes;