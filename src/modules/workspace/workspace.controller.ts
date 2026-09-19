import type { Request, Response } from "express";
import { WorkspaceService } from "./workspace.service.js";

export class WorkspaceController {
    constructor(
        private readonly workspaceService = new WorkspaceService()
    ) {}

    public async index(req: Request,res: Response) {
        
    }
}
