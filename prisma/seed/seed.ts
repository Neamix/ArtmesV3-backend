import { prisma } from "../../src/lib/prisma.js";
import { seedUsers } from "./user.seed.js";
import { seedWorkspaces } from "./workspace.seed.js";

async function seed() {
    await seedUsers();
    await seedWorkspaces();
}

try {
    await seed();
} catch (error) {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
} finally {
    await prisma.$disconnect();
}
