import React from "react"
import Header from "../components/header"
import StudentView from "./studentView"
import ActivityContext from "../../context/ActivityContext"
import '../../styles/dashboard.css'

export default function Dashboard(){

    const [ title, setTitle ] = React.useState("HUB")
    const [ activity, setActivity ] = React.useState(true)
    const [ background, setBackground ] = React.useState("#E0E0E0")
    const [ profile, setProfile ] = React.useState(false)
    const [ exercises, setExercises ] = React.useState(
        {
            12: {},
            3: {},
            10: {},
            16: {},
            34: {},
            41:{}
        }
    )

    React.useEffect(()=>{
        return () => {
            setActivity(true)
            setTitle("HUB")
            setBackground("#E0E0E0")
        }
    },[])

    React.useEffect(()=>{
        console.log(exercises)
    },[exercises])
    
    return (
        <div className="dashboard" style={{backgroundColor:background}}>
            <ActivityContext.Provider value={{
                activity, 
                setActivity,
                setTitle,
                setBackground,
                profile,
                setProfile,
                exercises,
                setExercises
                }}>
                <Header headerText={ title } />
                <StudentView /> 
            </ActivityContext.Provider>
        </div>
    )
}