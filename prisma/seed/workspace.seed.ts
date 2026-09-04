import { prisma } from "../../src/lib/prisma.js";

export async function seedWorkspaces() {
    const workspace = await prisma.workspace.upsert({
        where: {
            slug: "artmes-studio",
        },
        update: {},
        create: {
            slug: "artmes-studio",
            name: "Artmes Studio",
            owner: {
                connect: {
                    email: "ahmed.ali@example.com",
                },
            },
            members: {
                connect: {
                    email: "ahmed.ali@example.com",
                },
            }
        },
    });

}
