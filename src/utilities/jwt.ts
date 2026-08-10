import "dotenv/config";
import jwt from "jsonwebtoken";
import type { AccessTokenPayload } from "../modules/users/user.types.js";

const ACCESS_TOKEN_ALGORITHM = "HS256" as const;
const ACCESS_TOKEN_ISSUER = process.env.ACCESS_TOKEN_ISSUER ?? "artmes-api";
const ACCESS_TOKEN_AUDIENCE = process.env.ACCESS_TOKEN_AUDIENCE ?? "artmes-client";

function getAccessTokenSecret(): string {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if (!accessTokenSecret) {
        throw new Error("ACCESS_TOKEN_SECRET does not exist in the environment");
    }

    if (Buffer.byteLength(accessTokenSecret, "utf8") < 32) {
        throw new Error("ACCESS_TOKEN_SECRET must contain at least 32 bytes");
    }

    return accessTokenSecret;
}

export function validateJwtConfiguration(): void {
    getAccessTokenSecret();
}

export function generateToken(userID: number): string {
    return jwt.sign(
        { userID },
        getAccessTokenSecret(),
        {
            algorithm: ACCESS_TOKEN_ALGORITHM,
            audience: ACCESS_TOKEN_AUDIENCE,
            expiresIn: "1h",
            issuer: ACCESS_TOKEN_ISSUER,
        },
    );
}


export function extractTokenData(token: string): AccessTokenPayload {
    const payload = jwt.verify(token, getAccessTokenSecret(), {
        algorithms: [ACCESS_TOKEN_ALGORITHM],
        audience: ACCESS_TOKEN_AUDIENCE,
        issuer: ACCESS_TOKEN_ISSUER,
    });

    if (typeof payload === "string" || typeof payload.userID !== "number") {
        throw new Error("Invalid access token payload");
    }

    return {
        ...payload,
        userID: payload.userID,
    };
}
