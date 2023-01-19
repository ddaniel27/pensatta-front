import React from "react"
import ScoringComponent from "../components/scoringComponent"
import data from "./data.json"
import MonitorColorsComponent from "../components/monitorColorsComponent"


export default function Ex97(){
    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState(data)

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                   <MonitorColorsComponent setScore={setScore} setPhase={setPhase} data={myData.options}/>
                )
            }
        </ScoringComponent>
    )
}