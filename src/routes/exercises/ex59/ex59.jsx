import {useEffect, useState} from "react";
import KeyBoardComponent from "../components/keyBoardComponent";
import myData from "./data.json"

const Ex59 = ()=>{
    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <KeyBoardComponent/>
                    
                )
            }
        </ScoringComponent>
    )

}

export	default Ex59