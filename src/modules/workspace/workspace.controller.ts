import type { Request, Response } from "express";
import { WorkspaceService } from "./workspace.service.js";
import type { WorkspaceFilters } from "./workspace.types.js";
import WorkspaceResource from "./workspace.resource.js";
import type { WorkspaceInput, WorkspaceUpdate } from "./workspace.validation.js";
import { createErrorResponse } from "../../utilities/createErrorResponse.js";

export class WorkspaceController {
    constructor(
        private readonly workspaceService = new WorkspaceService()
    ) {}

    public index = async (req: Request,res: Response) => {
        const { name, use_for } = req.body as WorkspaceFilters;
        const workspaces = await this.workspaceService.filter({name, use_for});

        return res.status(200).send(workspaces.map(WorkspaceResource))
    }

    public find = async (req: Request,res: Response) => {
        const workspace_id = req.params["workspace_id"] as string;
        const workspace = await this.workspaceService.find(workspace_id, this.userId(req));

        if (!workspace) {
            return res.status(404).json({
                ...createErrorResponse({ workspace_id: "Workspace not found" }),
                code: 404,
            });
        }

        return res.status(200).send(WorkspaceResource(workspace))
    }

    public create = async (req: Request,res: Response) => {
        const { name, use_for } = req.body as WorkspaceInput;
        const workspace = await this.workspaceService.create({name,use_for},this.userId(req));

        return res.status(201).send(WorkspaceResource(workspace))
    }

    public update = async (req: Request,res: Response) => {
        const { workspace_id, name, use_for } = req.body as WorkspaceUpdate;
        const workspace = await this.workspaceService.update({workspace_id,name,use_for},this.userId(req));

        if (!workspace) {
            return res.status(404).json({
                ...createErrorResponse({ workspace_id: "Workspace not found" }),
                code: 404,
            });
        }

        return res.status(200).send(WorkspaceResource(workspace))
    }

    /**
     * `authMiddleware` guarantees a session, and Better Auth types every id as a
     * string even though ours are serial integers.
     */
    private userId(req: Request) {
        return Number(req.user?.id);
    }
}
