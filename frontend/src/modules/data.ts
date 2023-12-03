const TEST_URL = "http://localhost:3000";
const LIVE_URL = import.meta.env.FRONTEND_URL;

import { getCurrentAuth, getAuthToken } from "../firebase/auth";

const EDLIGHT_ENDPOINT = "/analyze-image";

class DataInterface {
    async makeRequest(targetUrl:string, body: any, method: "GET" | "POST") {
        // 1. get the target
        let base = import.meta.env.PROD ? LIVE_URL : TEST_URL;
        let target = `${base}${targetUrl}`;

        // 2. construct the request
        let req: RequestInit = {
            method: method,
            body: body,
            mode: "cors",
            credentials: "include",
            headers: {}
        }

        // 3. firebase auth
        let auth = getCurrentAuth();
        if (auth != null) {
            let idToken = await getAuthToken();
            // @ts-ignore
            req.headers["auth"] = idToken;
        }

        // 3. fetch it!
        return fetch(target, req);

    }

    async describeImage(f: File): Promise<string> {
        // 1. append the file to a form element
        const formData = new FormData();
        console.log("requesting description of image...", f);
        // the backend will look for "image" as a key
        formData.append("image", f);

        let res = await this.makeRequest(EDLIGHT_ENDPOINT, formData, "POST").then(res => res.json());
        console.log(res);

        return "description";
    }
}

export default DataInterface;