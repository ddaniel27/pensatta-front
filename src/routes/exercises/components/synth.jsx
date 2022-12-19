import * as Tone from 'tone'
import "../../../styles/synth.css"

export default function Synth({}){

    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();

    const handleKeyPress = (event, index) => {
        if(event){
            switch (event.key) {
                case "a":
                    sampler.triggerAttackRelease("C4","8n")
                    break;
                case "w":
                    sampler.triggerAttackRelease("C#4","8n")
                    break;
                case "s":
                    sampler.triggerAttackRelease("D4","8n")
                    break;
                case "e":
                    sampler.triggerAttackRelease("D#4","8n")
                    break;
                case "d":
                    sampler.triggerAttackRelease("E4","8n")
                    break;
                case "f":
                    sampler.triggerAttackRelease("F4","8n")
                    break;
                case "t":
                    sampler.triggerAttackRelease("F#4","8n")
                    break;
                case "g":
                    sampler.triggerAttackRelease("G4","8n")
                    break;
                case "y":
                    sampler.triggerAttackRelease("G#4","8n")
                    break;
                case "h":
                    sampler.triggerAttackRelease("A4","8n")
                    break;
                case "u":
                    sampler.triggerAttackRelease("A#4","8n")
                    break;
                case "j":
                    sampler.triggerAttackRelease("B4","8n")
                    break;
                case "k":
                    sampler.triggerAttackRelease("C5","8n")
                    break;
                case "o":
                    sampler.triggerAttackRelease("C#5","8n")
                    break;
                case "l":
                    sampler.triggerAttackRelease("D5","8n")
                    break;
                case "p":
                    sampler.triggerAttackRelease("D#5","8n")
                    break;
                case "ñ":
                    sampler.triggerAttackRelease("E5","8n")
                    break;
            }
        }
        if(index){
            switch (index) {
                case 100:
                    sampler.triggerAttackRelease("C4","8n")
                    break;
                case 11:
                    sampler.triggerAttackRelease("C#4","8n")
                    break;
                case 1:
                    sampler.triggerAttackRelease("D4","8n")
                    break;
                case 12:
                    sampler.triggerAttackRelease("D#4","8n")
                    break;
                case 2:
                    sampler.triggerAttackRelease("E4","8n")
                    break;
                case 3:
                    sampler.triggerAttackRelease("F4","8n")
                    break;
                case 13:
                    sampler.triggerAttackRelease("F#4","8n")
                    break;
                case 4:
                    sampler.triggerAttackRelease("G4","8n")
                    break;
                case 14:
                    sampler.triggerAttackRelease("G#4","8n")
                    break;
                case 5:
                    sampler.triggerAttackRelease("A4","8n")
                    break;
                case 15:
                    sampler.triggerAttackRelease("A#4","8n")
                    break;
                case 6:
                    sampler.triggerAttackRelease("B4","8n")
                    break;
                case 7:
                    sampler.triggerAttackRelease("C5","8n")
                    break;
                case 16:
                    sampler.triggerAttackRelease("C#5","8n")
                    break;
                case 8:
                    sampler.triggerAttackRelease("D5","8n")
                    break;
                case 17:
                    sampler.triggerAttackRelease("D#5","8n")
                    break;
                case 9:
                    sampler.triggerAttackRelease("E5","8n")
                    break;
            }
        }
    }


    Tone.loaded().then(() => {
        window.addEventListener("keypress", handleKeyPress)
    })

    return(
    <div className = "piano">
        <div className='white-key-container'>
            {[1,1,1,1,1,1,1,1,1,1].map((_, i) => (
                <div className = "white-key" id = {`C${i}`} key = {`C${i}`} onClick={(()=>{handleKeyPress(null,(i === 0 ? 100 : i))})}></div>
            ))}
        </div>
        <div className='black-key-container'>
            {[1,1,1,1,1,1,1].map((_,i)=>(
                <div className = "black-key" id = {`C${i + 11}`} key = {`C${i + 11}`} onClick={(()=>{handleKeyPress(null,i+11)})}></div>
            ))}
        </div>

    </div>
    )
}