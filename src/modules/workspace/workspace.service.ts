import { Prisma } from "../../generated/prisma/client.js";
import { WorkspaceRepository } from "./workspace.repository.js";
import type { WorkspaceFilters } from "./workspace.types.js";
import type { WorkspaceInput, WorkspaceUpdate } from "./workspace.validation.js";

export class WorkspaceService {
    constructor(
        private readonly workspaceRepository = new WorkspaceRepository(),
    ) {}

    public filter(filters: WorkspaceFilters) {
        return this.workspaceRepository.findMany(filters);
    }

    public find(workspace_id: string, user_id: number) {
        return this.workspaceRepository.find({ workspace_id, user_id });
    }

    public create(data: WorkspaceInput) {
        return this.workspaceRepository.create(data);
    }

    public async update(data: WorkspaceUpdate, user_id: number) {
        try {
            return await this.workspaceRepository.update({ ...data, user_id });
        } catch (error) {
            // P2025: no workspace matches that id for this user — either it does
            // not exist or it belongs to someone else. Both answer the same way.
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
                return null;
            }

            throw error;
        }
    }
}
