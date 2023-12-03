import "./Viewer.css";

import SignOut from "../components/SignOut";
import VideoDisplay from "../components/VideoDisplay";

import { speakText } from "../modules/speaker";

import DataInterface from "../modules/data";

async function handleImageCapture(f: File) {
    let DI = new DataInterface();
    let description;
    try {
        // 1. send image to backend
        description = await DI.describeImage(f)
    } catch (err) {
        // 2. handle "bad request" 
        description = "We had some trouble describing the picture you captured...";
    }
    // 3. speak output
    speakText(description);
}


export default function Viewer() {

    return (
        <div id="viewer" className="page-container">
            <h1>Image Describer</h1>
            <p> Position the thing you wanted described in front of your camera, then hit "describe."</p>
            <VideoDisplay imageCapture={handleImageCapture} />
            <div className="sign-out-container">
                <SignOut/>
            </div>
        </div>
    )
}