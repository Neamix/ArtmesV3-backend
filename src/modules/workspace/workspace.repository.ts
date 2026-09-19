import type { WorkspaceWhereInput } from "../../generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";
import type { WorkspaceFilters } from "./workspace.types.js";

export class WorkspaceRepository {
    findMany(filters: WorkspaceFilters) {
        const whereArray:WorkspaceWhereInput = {};

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

        prisma.workspace.findMany({
            where: whereArray 
        });
    }
}
