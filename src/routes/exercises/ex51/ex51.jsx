import React from "react"
import ScoringComponent from "../components/scoringComponent"
import DndListComponent from "../components/dndListComponent"
import data from "./data.json"
import "../../../styles/ex17.css"

export default function Ex51(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.variations.sort(() => Math.random() - 0.5).slice(0,1)[0]
    })
    const [start, setStart] = React.useState(false)
    const [reset, setReset] = React.useState(false)

    const [ optionsData, setOptionsData ] = React.useState({})

    React.useLayoutEffect(() => {
        if(reset){
            setReset(false)
        }
    }, [optionsData])


    const handleClick = (cb1,cb2)=>{
        document.querySelector(`.maze-list-style`).scrollTop = 0;
        setStart(true)
        let flag = true
        for(let i = 0; i < myData.sequence.length; i++){
            if(optionsData[i] !== myData.sequence[i]){
                flag = false
            }
        }
        if(flag){
            cb1(1)
        }else{
            cb1(0)
        }
        cb2("end")
    }

    const handleReset = () => {
        setStart(false)
        setOptionsData({})
        setReset(true)
    }


    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore,setPhase) => (
                    <div className="maze-list-style">
                        <DndListComponent data={myData} returnScore={setOptionsData} reset={reset} />
                       
                        <div className="buttons-field">
                            {optionsData.length > 0 && <button onClick={handleReset} className="restart">REINTENTAR</button>}
                            <button onClick={()=>{handleClick(setScore,setPhase)}}>INICIAR</button>
                        </div>
                    </div>
                )
            }
        </ScoringComponent>
    )
}