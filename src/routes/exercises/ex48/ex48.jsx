import React, {useEffect, useState} from "react"
import MazeCardsComponent from "../components/mazeCardsComponent"
import ScoringComponent from "../components/scoringComponent"
import myData from "./data.json"


const Ex48 = () => {
    
    const [lab, setLab] = useState(Math.floor(Math.random() * 6) + 1);
    useEffect(()=>{
        setLab(Math.floor(Math.random() * 6) + 1)
        
    },[])

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <MazeCardsComponent cardsArray={myData.cards} setPhase={setPhase} setScore={setScore}/>
                )
            }
        </ScoringComponent>
        
    )

}

export default Ex48