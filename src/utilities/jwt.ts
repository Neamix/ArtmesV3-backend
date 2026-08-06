import jwt from "jsonwebtoken";
import type { AccessTokenPayload } from "../modules/users/user.types.js";


function getAccessTokenSecret(): string {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if (!accessTokenSecret) {
        throw new Error("ACCESS_TOKEN_SECRET does not exist in the environment");
    }

    return accessTokenSecret;
}

export function generateToken(userID: number): string {
    return jwt.sign({ userID },getAccessTokenSecret(),{ expiresIn: "1h" });
}


export function extractTokenData(token: string): AccessTokenPayload {
    const payload = jwt.verify(token, getAccessTokenSecret());

    if (typeof payload === "string" || typeof payload.userID !== "number") {
        throw new Error("Invalid access token payload");
    }

    return {
        ...payload,
        userID: payload.userID,
    };
}
