import React from "react"
import ScoringComponent from "../components/scoringComponent"
import DndComponent from "../components/dndComponent"
import ImagenEditor from "../components/imagenEditor"
import data from "./data.json"
import "../../../styles/ex10.css"

export default function Ex11(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
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
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold}>
            {
                (setScore, setPhase) => (
                    <div className="maze-style">
                        <DndComponent data={myData} returnScore={setOptionsData} reset={reset} /> 
                        <ImagenEditor
                                    sequence={optionsData}
                                    startSequence={start}
                                    isFinished={setFinished}
                                    setScore={setScore}
                                    correctSequence={myData.correctSequence}
                                    reset={reset}
                                    isFinishedGlobal={setPhase}
                        />
                        <div className="buttons-field">
                            {optionsData.length > 0 && <button onClick={handleReset} className="restart">REINTENTAR</button>}
                            {!start && <button onClick={handleClick} disabled={!optionsData.length}>INICIAR</button>}
                            {finished && <button onClick={()=>{setPhase("end")}} disabled={!optionsData.length}>FINALIZAR</button>}
                        </div>
                    </div>
                )
            }
        </ScoringComponent>
    )
}