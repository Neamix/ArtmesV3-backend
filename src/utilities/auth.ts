import { requestContext } from "@/context/requestContext.js";

export function authUser() {
    const user = requestContext.getStore()?.user;
    if (!user) {
        throw new Error("Failed to get the authenticated user");
    }

    return user;
}
