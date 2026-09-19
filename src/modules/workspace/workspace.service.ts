import { WorkspaceRepository } from "./workspace.repository.js";
import type { WorkspaceFilters } from "./workspace.types.js";

export class WorkspaceService {
    constructor(
        private readonly workspaceRepository = new WorkspaceRepository(),
    ) {}

    public filter(filters: WorkspaceFilters) {
        return this.workspaceRepository.findMany(filters);
    }
}
