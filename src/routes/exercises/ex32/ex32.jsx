import React, {useEffect, useState} from "react"
import MazePistaComponent from "../components/mazePistaComponent"
import ScoringComponent from "../components/scoringComponent"
import myData from "./data.json"
import conosH from "/images/exercises/32/conosH.svg"
import conosV from "/images/exercises/32/conosV.svg"


const Ex32 = () => {
    const conos = {H: conosH, V:conosV}
    const [lab, setLab] = useState(1)//useState(Math.floor(Math.random() * 10) + 1);
    useEffect(()=>{
        //setLab(Math.floor(Math.random() * 10) + 1)
        setLab(1)
    },[])

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <MazePistaComponent lab={lab} setPhase={setPhase} setScore={setScore} colorLine="#BDBDBD" imagePath={conos}/>
                )
            }
        </ScoringComponent>
        
    )

}

export default Ex32