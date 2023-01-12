import React, {useEffect,useState} from "react";
import { DragDropContext } from "react-beautiful-dnd";
import data from "./data.json"
import DfdComponent from "../components/dfdComponent";
import "../../../styles/ex20.css"
import NoScoringComponent from "../components/noScoringComponent";


const Ex20 = ()=>{
    const [myData, setmyData] = useState(data)
    const [column1, setColumn1] = useState(data.column1)
    const [column2, setColumn2] = useState(data.column2)
    
    

    const onDragEnd = (result)=>{
        if(!result.destination) return
        if(result.source.index === result.destination.index &&
            result.source.droppableId === result.destination.droppableId) return
        const column2ObjId = parseInt(result.destination.droppableId.replace('drag',''))
        const draggableSelId = parseInt(result.draggableId.replace('element',''))
        const draggableSelObj = column1.find(x => x.id == draggableSelId)
        const newColumn2 = column2.map( obj => {
            if(column2ObjId != obj.id)return obj;
            return {...obj, type: draggableSelObj.type, text: draggableSelObj.text}
        })
        setColumn2(newColumn2)
        
    }
    const handleFinish = (setPhase) =>{
        
        const corrects = myData.correctPath;
        const isOk = corrects.map( (element)=>{
            const objC1 = column1.find(x => x.id == element.correct)
            const objC2 = column2.find( x=> x.id == element.drag )
            return objC1.type == objC2.type && objC1.text == objC2.text  
        } )
        const win = isOk.every(element => element === true);

        setPhase("end")
    }

    return(
       
       <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
       {
           (setPhase) => (
            <div className="dndContextContainer">
                <DragDropContext onDragEnd={onDragEnd}>
                    <DfdComponent data={myData} column1={column1} column2={column2}/>
                </DragDropContext>
                <div className="buttons-field">
                       <button onClick={()=>{handleFinish(setPhase)}}>SIGUIENTE</button>
                   </div>
            </div>
           )
       }
   </NoScoringComponent>
           
       
    )
}
export default Ex20