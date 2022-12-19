import React from "react"
import ScreenRenderUniqueOptionsEncapsulate from "../components/screenRenderUniqueOptionsEncapsulate"
import ScoringComponent from "../components/scoringComponent"
import Timer from "../components/timer"
import data from "./data.json"

export default function Ex22(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })

    const [ time, setTime ] = React.useState()

    return ( 
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => {
                    if(time <= 1){
                        setPhase("end")
                    }
                    return (
                        <>
                            <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={false} returnScore={setScore} isFinished={setPhase} />
                            <Timer returnTimerValue={setTime} />
                        </>
                    )}
            }
            
        </ScoringComponent>
    )
}