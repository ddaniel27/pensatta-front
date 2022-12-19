import React from 'react'
import MenuHam from './menuHam'
import ActivityContext from '../../context/ActivityContext'
import '../../styles/header.css'

export default function Header({ headerText }){

    const { setActivity, setProfile } = React.useContext(ActivityContext)
    const [menuHam, setMenuHam] = React.useState(false)

    const toggleMenuHam = () => {
        setMenuHam(true)
    }

    const handleReset = () => {
        setActivity(true)
        setProfile(false)
    }

    return(
        <header>
            <img src='./images/Atomo_Pensatta-Símbolo.svg' alt='Atomo Pensatta' onClick={handleReset}/>
            <h1>{headerText}</h1>
            <img src='./images/Atomo_Icono_MenúHamburguesa.svg' alt='Menú' onClick={toggleMenuHam}/>
            {menuHam && <MenuHam setShow={setMenuHam} />}
        </header>
    )
}