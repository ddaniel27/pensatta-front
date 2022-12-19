import React from "react"
import ScoringComponent from "../components/scoringComponent"
import DndComponent from "../components/dndComponent"
import MazeComponent from "../components/mazeComponent"
import data from "./data.json"
import "../../../../styles/ex10.css"
export default function Ex10(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        matrices: data.matrices.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })
    const [start, setStart] = React.useState(false)
    const [reset, setReset] = React.useState(false)

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
        setOptionsData({})
        setReset(true)
    }


    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id} dim={myData.dim} apr={myData.apr}>
            {
                (setScore, setPhase) => (
                    <div className="maze-style">
                        <DndComponent data={myData} returnScore={setOptionsData} reset={reset} /> 
                        <MazeComponent matrix={myData.matrices[0].matriz}
                                    recorridoMain={optionsData}
                                    imgPath={myData.imgPath}
                                    pos={myData.matrices[0].initPos}
                                    start={start}
                                    isFinished={setPhase}
                                    setScore={setScore}
                        />
                        <div className="buttons-field">
                            {optionsData.length && <button onClick={handleReset} className="restart">REINTENTAR</button>}
                            {!start ? 
                                <button onClick={handleClick} disabled={!optionsData.length}>INICIAR</button>: 
                                <button onClick={()=>{setPhase("end")}} >FINALIZAR</button>
                            }
                        </div>
                    </div>
                )
            }
        </ScoringComponent>
    )
}