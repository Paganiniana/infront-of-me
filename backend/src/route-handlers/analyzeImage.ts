import { Request, Response } from "express";

import { getSerializedUrl } from "../modules/images";
import { summarizeImage } from "../modules/vision";
import { userWithTokenExists } from "../modules/firebase/auth";

const NO_IMG = "You didn't provide an image. Please provide file with the name 'image' in your POST request" 
const IMG_FORMAT_MSG = "There was something wrong with the image you supplied. Make sure it is in png, jpg, or jpeg formats." 
const NO_AUTH_MSG = "You can't make a request unless you're authenticated"
const AI_MSG = "We encountered a problem while analyzing this image. Try again later." 



/**
 * See https://github.com/expressjs/multer
 * @param req.file is the uploaded file from the client (if present)
 */
export default async function analyzeImage(req: Request, res: Response) {
    // 1. confirm contents, mimetype, etc.
    let f = req.file;
    if (!f) return res.status(400).json({ message: NO_IMG });

    if (!["image/jpeg", "image/jpg", "image/png"].includes(f.mimetype))
        return res.status(400).json({ message: IMG_FORMAT_MSG });

    // 2. make sure our user is logged in!
    const token = req.headers["auth"] ? req.headers["auth"] : "";
    if (!token) return res.status(400).json({ message: NO_AUTH_MSG })

    let authTokenGood = await userWithTokenExists(token as string);
    if (!authTokenGood) return res.status(400).json({ message: NO_AUTH_MSG });

    // 3. format it,
    let image;
    try {
        image = getSerializedUrl(req.file!.buffer, req.file!.mimetype);
    } catch (err) {
        return res.status(400).json({ message: IMG_FORMAT_MSG });
    }

    // 4. provide it to "vision"
    let summary; 
    try {
        summary = await summarizeImage(image);
    } catch (err) {
        return res.status(400).json({ message: AI_MSG });
    }
    
    // 5. provide response as JSON
    res.status(200).json({ message: summary });
}   