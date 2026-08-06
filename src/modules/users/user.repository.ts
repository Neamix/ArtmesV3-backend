import type {
    UserCreateInput,
    UserModel,
    UserUpdateInput,
} from "../../generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";

export class UserRepository {
    findById(id: number): Promise<UserModel | null> {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    findByEmail(email: string): Promise<UserModel | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    create(userData: UserCreateInput): Promise<UserModel> {
        return prisma.user.create({
            data: userData,
        });
    }

    update(id: number, userData: UserUpdateInput): Promise<UserModel> {
        return prisma.user.update({
            where: { id },
            data: userData,
        });
    }

    delete(id: number): Promise<UserModel> {
        return prisma.user.delete({
            where: { id },
        });
    }
}
