import React from "react"
import ScoringComponent from "../components/scoringComponent"
import DndComponent from "../components/dndComponent"
import data from "./data.json"
import "../../../styles/ex10.css"

export default function Ex37(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        patterns: data.patterns.sort(() => 0.5 - Math.random()).slice(0, 1)
    })
    const [start, setStart] = React.useState(false)
    const [reset, setReset] = React.useState(false)
    const [finished, setFinished] = React.useState(false)

    const [ optionsData, setOptionsData ] = React.useState({})

    const [rojo, setRojo] = React.useState(null)
    const [amarillo, setAmarillo] = React.useState(null)
    const [verde, setVerde] = React.useState(null)

    const [rojoObjective, setRojoObjective] = React.useState(null)
    const [amarilloObjective, setAmarilloObjective] = React.useState(null)
    const [verdeObjective, setVerdeObjective] = React.useState(null)

    const rojoRef = React.useRef(null)
    const amarilloRef = React.useRef(null)
    const verdeRef = React.useRef(null)

    const rojoObjectiveRef = React.useRef(null)
    const amarilloObjectiveRef = React.useRef(null)
    const verdeObjectiveRef = React.useRef(null)

    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n)
        })
    }

    React.useEffect(() => {
        async function test(){
            while(!rojoRef.current && !verdeRef.current && !amarilloRef.current && !rojoObjectiveRef.current && !verdeObjectiveRef.current && !amarilloObjectiveRef.current) {
                await new Promise(r => setTimeout(r, 500));
                console.log("waiting...")
            }
            setRojo(rojoRef.current)
            setVerde(verdeRef.current)
            setAmarillo(amarilloRef.current)
            setRojoObjective(rojoObjectiveRef.current)
            setVerdeObjective(verdeObjectiveRef.current)
            setAmarilloObjective(amarilloObjectiveRef.current)
        }
        test()
    }, [])

    React.useLayoutEffect(() => {
        if(reset){
            setReset(false)
        }
    }, [optionsData])

    const handleClick = async (cb1)=>{
        document.querySelector(`.maze-style`).scrollTop = 0;
        setStart(true)
        const result = optionsData.map(item=>item[0])
        const result2 = myData.patterns[0].map(item=>item[0])
        for(let i = result.length-1; i >= 0; i--){
            if(result[i] !== result2[i]){
                cb1(0)
                break
            }else{
                cb1(1)
            }
        }
        await Promise.all([playPattern(), playCustomPattern()])
        setFinished(true)
    }

    const handleReset = () => {
        setStart(false)
        setFinished(false)
        setOptionsData({})
        setReset(true)
    }

    const playPattern = async () => {
        for(const action of myData.patterns[0]){
            if(action[0] === "rojo"){
                rojoObjective.style["fill-opacity"] = "0"
                await delay(1000)
                rojoObjective.style["fill-opacity"] = "0.6"
            }else if(action[0] === "amarillo"){
                amarilloObjective.style["fill-opacity"] = "0"
                await delay(1000)
                amarilloObjective.style["fill-opacity"] = "0.6"
            }else if(action[0] === "verde"){
                verdeObjective.style["fill-opacity"] = "0"
                await delay(1000)
                verdeObjective.style["fill-opacity"] = "0.6"
            }
            await delay(1000)
        }
    }
    
    const playCustomPattern = async () => {
        for(const action of optionsData){
            if(action[0] === "rojo"){
                rojo.style["fill-opacity"] = "0"
                await delay(1000)
                rojo.style["fill-opacity"] = "0.6"
            }else if(action[0] === "amarillo"){
                amarillo.style["fill-opacity"] = "0"
                await delay(1000)
                amarillo.style["fill-opacity"] = "0.6"
            }else if(action[0] === "verde"){
                verde.style["fill-opacity"] = "0"
                await delay(1000)
                verde.style["fill-opacity"] = "0.6"
            }
            await delay(1000)
        }
    }


    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="maze-style">
                       <DndComponent data={myData} returnScore={setOptionsData} reset={reset} />
                       <div className="info-box">
                        <div>
                            <svg width="180" height="80" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Semaforo 1">
                                <rect x="2" y="2" width="176" height="76" rx="38" fill="#333333"/>
                                <ellipse cx="90" cy="41" rx="15" ry="15" transform="rotate(-90 90 41)" fill="#EDCA71"/>
                                <ellipse cx="141" cy="41" rx="15" ry="15" transform="rotate(-90 141 41)" fill="#FF7171"/>
                                <ellipse cx="36" cy="41" rx="15" ry="15" transform="rotate(-90 36 41)" fill="#69E485"/>
                                <ellipse ref={verdeObjectiveRef} cx="36" cy="41" rx="15" ry="15" transform="rotate(-90 36 41)" fill="#2F2F2F" fillOpacity="0.5"/>
                                <ellipse ref={amarilloObjectiveRef} cx="90" cy="41" rx="15" ry="15" transform="rotate(-90 90 41)" fill="#2F2F2F" fillOpacity="0.5"/>
                                <ellipse ref={rojoObjectiveRef} cx="141" cy="41" rx="15" ry="15" transform="rotate(-90 141 41)" fill="#2F2F2F" fillOpacity="0.5"/>
                                <rect x="2" y="2" width="176" height="76" rx="38" stroke="#F2F2F2" strokeWidth="4"/>
                                </g>
                            </svg>
                            <p onClick={playPattern}></p>
                        </div>
                        <svg width="360" height="160" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Sem&#195;&#161;foro 1">
                        <rect x="2" y="2" width="176" height="76" rx="38" fill="#333333"/>
                        <ellipse cx="90" cy="41" rx="15" ry="15" transform="rotate(-90 90 41)" fill="#EDCA71"/>
                        <ellipse cx="141" cy="41" rx="15" ry="15" transform="rotate(-90 141 41)" fill="#FF7171"/>
                        <ellipse cx="36" cy="41" rx="15" ry="15" transform="rotate(-90 36 41)" fill="#69E485"/>
                        <ellipse ref={verdeRef} cx="36" cy="41" rx="15" ry="15" transform="rotate(-90 36 41)" fill="#2F2F2F" fillOpacity="0.5"/>
                        <ellipse ref={amarilloRef} cx="90" cy="41" rx="15" ry="15" transform="rotate(-90 90 41)" fill="#2F2F2F" fillOpacity="0.5"/>
                        <ellipse ref={rojoRef} cx="141" cy="41" rx="15" ry="15" transform="rotate(-90 141 41)" fill="#2F2F2F" fillOpacity="0.5"/>
                        <rect x="2" y="2" width="176" height="76" rx="38" stroke="#F2F2F2" strokeWidth="4"/>
                        </g>
                        </svg>
                       </div>
                       
                        <div className="buttons-field">
                            {optionsData.length > 0 && <button onClick={handleReset} className="restart">REINTENTAR</button>}
                            {!start && <button onClick={()=>{handleClick(setScore)}} disabled={!optionsData.length}>INICIAR</button>}
                            {finished && <button onClick={()=>{setPhase("end")}} disabled={!optionsData.length}>FINALIZAR</button>}
                        </div>
                    </div>
                )
            }
        </ScoringComponent>
    )
}