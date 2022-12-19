import React from "react"
import Information from "../../components/information"
import ActivityContext from "../../../context/ActivityContext"
import { postExercise } from "../../../requests"

export default function ScoringComponent({initMessages=["Inicia dando click al boton"], title="Actividad", children, background="#E0E0E0", threshold={perfect: 1, max: 1, min: 1}, exerciseId = 0}){

    const { setActivity, setTitle, setBackground } = React.useContext(ActivityContext)
    const [score, setScore] = React.useState(0)
    const [phase, setPhase] = React.useState("init")
    const [resultMessage, setResultMessage] = React.useState(["Buen trabajo"])
    const [timeMeasure, setTimeMeasure] = React.useState(0)
    const [disableButton, setDisableButton] = React.useState(true)

    React.useEffect(()=>{
        setTitle(title)
        setBackground(background)
    },[setTitle, title, setBackground, background])

    React.useEffect(()=>{
        if(score >= threshold.max){
            setResultMessage([`¡Felicidades! Has terminado el ejercicio.`, `Tu puntuación es ${score} de ${threshold.perfect} puntos.`])
        }else if(score > threshold.max && score <= threshold.min){
            setResultMessage([`¡Vaya! Has terminado el ejercicio.`, `Tu puntuación es ${score} de ${threshold.perfect} puntos.`])
        }else{
            setResultMessage([`¡Mejor suerte para la proxima!`, `Tu puntuación es ${score} de ${threshold.perfect} puntos.`])
        }
    },[score, threshold.max, threshold.min, threshold.perfect])

    React.useEffect(()=>{
        function postScore(){
            if(phase === "end"){
                const data = {
                    score: ((score/threshold.perfect)*100).toFixed(2),
                    time: new Date().getTime() - timeMeasure,
                    exercise: exerciseId
                }
                postExercise(data,
                    function (response) {
                        setDisableButton(false)
                        console.log(response)
                    },
                    function (error) {
                        setDisableButton(false)
                        console.log(error)
                    }
                )
            }
        }
        postScore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[phase, timeMeasure])

    const handleStart = () => {
        setPhase("activity")
        setTimeMeasure(new Date().getTime())
    }


    return(
        <>

            {
                phase === "init" && <><Information messages={initMessages} /> <button onClick={handleStart}>INICIAR</button></>
            }

            {
                phase === "activity" && children(setScore, setPhase)
            }
            {
                phase === "end" && <><Information messages={resultMessage} /> <button onClick={()=>{setActivity(true)}} disabled={disableButton} >FINALIZAR</button></>
            }
        </>
        )
}