import { Request, Response } from "express";

import { getSerializedUrl } from "../modules/images";
import { summarizeImage } from "../modules/vision";

/**
 * See https://github.com/expressjs/multer
 * @param req.file is the uploaded file from the client (if present)
 */
export default async function analyzeImage(req: Request, res: Response) {
    // 1. get the image as a fle
    console.log(req.file);

    // 1a. confirm contents, mimetype, etc.

    // 2. format it,
    let image = getSerializedUrl(req.file!.buffer, req.file!.mimetype);

    // 3. provide it to "vision"
    let summary = await summarizeImage(image);

    // 4. provide response as JSON

    res.json({ message: summary })
}   