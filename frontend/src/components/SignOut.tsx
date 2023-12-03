import { signAuthOut } from "../firebase/auth";

export default function SignIn() {
    const clickHandler = () => {
        signAuthOut();
    }

    return (
        <button onClick={clickHandler}>
            Sign Out
        </button>
    )
}