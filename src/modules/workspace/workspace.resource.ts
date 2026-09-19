import type { WorkspaceModel } from "../../generated/prisma/models.js";

export default function WorkspaceResource(workspace: WorkspaceModel) {
    return {
        id: workspace.id,
        name: workspace.name,
        use_for: workspace.use_for,
        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt
    }
}