import React from "react"
import Roulette from "../components/roulette";
import ScreenRenderUniqueOptionsEncapsulate from "../components/screenRenderUniqueOptionsEncapsulate"
import ScoringComponent from "../components/scoringComponent"
import data from "./data.json"
import "../../../styles/ex03.css";

export default function Ex03(){
    const [ continueGame, setContinueGame ] = React.useState(false);

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })

    return (
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
        {
            (setScore, setPhase) => (
                <div className={`${continueGame?"question":"alone"} roulette-03`}>
                    <Roulette data={{time: 3}} setContinue={setContinueGame} />
                    {continueGame && <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={false} returnScore={setScore} isFinished={setPhase} />}
                </div>
            )
        }
            
        </ScoringComponent>
    )
}