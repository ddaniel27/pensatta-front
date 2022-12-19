import React from "react"
import ScoringComponent from "../components/scoringComponent"
import data from "./data.json"
import "../../../../styles/ex34.css"

export default function Ex34(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        options: data.options.sort(() => 0.5 - Math.random()).slice(0, 8)
    })

    const [ value, setValue ] = React.useState(null)
    const [ nextQuestion, setNextQuestion ] = React.useState(false)
    const [ counterSelect, setCounterSelect ] = React.useState(0)

    React.useEffect(() => {
        if(nextQuestion){
            document.querySelectorAll(`.span-visualizer ul li input[value="unsafe"]`)
                .forEach(element => {
                    if(element.checked){
                        element.parentNode.style.backgroundColor = "#00D8CC"
                    }else{
                        element.parentNode.style.backgroundColor = "#F97D61"
                    }
                })
            const list = [...document.querySelectorAll(`.span-visualizer ul li input:checked[value="unsafe"]`)]
            setValue(list.length)
        }
    }, [nextQuestion])

    const handleClick = (cb1, cb2) => {
        cb1(value)
        cb2("end")
    }

    const handleChange = ({target})=>{
        let value = counterSelect
        if(target.checked){
            value++
            setCounterSelect(value)
        }else{
            value--
            setCounterSelect(value)
        }
        if(value > 4){
            target.checked = false
            value--
            setCounterSelect(value)
        }
    }

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="spam-ex34">
                        <div className="span-visualizer">
                            <ul>
                                {
                                    myData.options.map((option, index) => (
                                        <li key={index}>
                                            <input type="checkbox" id={`option-${index}`} value={option.isSafe} disabled={nextQuestion} onChange={handleChange}/>
                                            <span>{option.subject}</span>
                                            <span>{option.email}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        {!nextQuestion && <button className="button-play" onClick={()=>{setNextQuestion(true)}}>RESPONDER</button>}
                        {nextQuestion && <button className="button-play" onClick={()=>{handleClick(setScore,setPhase)}}>SIGUIENTE</button>}
                    </div>
                )
            }
        </ScoringComponent>
    )
}