import fs from "node:fs/promises";

const publicPath = `${process.cwd()}/../public`;
export async function public_folder_exist(name: string) {
    try {
        const fileExist = await fs.access(`${publicPath}/${name}`);
        return fileExist ?? false;
    } catch {
        return false;
    }
}