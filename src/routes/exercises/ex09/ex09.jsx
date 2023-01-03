import React, {useEffect, useState} from "react"
import Maze2Component from "../components/maze2Component"
import ScoringComponent from "../components/scoringComponent"
import myData from "./data.json"


const Ex09 = () => {
    const [lab, setLab] = useState(Math.floor(Math.random() * 10) + 1);
    useEffect(()=>{
        setLab(Math.floor(Math.random() * 10) + 1)
    },[])

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <Maze2Component lab={lab} setPhase={setPhase} setScore={setScore}/>
                )
            }
        </ScoringComponent>
        
    )

}

export default Ex09