import type { auth } from "@/lib/auth.js";
import { AsyncLocalStorage } from "node:async_hooks";

type RequestContext = {
    user: (typeof auth.$Infer.Session)["user"];
};

export const requestContext = new AsyncLocalStorage<RequestContext>();
