import React from "react"
import Circuit from "../components/circuit"
import ScoringComponent from "../components/scoringComponent"

import data from "./data.json"
import "../../../styles/ex44.css"

export default function Ex44(){
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })

    const [ nextQuestion, setNextQuestion ] = React.useState(false)
    const [ value, setValue ] = React.useState(false)

    const handleClick = (cb1, cb2) => {
        cb1( value ? 1 : 0 )
        cb2("end")
    }

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="ex44">
                        <Circuit book={myData.options[0].book} left={myData.options[0].left} right={myData.options[0].right} showValue={nextQuestion} isCorrect={setValue} />
                        {!nextQuestion && <button onClick={()=>{setNextQuestion(true)}}>RESPONDER</button>}
                        {nextQuestion && <button onClick={()=>{handleClick(setScore, setPhase)}}>FINALIZAR</button>}
                    </div>
                )
            }
        </ScoringComponent>
    )

}