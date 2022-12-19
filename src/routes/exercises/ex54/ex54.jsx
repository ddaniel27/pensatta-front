import React from "react"
import Synth from "../components/synth"
import NoScoringComponent from "../components/noScoringComponent"

import data from "./data.json"
import "../../../styles/ex54.css"

export default function Ex54(){

    const [ myData, setMyData ] = React.useState({
        ...data,
    })

    return(
        <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
        {
            (setPhase) => (
                <div className="ex54">
                    <div className="synth-container">
                        <Synth />
                    </div>
                    <button onClick={()=>{setPhase("end")}}>FINALIZAR</button>
                </div>
            )
        }
        </NoScoringComponent>
    )

}