import React, {useState, useEffect} from "react";
import data from "./data.json"
import ScoringComponent from "../components/scoringComponent";
import { DragDropContext } from "react-beautiful-dnd";
import BalloonsComponent from "../components/balloonsComponent";
import BalloonsSOComponent from "../components/balloonsSOComponent";

const Ex19 = ()=>{
    const onDragEnd = (result) =>{
        console.log(result)
    }
    return(
        <DragDropContext onDragEnd={onDragEnd}>
            <BalloonsComponent data={data}/>
            
        </DragDropContext>
    )
}
export default Ex19;