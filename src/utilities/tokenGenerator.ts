import { randomBytes } from "node:crypto";
import { promisify } from "node:util";

export default async function tokenGenerator() {
    const randomByteAsyc = promisify(randomBytes);
    return (await randomByteAsyc(16)).toString("hex");
}
