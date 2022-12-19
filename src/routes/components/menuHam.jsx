import React from "react"
import { postLogout } from "../../requests"
import UserContext from "../../context/UserContext"
import ActivityContext from "../../context/ActivityContext"
import '../../styles/menuHam.css'


export default function MenuHam({setShow}){

    const {setLoginUser} = React.useContext(UserContext)
    const {setProfile} = React.useContext(ActivityContext)

    const logout = () => {
        postLogout(setLoginUser)
    }

    return(
        <div className="menu-ham">
            <div className="logout" onClick={logout}>
                <img src='./images/Katty-Retrato.svg' alt='Katty'/>
                <h4>Cerrar Sesion</h4>
            </div>
            <div className="settings" onClick={()=>{setProfile(true); setShow(false)}}>
                <img src='./images/Katty-Retrato.svg' alt='Katty'/>
                <h4>Mi tablero</h4>
            </div>
            <div className="close" onClick={()=>{setShow(false)}}>
            </div>
        </div>
    )
}