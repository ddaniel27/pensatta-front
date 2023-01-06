import React from "react"
import ScreenRenderUniqueOptionsEncapsulate from "../components/screenRenderUniqueOptionsEncapsulate"
import ScoringComponent from "../components/scoringComponent"
import data from "./data.json"

export default function Ex85(){
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
                            <div className="ex85-img-container" style={{textAlign:"center", padding:"3%"}}>
                                <img src="images/exercises/85/dfd.svg" alt="dfd" style={{width:"70vw"}} />
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