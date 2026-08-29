import { Router } from "express";
import { UserController } from "./user.controller.js";
import { authMiddleware } from "./middlewares/authMIddleware.js";
import { uploadAvatar } from "./middlewares/avatarMIddleware.js";

const userRouter = Router();

userRouter.use(authMiddleware);
userRouter.post(
    "/change-avatar",
    uploadAvatar.single("avatar"),
    UserController.changeAvatar,
);

export default userRouter;
