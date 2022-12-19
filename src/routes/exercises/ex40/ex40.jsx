import React from "react"
import ActivityContext from "../../../context/ActivityContext"
import UniqueOption from "../components/uniqueOption"
import NoScoringComponent from "../components/noScoringComponent"
import data from "./data.json"
import "../../../styles/ex40.css"

export default function Ex40() {

    const { setActivity, setTitle, setBackground } = React.useContext(ActivityContext)
    const [inputSel, setInputSel] = React.useState([])
    const [operatorSel, setOperatorSel] = React.useState(null)
    const [result, setResult] = React.useState(null)
    // eslint-disable-next-line no-unused-vars
    const [ myInputs, setMyInputs ] = React.useState({
        options: data.inputs
    })
    // eslint-disable-next-line no-unused-vars
    const [ myOperators, setMyOperators ] = React.useState({
        options: data.operators
    })
    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data
    })

    React.useEffect(() => {
        setTitle(data.name)
        setBackground(data.color)
        return () => {
            setActivity(true)
        }
    }, [setActivity, setBackground, setTitle])

    React.useEffect(() => {
        setResult(handleOperation(inputSel,operatorSel))
    }, [inputSel, operatorSel])

    const handleOperation = (input, operator) => {
        if(!operator || !input.length){
            return "Prueba seleccionando un operador y un valor"
        }
        if(operator === 1){
            return typeof input[0] === "number" ? input[0] + input[1] : "Error"
        }
        if(operator === 2){
            return typeof input[0] === "number" ? input[0] - input[1] : "Error"
        }
        if(operator === 3){
            return typeof input[0] === "number" ? input[0] * input[1] : "Error"
        }
        if(operator === 4){
            return typeof input[0] === "number" ? (input[0] / input[1]).toFixed(3) : "Error"
        }
        if(operator === 5){
            return `${input[0]}${input[1]}`
        }
        if(operator === 6){
            return "Vacio"
        }
        if(operator === 7){
            return `${input[0]} ${input[1]} ${input[0]} ${input[1]}`
        }
        if(operator === 8){
            return `${input[1]} ${input[0]}`
        }
    }


    return (
        <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
        {
            (setPhase) => (
                <>
                <div className = "blackbox">
                    <UniqueOption options={myInputs.options} uniqueName={"entradas"} isCorrectOption={setInputSel} />
                    <UniqueOption options={myOperators.options} uniqueName={"operador"} isCorrectOption={setOperatorSel} />
                    <div className="function">
                        <img src={`./images/exercises/40/blackbox.svg`} alt={"blackbox"}/>
                        <div className="message"><p>{result}</p></div>
                    </div>
                </div>
                <button onClick={() => setPhase("end")}>SIGUIENTE</button>
                </>
            )
        }
        
        </NoScoringComponent>
    )
}