import React from "react"
import ScreenRenderUniqueOptionsEncapsulate from "../components/screenRenderUniqueOptionsEncapsulate"
import Timer from "../components/timer"
import ScoringComponent from "../components/scoringComponent"
import data from "./data.json"
import '../../../styles/ex82.css'

export default function Ex82(){
    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })
    const [ nextQuestion, setNextQuestion ] = React.useState(false)

    async function handleTimer(time, cb1, cb2) {
        if(time <= 1){
            cb1(0)
            cb2("end")
        }
    }

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <>
                    {!nextQuestion ? 
                        <>
                            <div className="paragraph">
                                <p>{myData.text}</p>
                            </div>
                            <button className="button" onClick={() => setNextQuestion(true)}>INICIAR</button>
                        </>: 
                        <div className="timer-and-options">
                            <Timer startTime={80} returnTimerValue={(t)=>{handleTimer(t,setScore, setPhase)}}/>
                            <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={false} returnScore={setScore} isFinished={setPhase} center={false}/> 
                        </div>
                    }
                    </>
                )
            }
        </ScoringComponent>
    )
}