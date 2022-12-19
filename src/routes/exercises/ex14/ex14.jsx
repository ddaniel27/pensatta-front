import React from "react"
import ScoringComponent from "../components/scoringComponent"
import DrawGrid from "../components/drawGrid"
import DndComponent from "../components/dndComponent"
import data from "./data.json"
import "../../../styles/ex10.css"

export default function Ex14(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        correctSequence: data.correctSequence.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)[0]
    })
    const [start, setStart] = React.useState(false)
    const [reset, setReset] = React.useState(false)
    const [finished, setFinished] = React.useState(false)

    const [ optionsData, setOptionsData ] = React.useState({})

    React.useLayoutEffect(() => {
        if(reset){
            setReset(false)
        }
    }, [optionsData])

    const handleClick = ()=>{
        document.querySelector(`.maze-style`).scrollTop = 0;
        setStart(true)
    }

    const handleReset = () => {
        setStart(false)
        setFinished(false)
        setOptionsData({})
        setReset(true)
    }


    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="maze-style">
                       <DndComponent data={myData} returnScore={setOptionsData} reset={reset} />
                       <DrawGrid 
                            sequence={optionsData}
                            initPos={myData.correctSequence.initPos}
                            endPos={myData.correctSequence.endPos}
                            start={start} 
                            correctSequence={myData.correctSequence.sequence}
                            returnScore={setScore}
                            isFinished={setFinished}
                            />
                       
                        <div className="buttons-field">
                            {optionsData.length > 0 && <button onClick={handleReset} className="restart">REINTENTAR</button>}
                            {!start && <button onClick={handleClick} disabled={!optionsData.length}>INICIAR</button>}
                            {finished && <button onClick={()=>{setPhase("end")}}>FINALIZAR</button>}
                        </div>
                    </div>
                )
            }
        </ScoringComponent>
    )
}