import React from "react"
import Information from "../../components/information"
import ActivityContext from "../../../context/ActivityContext"
import RouterActivity from "./routerActivity"
import StudentProfileViewer from "./studentProfileViewer"
import '../../styles/mainArea.css'

export default function StudentView(){

    const { activity, setTitle, setBackground, setActivity, profile, exercises} = React.useContext(ActivityContext)

    const [ randomId, setRandomId ] = React.useState(0)
    const [ messageState, setMessageState ] = React.useState(["¡Qué gusto tenerte por acá!"])

    const handleMessages = () => {
        const completed = Object.values(exercises).every(exercise => exercise.score !== undefined)
        if(completed){
            setMessageState(["¡Felicidades! Has terminado el demo.", "¡Revisa tus resultados en tu perfil!"])
        }else{
            setActivity(false)
            setRandomId(prev => {
                if(prev === 0){
                    return 12
                }else if(prev === 12){
                    return 3
                }else if(prev === 3){
                    return 10
                }else if(prev === 10){
                    return 16
                }else if(prev === 16){
                    return 34
                }else if(prev === 34){
                    return 12
                }
            })
        }
    }

    React.useEffect(()=>{
        if(activity){
            setTitle("HUB") 
            setBackground("#E0E0E0")
        }
    },[activity, setBackground, setTitle])

    return(
            <div className="main-area">
                {
                    profile ? 
                    <StudentProfileViewer/>:
                    (
                    activity ? 
                        <>
                            <Information messages={messageState} />
                            <button className="button-play" onClick={handleMessages}>JUGAR</button> 
                        </> :
                        <RouterActivity idExercise={randomId}/>
                    )
                }
            </div>
    )
}