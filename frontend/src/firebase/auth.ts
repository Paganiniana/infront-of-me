import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, getAuth, User } from "firebase/auth";
import app from "./app";

let localAuth: User | null = null;

export function getCurrentAuth(): User | null {
    return localAuth;
}

/** --------------- AUTH LISTENERS ----------------- */

type AuthChangeHandler = (user: User | null) => void;
let listeningAuth = false;
const AUTH_LISTENERS: Array<AuthChangeHandler> = [];

export function initAuthListener() {
    if (listeningAuth) throw new Error(`This function should not be called more than once`)
    const auth = getAuth(app)
    onAuthStateChanged(auth, (user: User | null) => {
        localAuth = user;
        AUTH_LISTENERS.forEach(fn => fn(user));
    })

    // finish
    listeningAuth = true;
}

export function registerAuthListener(fn: AuthChangeHandler) {
    AUTH_LISTENERS.push(fn);
}

export function deregisterAuthListener(fn: AuthChangeHandler) {
    AUTH_LISTENERS.splice(AUTH_LISTENERS.indexOf(fn), 1);
}

/** --------------- AUTH METHODS ----------------- */

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    signInWithPopup(auth, provider)
        .then((result) => {
            // store the user
            localAuth = result.user;
        })
        .catch((err) => {
            // @todo more error handling
            console.error(err);
            localAuth = null;
        })
}

export function signAuthOut() {
    const auth = getAuth(app);
    signOut(auth);
}