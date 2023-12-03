import admin from "./firebase-app";

/**
 * https://firebase.google.com/docs/auth/admin/verify-id-tokens 
 * Uses a token to get a firebase auth id
 * @param {string} token 
 * @returns {string | null} an auth id or null if the token is invalid
 */
export async function userWithTokenExists(token:string): Promise<boolean> {
    // 1. check for testing flag, first,
    if (process.env.SPECIAL_AUTH_TOKEN == token) return true;
    
    // 2. check firebase auth
    const auth = admin.auth();
    let uid = null;
    try {
        let decodedToken = await auth.verifyIdToken(token);
        uid = decodedToken.uid;
        if (uid && uid.length) return true;
    } catch (err) {
        return false;
    }
    return false;
}