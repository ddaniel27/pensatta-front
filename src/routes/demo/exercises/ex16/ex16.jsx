import React from "react"
import ScoringComponent from "../components/scoringComponent"
import BinaryAnswerComponent from "../components/binaryAnswerComponent"
import data from "./data.json"
import "../../../../styles/ex16.css"

export default function Ex16(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })

    const [value, setValue] = React.useState(new Array(data.threshold.perfect).fill(false))
    const [ nextQuestion, setNextQuestion ] = React.useState(false)

    const handleReturnScore = (isCorrect, index) => {
        const newValue = [...value]
        newValue[index] = isCorrect
        setValue(newValue)
    }

    const handleClick = (cb1, cb2) => {
        const result = value.reduce((acc, curr) => acc + curr, 0)
        cb1(result)
        cb2("end")
    }



    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="password-ex16">
                        {
                            myData.options.map((option, index) => (
                                <div key={index} className="password-ex16-item">
                                    <p>{option.password}</p>
                                    <BinaryAnswerComponent options={option.answers} showCorrect={nextQuestion} returnScore={handleReturnScore} indexGlobal={index} />
                                </div>
                            ))
                        }
                        {!nextQuestion && <button className="button-play" onClick={()=>{setNextQuestion(true)}}>RESPONDER</button>}
                        {nextQuestion && <button className="button-play" onClick={()=>{handleClick(setScore,setPhase)}}>SIGUIENTE</button>}
                    </div>
                )
            }
        </ScoringComponent>
    )
}