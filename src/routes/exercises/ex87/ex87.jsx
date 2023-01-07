import React, {useEffect,useState} from "react";
import data from "./data.json"
import DfdClickable from "../components/dfdClickable";
import BoardDfd from "../components/boardDfd";
import "../../../styles/ex87.css"
import NoScoringComponent from "../components/noScoringComponent";


const Ex87 = ()=>{
    const [myData, setmyData] = useState(data)
    const [column, setColumn] = useState(data.column)
    const [targetId, setTargetId] = useState(0)

    const handleFinish = (setPhase)=>{
        setPhase("end")
    }
    
    return(
       
       <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
       {
           (setPhase) => (
            <div className="dnd-context-container-game-87">
                    <DfdClickable column = {column} setTargetId={setTargetId} game={87}/>
                    <BoardDfd targetId={targetId} column ={column}/>
       
                <div className="buttons-field">
                       <button onClick={()=>{handleFinish(setPhase)}}>SIGUIENTE</button>
                   </div>
            </div>
           )
       }
   </NoScoringComponent>
           
       
    )
}
export default Ex87