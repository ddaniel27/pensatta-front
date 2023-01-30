import data from "./data.json"
import {useState, useEffect} from "react"
import NoScoringComponent from "../components/noScoringComponent"
import WhiteboardComponent from "../components/whiteBoardComponent"




const Ex27 = ()=>{
    const [myData, setMyData] = useState(data)
    return(
        <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {(setPhase)=>(
                <WhiteboardComponent setPhase={setPhase}/>
            )}
        </NoScoringComponent>
    )
}
export default Ex27
