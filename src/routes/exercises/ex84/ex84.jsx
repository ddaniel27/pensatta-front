import React from "react"
import ScreenRenderUniqueOptionsEncapsulate from "../components/screenRenderUniqueOptionsEncapsulate"
import ScoringComponent from "../components/scoringComponent"
import data from "./data.json"
import '../../../styles/ex84.css'

export default function Ex69(){
    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })
    const [ nextQuestion, setNextQuestion ] = React.useState(false)

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <>
                    {!nextQuestion ? 
                        <>
                            <div className="ex84-img-container">
                                <img src="images/exercises/84/Tendencias_2.svg" alt="tendencias2" />
                                <img src="images/exercises/84/Tendencias_1.svg" alt="tendencias1" />
                            </div>
                            <button className="button" onClick={() => setNextQuestion(true)}>INICIAR</button>
                        </>: 
                        <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={false} returnScore={setScore} isFinished={setPhase} center={true}/> 
                    }
                    </>
                )
            }
        </ScoringComponent>
    )
}