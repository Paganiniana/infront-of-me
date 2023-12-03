import config from "./firebaseConfig.json";
import { initializeApp } from "firebase/app";


const app = initializeApp(config);

export default app;