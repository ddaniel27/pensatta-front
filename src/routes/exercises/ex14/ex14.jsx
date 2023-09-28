import { useState, useLayoutEffect, useEffect } from "react"
import ScoringComponent from "../components/scoringComponent"
import DrawGrid from "../components/drawGrid"
import DndComponent from "../components/dndComponent"
import useData from "../../../hooks/useData"
import "../../../styles/ex10.css"

export default function Ex14(){

  const { data } = useData("ex14")

    const [ myData, setMyData ] = useState({
        ...data,
        correctSequence: data.correctSequence.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)[0]
    })
    const [start, setStart] = useState(false)
    const [reset, setReset] = useState(false)
    const [finished, setFinished] = useState(false)

    const [ optionsData, setOptionsData ] = useState({})

    useLayoutEffect(() => {
        if(reset){
            setReset(false)
        }
    }, [optionsData])

  useEffect(() => {
    setMyData({
      ...data,
        correctSequence: data.correctSequence.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)[0]
    })
  }, [data])

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
                            {optionsData.length > 0 && <button onClick={handleReset} className="restart">{data["retry-button"]}</button>}
                            {!start && <button onClick={handleClick} disabled={!optionsData.length}>{data["start-button"]}</button>}
                            {finished && <button onClick={()=>{setPhase("end")}}>{data["finish-button"]}</button>}
                        </div>
                    </div>
                )
            }
        </ScoringComponent>
    )
}
