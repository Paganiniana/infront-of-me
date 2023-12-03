const PITCH_SYNTH = 1;
const RATE_SYNTH = 0.9;

export function speakText(text:string) {
    let synth = window.speechSynthesis;
    synth.cancel();
    return new Promise((res) => {
        console.log(`Speaking: ${text}`);
        // create the utterance
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = PITCH_SYNTH;
        utterance.rate = RATE_SYNTH;
        // speak it
        synth.speak(utterance);
        // resolve the promise
        utterance.onend = () => res(true);
    })
}