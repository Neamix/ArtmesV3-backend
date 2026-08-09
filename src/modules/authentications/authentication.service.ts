import { Prisma } from "../../generated/prisma/client.js";
import type { UserCreateInput, UserModel } from "../../generated/prisma/models.js";
import { hashPassword, verifyPassword } from "../../utilities/hash.js";
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

    async register (userData: UserCreateInput) {
        try {
            const userRegister = await this.userService.createUser({
                ...userData,
                password: await hashPassword(userData.password)
            });
            
            const token = generateToken(userRegister.id);

            return {
                'status': true,
                'code': 200,
                'payload': {
                    'user': {
                        name: userRegister.name,
                        avatar: userRegister.avatar
                    },
                    'token': token
                }
            }
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == "P2002") {
                return {
                    'status': false,
                    'code': 409,
                    'error': 'This email already has been used before'
                }
            }

            return {
                'status': false,
                'code': 500,
                'error': "We got an error during register and our team working on it"
            }
        }

    }


    async refreshToken () {

    }

}
