import Express from "express";
import dotenv from "dotenv";

dotenv.config(); // exposes process.env.*

const EDLIGHT_ENDPOINT = "/analyze-image";

const app = Express();
const port = process.env.PORT || 3000;

// @todo - add url/cors for frontend 
// CORS
import cors from "cors";
const PROD_HOSTS = [""]
const DEV_HOSTS = ["http://localhost:5173"] // vite client


// @todo only allow DEV_HOSTS in "test" mode
function originIsAllowed(origin:string): boolean {
  // 1. check for specific origins
  if (PROD_HOSTS.includes(origin)) return true;
  if (DEV_HOSTS.includes(origin)) return true;
  return false;
}

app.use(cors({
    credentials: true,
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
    
        if (!originIsAllowed(origin)) {
          console.log(`${origin} is not an allowed origin`);
          return callback(new Error('This specified origin not allowed'), false);
        }
    
        return callback(null, true);
      }
}))



/** ------------------- SINGLE ROUTE ----------------- */
import analyzeImage from "./src/route-handlers/analyzeImage";
import multer from "multer";

const upload = multer();

/** Provides a single space for an  "image" upload in the POST request */
app.post(EDLIGHT_ENDPOINT, upload.single("image"), analyzeImage);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`)
})