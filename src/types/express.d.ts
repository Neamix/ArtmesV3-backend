import type { auth } from "../lib/auth.js";

type AuthUser = (typeof auth.$Infer.Session)["user"];

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
