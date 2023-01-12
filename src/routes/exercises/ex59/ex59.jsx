import {useEffect, useState} from "react";
import KeyBoardComponent from "../components/keyBoardComponent";
import data from "./data.json"
import ScoringComponent from "../components/scoringComponent";

const Ex59 = ()=>{
    const [myData, setMyData] = useState(data)

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <KeyBoardComponent keyPairs={myData.keyPairs} textType={myData.texType[Math.floor(Math.random() * myData.texType.length)]} setPhase={setPhase} setScore={setScore}/>
                    
                )
            }
        </ScoringComponent>
    )

}

export	default Ex59