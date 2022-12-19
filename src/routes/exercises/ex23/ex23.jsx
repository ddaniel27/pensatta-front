import React from "react"
import ScoringComponent from "../components/scoringComponent"
import data from "./data.json"
import "../../../styles/ex23.css"

export default function Ex23(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })

    const [currentOption, setCurrentOption] = React.useState(0)
    const [scoreLocal, setScoreLocal] = React.useState(0)
    const [nextQuestion, setNextQuestion] = React.useState(false)
    const [counter, setCounter] = React.useState(0)
    
    React.useEffect(()=>{
        setCurrentOption(myData.options[0])
    },[myData])



    const handleChange = ({target}) => {
        if(target.checked){
            if(target.value === currentOption.fix){
                setScoreLocal(1)
            }else{
                setScoreLocal(0)
            }
        }
    }

    const handleClick = (cb1, cb2) => {
        // cb("end")
        cb1(prevStatus => prevStatus + scoreLocal)
        if(counter < myData.options.length - 1){
            setCurrentOption(myData.options[counter + 1])
            setCounter(counter + 1)
            setNextQuestion(false)
        }else{
            cb2("end")
        }
    }

    React.useEffect(() => {
        if(nextQuestion){
            document.querySelector(`.${currentOption.fix} .color`).classList.add("color-selected")
        }else{
            document.querySelectorAll(".color").forEach(el => { el.classList.remove("color-selected") })
            document.querySelectorAll("input").forEach(el => { el.checked = false })
        }
    }, [nextQuestion])



    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="fix-ex23">
                        <div className="ex23-question">
                            <img src="images/exercises/23/Torre.svg" alt="question" />
                            <div className="ex23-question-title">
                                <h2>Reporte Técnico</h2>
                                <p>
                                    {currentOption.error}
                                </p>
                            </div>
                        </div>
                        <div className="ex23-options">
                            <label className="Board">
                                <input onChange={handleChange} type="radio" name="fix" value="Board" disabled={nextQuestion} />
                                <p className="color"></p>
                                <p className="img-container"></p>
                            </label>
                            <label className="HDD">
                                <input onChange={handleChange} type="radio" name="fix" value="HDD" disabled={nextQuestion} />
                                <p className="color"></p>
                                <p className="img-container"></p>
                            </label>
                            <label className="GPU">
                                <input onChange={handleChange} type="radio" name="fix" value="GPU" disabled={nextQuestion} />
                                <p className="color"></p>
                                <p className="img-container"></p>
                            </label>
                            <label className="CPU">
                                <input onChange={handleChange} type="radio" name="fix" value="CPU" disabled={nextQuestion} />
                                <p className="color"></p>
                                <p className="img-container"></p>
                            </label>
                            <label className="RAM">
                                <input onChange={handleChange} type="radio" name="fix" value="RAM" disabled={nextQuestion} />
                                <p className="color"></p>
                                <p className="img-container"></p>
                            </label>
                            {!nextQuestion && <button className="button-play" onClick={()=>{setNextQuestion(true)}}>RESPONDER</button>}
                            {nextQuestion && <button className="button-play" onClick={()=>{handleClick(setScore, setPhase)}}>SIGUIENTE</button>}
                        </div>
                    </div>
                )
            }
        </ScoringComponent>
    )
}