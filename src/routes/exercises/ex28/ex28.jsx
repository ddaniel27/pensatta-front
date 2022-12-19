import React from "react"
import ScoringComponent from "../components/scoringComponent"
import UniqueOptionImg from "../components/uniqueOptionImg"
import Animation from "../components/animation"
import data from "./data.json"
import "../../../styles/ex28.css"

export default function Ex28(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })

    const [ value, setValue ] = React.useState(null)
    const [ nextQuestion, setNextQuestion ] = React.useState(false)
    const [ playAnimation, setPlayAnimation ] = React.useState(false)

    React.useEffect(() => {
        if(nextQuestion){
            document.querySelector(`.uniqueOptionImg p.uni-opt-img-${myData.options[0].correct}`).style.backgroundColor = "#69E485"
        }
    }, [nextQuestion])

    const handlePlay = () => {
        setPlayAnimation(true)
    }

    const handleClick = (cb1, cb2) => {
        const newValue = value === myData.options[0].correct ? 1 : 0
        cb1(newValue)
        cb2("end")
    }


    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n)
        })
    }


    async function animate(peluche, animationSequence) {
        let segments = []
        if(animationSequence === "Saludar"){ segments = [0, 120] }
        else if(animationSequence === "No"){ segments = [120, 192] }
        else if(animationSequence === "Si"){ segments = [192, 264] }
        else if(animationSequence === "Selfie"){ segments = [264, 360] }
        else if(animationSequence === "Saltar"){ segments = [360, 432] }
        else if(animationSequence === "Reir"){ segments = [432, 504] }
        else if(animationSequence === "Sorpresa"){ segments = [504, 576] }
        else if(animationSequence === "Llorar") { segments = [576, 648] }
        else if(animationSequence === "Celular"){ segments = [648, 792] }
        else if(animationSequence === "Bailar"){ segments = [792, 984] }
        for(let i = 0; i < 30; i++){
            peluche.playSegments(segments, true)
            await delay(8000)
        }
    }


    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="animation-ex28">
                        <div className="animation-related">
                            <Animation animationSequence={myData.options[0].correct} path={myData.animationPath} functionToAnimate={animate} start={playAnimation} />
                            {!playAnimation && <p onClick={handlePlay}>PLAY</p>}
                        </div>
                        <div className="options-related">
                            <UniqueOptionImg path={myData.path} options={myData.options[0].options} returnScore={setValue} disabled={nextQuestion} />
                        </div>
                        {!nextQuestion && <button className="button-play" onClick={()=>{setNextQuestion(true)}} disabled={!value}>RESPONDER</button>}
                        {nextQuestion && <button className="button-play" onClick={()=>{handleClick(setScore,setPhase)}}>SIGUIENTE</button>}
                    </div>
                )
            }
        </ScoringComponent>
    )
}