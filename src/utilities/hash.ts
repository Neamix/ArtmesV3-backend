import bcrypt from 'bcrypt';

export async function  hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    
    return hashPassword;
}

export async function verifyPassword(password: string,hash: string) {
    const isMatch = await bcrypt.compare(password,hash);
    return isMatch;
}