import React from "react"
import CarritoQuestionsComponent from "../components/carritoQuestionsComponent"
import ScoringComponent from "../components/scoringComponent"
import data from "./data.json"

const Ex64 = ()=>{
    const [ myData, setMyData ] = React.useState(data)

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                  <CarritoQuestionsComponent setScore={setScore} setPhase={setPhase} data={myData}/>
                )
            }
        </ScoringComponent>
    )
        }
export default Ex64