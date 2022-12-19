import React from "react"
import NoScoringComponent from "../components/noScoringComponent"
import Animation from "../components/animation"
import DndComponent from "../components/dndComponent"
import data from "./data.json"
import "../../../../styles/ex12.css"

export default function Ex12(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
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

    const handleFinish = (cb) => {
        cb("end")
    }

    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n)
        })
    }


    async function animate(peluche, animationSequence) {
        for(const action of animationSequence){
            switch (action[0]) {
                case "saludar":
                    peluche.playSegments([0, 120], true)
                    await delay(5000)
                    break
                case "no":
                    peluche.playSegments([120, 192], true)
                    await delay(3000)
                    break
                case "si":
                    peluche.playSegments([192, 264], true)
                    await delay(3000)
                    break
                case "selfie":
                    peluche.playSegments([264, 360], true)
                    await delay(4000)
                    break
                case "saltar":
                    peluche.playSegments([360, 432], true)
                    await delay(3000)
                    break
                case "reir":
                    peluche.playSegments([432, 504], true)
                    await delay(3000)
                    break
                case "sorpresa":
                    peluche.playSegments([504, 576], true)
                    await delay(3000)
                    break
                case "llorar":
                    peluche.playSegments([576, 648], true)
                    await delay(3000)
                    break
                case "celular":
                    peluche.playSegments([648, 792], true)
                    await delay(6000)
                    break
                case "bailar":
                    peluche.playSegments([792, 984], true)
                    await delay(8000)
                    break
                default:
                    peluche.playSegments([0, 120], true)
                    await delay(5000)
            }
        }
    }


    return(
        <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
            {
                (setPhase) => (
                    <div className="maze-style">
                        <DndComponent data={myData} returnScore={setOptionsData} reset={reset} /> 
                        <Animation animationSequence={optionsData} path={myData.path} functionToAnimate={animate} simple={true} start={start} />
                       
                        <div className="buttons-field">
                            {optionsData.length > 0 && <button onClick={handleReset} className="restart">REINTENTAR</button>}
                            {start ?
                                <button onClick={()=>{handleFinish(setPhase)}}>FINALIZAR</button>:
                                <button onClick={handleClick} disabled={!optionsData.length}>INICIAR</button>
                            }
                        </div>
                    </div>
                )
            }
        </NoScoringComponent>
    )
}