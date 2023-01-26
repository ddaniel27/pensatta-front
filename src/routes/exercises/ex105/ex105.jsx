import data from "./data.json"
import {useState, useEffect} from "react"
import NoScoringComponent from "../components/noScoringComponent"
import FormExercise from "../components/formExercise"



const Ex105 = ()=>{
    const [myData, setMyData] = useState(data)
    return(
        <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {(setPhase)=>(
                <FormExercise inputs={myData.inputs[Math.floor(Math.random() * 10)]} setPhase={setPhase}/>
            )}
        </NoScoringComponent>
    )
}
export default Ex105
