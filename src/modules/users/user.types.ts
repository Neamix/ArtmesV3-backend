import type { JwtPayload } from "jsonwebtoken";

export interface AccessTokenPayload extends JwtPayload {
    userID: number;
}
