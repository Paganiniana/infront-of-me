import firebase from "firebase-admin";
import credentials from "./credentials.json";

firebase.initializeApp({
    // @ts-ignore
    credential: firebase.credential.cert(credentials),
})

export default firebase;