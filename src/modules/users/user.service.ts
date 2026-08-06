import type {
    UserCreateInput,
    UserModel,
    UserUpdateInput,
} from "../../generated/prisma/models.js";
import { UserRepository } from "./user.repository.js";

export class UserService {
    constructor(private readonly userRepository = new UserRepository()) {}

    findUserById(id: number): Promise<UserModel | null> {
        return this.userRepository.findById(id);
    }

    findUserByEmail(email: string): Promise<UserModel | null> {
        return this.userRepository.findByEmail(email);
    }

    createUser(userData: UserCreateInput): Promise<UserModel> {
        return this.userRepository.create(userData);
    }

    updateUser(id: number, userData: UserUpdateInput): Promise<UserModel> {
        return this.userRepository.update(id, userData);
    }

    deleteUser(id: number): Promise<UserModel> {
        return this.userRepository.delete(id);
    }
}
