import SignIn from "../components/SignIn";

export default function Authenticate() {
    return (
        <div id="viewer" className="page-container">
            <h1>Authenticate</h1>
            <p>Sign in to start using the image describer.</p>
                <SignIn/>
        </div>
    )
}