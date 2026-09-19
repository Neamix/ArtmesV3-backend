import { authUser } from "@/utilities/auth.js";
import type { WorkspaceWhereInput } from "../../generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";
import type { WorkspaceFilters, WorkspaceIdentity } from "./workspace.types.js";
import type { WorkspaceInput, WorkspaceUpdate } from "./workspace.validation.js";

export class WorkspaceRepository {
    find(data: WorkspaceIdentity) {
        return prisma.workspace.findFirst({
            where: {
                id: data.workspace_id,
                user_id: data.user_id
            }
        });
    }

    findMany(filters: WorkspaceFilters) {
        const whereArray:WorkspaceWhereInput = {};

        whereArray.user_id = Number(authUser().id)

        if (filters.name) {
            whereArray.name = {
                contains: filters.name,
                mode: "insensitive"
            }
        }

        if (filters.use_for) {
            whereArray.use_for = {
                equals: filters.use_for
            }
        }

        return prisma.workspace.findMany({
            where: whereArray 
        });
    }

    create(data: WorkspaceInput) {
        return prisma.workspace.create({
            data: {
                name: data.name,
                use_for: data.use_for,
                user_id: Number(authUser().id)
            }
        });
    }

    update(data: WorkspaceUpdate & { user_id: number }) {
        return prisma.workspace.update({
            where: {
                id: data.workspace_id,
                user_id: Number(authUser().id)
            },
            data: {
                name: data.name,
                use_for: data.use_for
            }
        });
    }
}
