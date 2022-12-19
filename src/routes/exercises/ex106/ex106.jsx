import React from "react"
import ScoringComponent from "../components/scoringComponent"
import Timer from "../components/timer"
import DndVonListComponent from "../components/dndVonListComponent"
import data from "./data.json"
import "../../../styles/ex15.css"

export default function Ex15(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        selectedVariation: data.variations.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)[0]
    })

    const [ value, setValue ] = React.useState(null)
    const [ nextQuestion, setNextQuestion ] = React.useState(false)

    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n)
        })
    }


    async function handleTimer(cb1) {
        let counter = 0
        setNextQuestion(true)
        document.querySelector(".droppable-von-list").childNodes.forEach((child,idx) => {
            if(child.id === myData.selectedVariation.sequence[idx] ){
                child.style.backgroundColor = "green"
                counter++
            }else{
                child.style.backgroundColor = "red"
            }
        })
        cb1(counter)
    }

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="list-ex15">
                        <DndVonListComponent data={myData.selectedVariation} returnScore={setValue} block={nextQuestion} />
                        {nextQuestion ? <button onClick={()=>{setPhase("end")}}>FINALIZAR</button> :<button onClick={()=>{handleTimer(setScore)}}>RESPONDER</button>}
                    </div>
                )
            }
        </ScoringComponent>
    )
}