import { Request, Response } from "express";

import { getSerializedUrl } from "../modules/images";
import { summarizeImage } from "../modules/vision";
import { userWithTokenExists } from "../modules/firebase/auth";

/**
 * See https://github.com/expressjs/multer
 * @param req.file is the uploaded file from the client (if present)
 */
export default async function analyzeImage(req: Request, res: Response) {
    // 1. confirm contents, mimetype, etc.
    // @todo
    console.log("Received the following file...", req.file);

    // 2. make sure our user is logged in!
    const token = req.headers["auth"] ? req.headers["auth"] : "";
    console.log(`receieved firebase token: ${token}`);

    // 3. format it,
    let image = getSerializedUrl(req.file!.buffer, req.file!.mimetype);

    // 4. provide it to "vision"
    let summary = await summarizeImage(image);

    // 5. provide response as JSON
    res.json({ message: summary })
}   