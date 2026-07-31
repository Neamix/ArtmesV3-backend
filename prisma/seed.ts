import { prisma } from "../src/lib/prisma.js";
import { hashPassword } from "../src/utilities/hash.js";

async function seed() {
    const password = await hashPassword("password123");
    const result = await prisma.user.createMany({
        data: [
            {
                name: "Ahmed Ali",
                email: "ahmed.ali@example.com",
                password,
            },
            {
                name: "Sara Hassan",
                email: "sara.hassan@example.com",
                password,
            },
            {
                name: "Omar Khaled",
                email: "omar.khaled@example.com",
                password,
            },
            {
                name: "Mariam Adel",
                email: "mariam.adel@example.com",
                password,
            },
            {
                name: "Youssef Samir",
                email: "youssef.samir@example.com",
                password,
            },
        ],
        skipDuplicates: true,
    });

    console.log(`Seeded ${result.count} users.`);
}

try {
    await seed();
} catch (error) {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
} finally {
    await prisma.$disconnect();
}
