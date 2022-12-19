import React from "react"
import BinaryAnswerComponent from "./binaryAnswerComponent"


export default function CensureComponent({ data, returnScore, isFinished }){

    const [ value, setValue ] = React.useState(false)
    const [ nextQuestion, setNextQuestion ] = React.useState(false)
    const [ current, setCurrent ] = React.useState(null)
    const [ randInt, setRandInt ] = React.useState([0,1,2,3])
    const [ globalScore, setGlobalScore ] = React.useState(0)
    const [ loadedImg, setLoadedImg ] = React.useState(false)



    React.useEffect(() => {
        updateCurrent()
    },[])
    React.useEffect(()=>{
        setLoadedImg(false)
    },[current])

    const updateCurrent = () => {
        if(randInt.length){
            const idx = randInt[randInt.length-1]
            setRandInt(randInt.slice(0,randInt.length-1))
            setCurrent(data.options[idx])
            return null
        }else{
            return "end"
        }
    }

    const handleClick = () => {
        const auxValue = value ? globalScore + 1 : globalScore
        setGlobalScore(auxValue)
        returnScore(auxValue)
        const x = updateCurrent()
        if(x === "end"){
            isFinished("end")
        }else{
            setNextQuestion(false)
        }
    }




    return(
            <div className="binary-test-ex">
                {current && 
                    <>
                    <>
                        {loadedImg ? null : <div className="spinner-3"/> }            
                        <img style={loadedImg ? {} : { display: 'none' }} src={`images/exercises/${data.path}/${current?.image}`} alt="example" onLoad={()=>{setLoadedImg(true)}} />
                    </>      
                    <BinaryAnswerComponent options={current.answers} showCorrect={nextQuestion} returnScore={setValue}/>
                    </>
                }
                {!nextQuestion && <button className="button-play" onClick={()=>{setNextQuestion(true)}}>RESPONDER</button>}
                {nextQuestion && <button className="button-play" onClick={handleClick}>SIGUIENTE</button>}
            </div>
    )
}