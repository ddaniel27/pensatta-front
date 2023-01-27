import data from "./data.json"
import {useState, useEffect} from "react"
import NoScoringComponent from "../components/noScoringComponent"
import DrawingBoard from "../components/drawingComponent"
import HomePage from "../components/drawingCanva"
import BoardDrawing from "../components/boardDrawingComponent"




const Ex27 = ()=>{
    const [myData, setMyData] = useState(data)
    return(
        <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {(setPhase)=>(
                <BoardDrawing/>
            )}
        </NoScoringComponent>
    )
}
export default Ex27
