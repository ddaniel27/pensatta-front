import React from "react"
import ScoringComponent from "../components/scoringComponent"
import CensureComponent from "../components/censureComponent"
import data from "./data.json"

export default function Ex08(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })



    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id} dim={myData.dim} apr={myData.apr}>
            {
                (setScore, setPhase) => (
                    <CensureComponent data={myData} returnScore={setScore} isFinished={setPhase}/>
                )
            }
        </ScoringComponent>
    )
}