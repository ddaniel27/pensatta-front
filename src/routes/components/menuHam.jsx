import React from 'react'
import { postLogout } from '../../requests'
import UserContext from '../../context/UserContext'
import ActivityContext from '../../context/ActivityContext'
import '../../styles/menuHam.css'

export default function MenuHam ({ setShow }) {
  const { setLoginUser, loginUser } = React.useContext(UserContext)
  const { setProfile } = React.useContext(ActivityContext)

  const logout = () => {
    if (loginUser.role.toLowerCase() === 'student') {
      window.open('https://forms.gle/NipJYn7xQwv2PNCHA')
    }
    postLogout(setLoginUser)
  }

  return (
    <div className='menu-ham'>
      <div className={`logout ${loginUser.role.toLowerCase()}`} onClick={logout}>
        <img src='./images/Katty-Retrato.svg' alt='Katty' />
        <h4>Cerrar Sesion</h4>
      </div>
      {
        loginUser.role.toLowerCase() === 'student' &&
        <div className='settings' onClick={() => { setProfile(true); setShow(false) }}>
          <img src='./images/Katty-Retrato.svg' alt='Katty' />
          <h4>Mi tablero</h4>
        </div>
      }
      <div className={`close ${loginUser.role.toLowerCase()}`} onClick={() => { setShow(false) }} />
    </div>
  )
}
