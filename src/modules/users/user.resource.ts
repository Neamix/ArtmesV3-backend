import type { UserModel } from "../../generated/prisma/models.js";

export default function userResource(user: UserModel) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
