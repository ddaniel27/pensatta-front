import React, {useState, useEffect} from "react";
import myData from "./data.json"
import ScoringComponent from "../components/scoringComponent";
import BalloonsComponent from "../components/balloonsComponent";
import "../../../styles/balloon.css"

const Ex19 = ()=>{
    
    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="game-container">
                        <BalloonsComponent data={myData} setPhase={setPhase} setScore={setScore}/>
                    </div>
                )
            }
        </ScoringComponent>
        
            
            
       
    )
}
export default Ex19;