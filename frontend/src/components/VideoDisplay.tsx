import { useEffect, useRef, useState } from "react";

/**
 * A reduction from the process found on MDN
 * https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos#demo
 */
async function initVideoStream(target: HTMLDivElement) {
    console.log("Initiating video stream")
    let stream = await navigator.mediaDevices.getUserMedia({video:true})
    
    // 1. create the video source
    let video = document.createElement("video");
    video.srcObject = stream;

    // 2. clear any existing videos (hot-reload debugging)
    target.querySelectorAll("video")
        .forEach(v => v.parentElement?.removeChild(v));

    // 3. add it to the container
    target.appendChild(video);
    video.play();
}

async function getImageFromVideo(target:HTMLDivElement): Promise<File> {
    // 1. get the video container
    let video = target.querySelector("video");
    if (!video) throw new Error("Can't get screenshot without successfully registering the video element")

    // 2. draw the image and get the exported image
    let canvas = document.createElement("canvas");
    let bb = video.getBoundingClientRect();
    canvas.width = bb.width;
    canvas.height = bb.height;

    // 3. resolve with an image file (png)
    return new Promise(res => {
        let ctx = canvas.getContext("2d")!;
        ctx.drawImage(video!, 0, 0);
        canvas.toBlob(blob => {
            let f = new File([blob!], "capture.png", {type: "image/png"});
            res(f);
        })
    })
    
}

type VideoDisplayProps = {
    imageCapture: (f: File) => void,
}

export default function VideoDisplay(props: VideoDisplayProps) {

    const videoContainerRef = useRef<HTMLDivElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoAllowed, setVideoAllowed] = useState(true);

    // give some feedback if the video errors out
    const videoErrorMessage = `
    This application requires access to the mediaDevices API.
    Please enable video for this site or try a different browser.
    `

    // initialize the video stream when the component mounts
    useEffect(() => {
        let div = videoContainerRef.current;
        if (div && !isPlaying) {
            setIsPlaying(true);
            try {
                initVideoStream(div);
            } catch (err) {
                setVideoAllowed(false);
            }
        }
    }, [])

    const handleCaptureClick = async  () => {
        let div = videoContainerRef.current;
        if (!div) throw new Error("Can't capture the video without a container element!")
        let f = await getImageFromVideo(div);
        props.imageCapture(f);
    }

    return (
        <div className="video-container" ref={videoContainerRef}>
            {!videoAllowed && <div className="video-error-message">{ videoErrorMessage }</div>}
            {videoAllowed && <button onClick={handleCaptureClick}>Describe</button>}
        </div>
    )
}