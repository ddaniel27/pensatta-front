import React from "react"
import Header from "./components/header"
import AdminView from "./components/adminView"
import StudentView from "./components/studentView"
import ActivityContext from "../context/ActivityContext"
import UserContext from "../context/UserContext"
import CoordinatorView from "./components/coordinatorProfile/coordinatorView"
import '../styles/dashboard.css'
import TeacherView from "./components/teacherProfile/teacherView"

export default function Dashboard(){

    const { loginUser } = React.useContext(UserContext)
    const [ title, setTitle ] = React.useState("HUB")
    const [ activity, setActivity ] = React.useState(true)
    const [ background, setBackground ] = React.useState("#E0E0E0")
    const [ profile, setProfile ] = React.useState(false)

    React.useEffect(()=>{
        return () => {
            setActivity(true)
            setTitle("HUB")
            setBackground("#E0E0E0")
        }
    },[])
    
    return (
        <div className="dashboard" style={{backgroundColor:background}}>
            <ActivityContext.Provider value={{
                activity, 
                setActivity,
                setTitle,
                setBackground,
                profile,
                setProfile
                }}>
                <Header headerText={ title } />
                {
                    loginUser.role.toLowerCase() === "student" &&
                    <StudentView /> 
                }
                {
                    loginUser.role.toLowerCase() === "admin" &&
                    <AdminView />
                }
                {
                    loginUser.role.toLowerCase() === "coordinator" &&
                    <CoordinatorView />
                }
                {
                    loginUser.role.toLowerCase() === "teacher" &&
                    <TeacherView/>
                }
            </ActivityContext.Provider>
        </div>
    )
}