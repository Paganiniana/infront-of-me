import { signInWithGoogle } from "../firebase/auth";

export default function SignIn() {
    const clickHandler = () => {
        signInWithGoogle();
    }

    return (
        <button onClick={clickHandler}>
            Sign In with Google
        </button>
    )
}