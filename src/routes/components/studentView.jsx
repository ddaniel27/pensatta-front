import React from "react"
import Information from "./information"
import ActivityContext from "../../context/ActivityContext"
import RouterActivity from "../exercises/routerActivity"
import StudentProfileViewer from "./studentProfileViewer"
import '../../styles/mainArea.css'

export default function StudentView(){

    const { activity, setTitle, setBackground, setActivity, profile} = React.useContext(ActivityContext)
    
    const [ randomId, setRandomId ] = React.useState(0)

    const handleMessages = () => {
        setActivity(false)
        setRandomId(
            [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            21,
            22,
            23,
            24,
            25,
            26,
            28,
            29,
            31,
            33,
            34,
            35,
            37,
            38,
            39,
            40,
            41,
            43,
            44,
            46,
            47,
            50,
            51,
            53,
            54,
            55,
            57,
            61,
            68,
            69,
            75,
            77,
            82,
            84,
            86,
            95,
            99,
            101,
            107
        ][Math.floor(Math.random() * 55)]
        )
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
                            <Information messages={["¡Qué gusto tenerte por acá!"]} />
                            <button className="button-play" onClick={handleMessages}>JUGAR</button> 
                        </> :
                        <RouterActivity idExercise={randomId}/>
                    )
                }
            </div>
    )
}