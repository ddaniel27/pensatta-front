import React, {useEffect,useState} from "react";
import { DragDropContext } from "react-beautiful-dnd";
import data from "./data.json"
import DfdClickableComponent from "../components/DfdClickableComponent";
import "../../../styles/ex87.css"
import NoScoringComponent from "../components/noScoringComponent";


const Ex87 = ()=>{
    const [myData, setmyData] = useState(data)
    const [column, setColumn1] = useState(data.column)

    const handleFinish = (setPhase)=>{
        setPhase("end")
    }
    

    return(
       
       <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
       {
           (setPhase) => (
            <div className="dnd-context-container">
        
                    <DfdClickableComponent column = {column} />
               
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