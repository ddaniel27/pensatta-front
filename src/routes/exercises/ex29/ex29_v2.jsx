import React,{useState,useEffect} from "react"
import NoScoringComponent from "../components/noScoringComponent"
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'
import data from "./data.json"
import "../../../styles/ex29.css"
import JigsawComponent from "../components/jigsawComponent"

export default function Ex29v2(){

    // eslint-disable-next-line no-unused-vars
    const [myData, setMyData] = useState(data)
    const [lab, setLab] = useState(Math.floor(Math.random() * 5) + 1);
    useEffect(()=>{
        setLab(Math.floor(Math.random() * 5) + 1)
    },[])
   
    return(
        <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
            {
                (setPhase) => (
                    
                       <JigsawComponent game={lab} setPhase={setPhase}/>
  
                )
            }
        </NoScoringComponent>
    )
}