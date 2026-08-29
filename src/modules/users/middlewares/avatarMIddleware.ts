import { randomUUID } from "node:crypto";
import { mkdir } from "node:fs/promises";
import multer from "multer";
import path from "node:path";
import { createErrorResponse } from "../../../utilities/createErrorResponse.js";

const storage = multer.diskStorage({
    destination: async (req, _file, cb) => {
        if (!req.user) {
            cb(new Error("Unauthorized"), "");
            return;
        }

        const destination = path.resolve("public","users",String(req.user.id));
        await mkdir(destination, { recursive: true });
        cb(null, destination);
    },
    filename: (_req, file, cb) => {
        const extension = file.mimetype === "image/png" ? "png" : "jpg";
        cb(null, `${randomUUID()}.avatar.${extension}`);
    }
});


export const uploadAvatar = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    },
    fileFilter: (_req, file, cb) => {
        if (!["image/png", "image/jpeg"].includes(file.mimetype)) {
            const response = createErrorResponse({
                root: "The avatar must be png or jpg"
            });
            const error = Object.assign(new Error(response.message), response, {
                statusCode: 422
            });

            cb(error);
            return;
        }

        cb(null, true);
    }
})
