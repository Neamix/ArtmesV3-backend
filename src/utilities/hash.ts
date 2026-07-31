import bcrypt from 'bcrypt';

export async function  hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(password,16);
    return hashPassword;
}

export async function verifyPassword(password: string,hash: string) {
    const isMatch = await bcrypt.compare(password,hash);
    return isMatch;
}