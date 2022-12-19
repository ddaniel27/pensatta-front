import React from "react"
import ScoringComponent from "../components/scoringComponent"
import DndForComponent from "../components/dndForComponent"
import Animation from "../components/animation"
import data from "./data.json"
import "../../../styles/ex10.css"

export default function Ex13(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
    })
    const [start, setStart] = React.useState(false)
    const [reset, setReset] = React.useState(false)

    const [ optionsData, setOptionsData ] = React.useState([])

    const [vehicle, setVehicle] = React.useState(null)

    React.useLayoutEffect(() => {
        if(reset){
            setReset(false)
        }
    }, [optionsData])

    React.useEffect(() =>{
        console.log(start)
    }, [start])

    React.useEffect(() => {
        async function test(){
            while(!document.querySelector(`.animation-container`)) {
                await new Promise(r => setTimeout(r, 500));
                console.log("waiting...")
            }
            document.querySelector(`.animation-container`).classList.add("vehicle")
            setVehicle(document.querySelector(`.animation-container`))
        }
        test()
    }, [])

    const handleClick = ()=>{
        document.querySelector(`.maze-style`).scrollTop = 0;
        setStart(true)
    }

    const handleReset = () => {
        setStart(false)
        setReset(true)
    }

    const handleFinish = (cb1,cb) => {
        const score = optionsData[0][0] === 'avanzar'? 0 : +optionsData[optionsData.length-1][1] >= 16 ? 1 : 0
        cb1(score)
        cb("end")
    }

    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n)
        })
    }


    async function animate(peluche, animationSequence) {
        vehicle.style.right = '60%'
        let loopValue = +animationSequence[animationSequence.length-1][1]
        let pos = 60
        if(animationSequence[0][0] === "excavar"){
            if(loopValue >= 16){ loopValue = 16 }
            for(let i = 0; i < loopValue; i++){
                peluche.playSegments([24, 72], true)
                pos-=2
                vehicle.style.right = `${pos}%`
                await delay(2000)
            }
        }else{
            peluche.playSegments([0, 24], true)
        }

    }


    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="maze-style">
                        <DndForComponent data={myData} returnScore={setOptionsData} reset={reset} />

                        <div className="info-box">
                            <Animation animationSequence={optionsData} path={myData.path} functionToAnimate={animate} start={start} />
                            <div className="montana" />
                        </div>
                       
                        <div className="buttons-field">
                            {start ? 
                                <button onClick={()=>{handleFinish(setScore, setPhase)}} className="restart">FINALIZAR</button> :
                                <button onClick={handleClick} disabled={optionsData.length < 2}>INICIAR</button>
                            }
                            {optionsData.length > 1 && <button onClick={handleReset} className={`${!start && 'restart'}`}>REINTENTAR</button>}
                        </div>
                    </div>
                )
            }
        </ScoringComponent>
    )
}