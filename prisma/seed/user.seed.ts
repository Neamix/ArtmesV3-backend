import { prisma } from "../../src/lib/prisma.js";
import { hashPassword } from "../../src/utilities/hash.js";

export async function seedUsers() {
    const password = await hashPassword("password123");
    const users = [
        {
            name: "Ahmed Ali",
            email: "ahmed.ali@example.com",
            nationality: "Egyptian",
        },
        {
            name: "Sara Hassan",
            email: "sara.hassan@example.com",
            nationality: "Jordanian",
        },
        {
            name: "Omar Khaled",
            email: "omar.khaled@example.com",
            nationality: "Saudi",
        },
        {
            name: "Mariam Adel",
            email: "mariam.adel@example.com",
            nationality: "Lebanese",
        },
        {
            name: "Youssef Samir",
            email: "youssef.samir@example.com",
            nationality: "Moroccan",
        },
    ];

    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: { nationality: user.nationality },
            create: {
                ...user,
                password,
            },
        });
    }

    console.log(`Seeded ${users.length} users.`);
}
