import { randomBytes } from "node:crypto";
import { scrypt } from "node:crypto";
import { promisify } from "node:util";

const scryptSync = promisify(scrypt);

// export function hashPassword(password:string) {
//     const salt = randomBytes(16);
//     const hash = await scryptSync(password,salt,64);

//     return `${salt.toString("hex"):${hash.toString("hex")}}`;
// }


