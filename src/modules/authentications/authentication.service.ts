import type { UserCreateInput, UserModel } from "../../generated/prisma/models.js";
import { verifyPassword } from "../../utilities/hash.js";
import { generateToken } from "../../utilities/jwt.js";
import { UserService } from "../users/user.service.js";

export class AuthenticationService {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async login (userData: UserCreateInput) {
        const user:UserModel | null = await this.userService.findUserByEmail(userData.email);
        if (!user) {
            return {
                'status': false,
                'message': "Wrong user credentials",
            }
        }

        const passwordMatching = await verifyPassword(userData.password,user.password);
        if (!passwordMatching) {
            return {
                'status': false,
                'message': "Wrong user credentials",
            }
        }

        const access_token = generateToken(user.id);

        return {
            'status': true,
            'access_token': access_token,
        }
    }

    async register () {

    }


    async refreshToken () {

    }

}
