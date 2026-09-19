import { Router } from "express";
import { WorkspaceController } from "./workspace.controller.js";
import { authMiddleware } from "../users/middlewares/authMIddleware.js";
import { validateRequest } from "../../utilities/validateRequest.js";
import { workspaceSchema, workspaceUpdateSchema } from "./workspace.validation.js";

const workspaceRoute = Router();
const workspaceController = new WorkspaceController();

workspaceRoute.use(authMiddleware);

workspaceRoute.get(
    '/all',
    workspaceController.index
);

workspaceRoute.get(
    '/:workspace_id',
    workspaceController.find
);

workspaceRoute.post(
    '/create',
    validateRequest(workspaceSchema),
    workspaceController.create,
);

workspaceRoute.post(
    '/update',
    validateRequest(workspaceUpdateSchema),
    workspaceController.update,
);

export default workspaceRoute;
