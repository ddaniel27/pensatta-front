import data from "./data.json"
import {useState, useEffect} from "react"
import ScoringComponent from "../components/scoringComponent"
import Questions2Component from "../components/questions2Component"


const Ex70 = ()=>{
    const [myData, setMyData] = useState(data)
    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {(setScore, setPhase)=>(
                <Questions2Component/>
            )}
        </ScoringComponent>
    )
}
export default Ex70
