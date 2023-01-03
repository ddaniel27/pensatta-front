import React, {useState, useEffect} from "react";
import data from "./data.json"
import DndComponent from "../components/dndComponent"
import ScoringComponent from "../components/scoringComponent";

const Ex18 = () => {

    const [myData, setMyData] = useState(data);

    const setOptionsData = ()=>{}
    const reset = ()=>{}

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold}>
        {
            (setScore, setPhase) => (
                <div className="maze-style">
                    <DndComponent data={myData} returnScore={setOptionsData} reset={reset} /> 

                </div>
            )
        }
    </ScoringComponent>

    )
}

export default Ex18;