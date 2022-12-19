import React from "react"
import ScoringComponent from "../components/scoringComponent"
import DndComponent from "../components/dndComponent"
import data from "./data.json"
import "../../../styles/ex10.css"
import "../../../styles/ex39.css"

export default function Ex39(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
    })
    const [start, setStart] = React.useState(false)
    const [reset, setReset] = React.useState(false)

    const [ optionsData, setOptionsData ] = React.useState({})

    const [ value, setValue ] = React.useState(null)

    const imgRef = React.useRef(null)

    React.useEffect(() => {
        async function test(){
            while(!imgRef.current) {
                await new Promise(r => setTimeout(r, 500));
                console.log("waiting...")
            }
            setValue(imgRef.current.contentWindow.document.querySelector("#resultado-inner"))
        }
        test()
    }, [])

    React.useEffect(() => {
        if(value){
            console.log(value)
            value.innerHTML = `${Math.floor(Math.random() * 100)}`
        }
    }, [value])

    React.useLayoutEffect(() => {
        if(reset){
            setReset(false)
        }
    }, [optionsData])

    const handleClick = (cb1, cb2)=>{
        document.querySelector(`.maze-style`).scrollTop = 0;
        setStart(true)
        try{
            const dataToEval = optionsData.map(item => {
                if(item[1] === "resta"){ return "-" }
                else if(item[1] === "multiplicar"){ return "*" }
                else { return item[1] }
    
            })
            let ans = dataToEval[0]
            for(let i = 1; i < dataToEval.length; i+=2){
                console.log(ans, dataToEval[i], dataToEval[i+1])
                ans = eval(`${ans} ${dataToEval[i]} ${dataToEval[i+1]}`)
            }
            if(ans === Number(value.innerHTML)){
                cb1(1)
            }else{
                cb1(0)
            }
            cb2("end")
        }catch(e){
            cb1(0)
            cb2("end")
        }
    }

    const handleReset = () => {
        setStart(false)
        setOptionsData({})
        setReset(true)
    }


    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="maze-style">
                       <DndComponent data={myData} returnScore={setOptionsData} reset={reset} />
                       <iframe src={myData.imgPath} ref={imgRef} />
                       
                        <div className="buttons-field">
                            {optionsData.length > 0 && <button onClick={handleReset} className="restart">REINTENTAR</button>}
                            <button onClick={()=>{handleClick(setScore, setPhase)}} disabled={!optionsData.length}>INICIAR</button>
                        </div>
                    </div>
                )
            }
        </ScoringComponent>
    )
}