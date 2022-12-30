import React from "react"
import Maze2Component from "../components/maze2Component"
import ScoringComponent from "../components/scoringComponent"
import myData from "./data.json"


const Ex09 = () => {
    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <Maze2Component lab={1} setPhase={setPhase} setScore={setScore}/>
                )
            }
        </ScoringComponent>
        
    )

}

export default Ex09