import React from 'react'
import MenuHam from './menuHam'
import { useTranslation } from 'react-i18next'
import ActivityContext from '../../context/ActivityContext'
import '../../styles/header.css'

export default function Header({ headerText }){

    const { setActivity, setProfile } = React.useContext(ActivityContext)
    const [menuHam, setMenuHam] = React.useState(false)
    const { i18n } = useTranslation()

    const toggleMenuHam = () => {
        setMenuHam(true)
    }

    const handleReset = () => {
        setActivity(true)
        setProfile(false)
    }

    const handleChangeLanguage = () => {
      i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
    }

    return(
        <header>
            <img src='./images/Atomo_Pensatta-Símbolo.svg' alt='Atomo Pensatta' onClick={handleReset}/>
            <h1>{headerText}</h1>
            <div>
              <img src='./images/Atomo_Icono_MenúHamburguesa.svg' alt='Menú' onClick={toggleMenuHam}/>
              <button className="header__language__selector" onClick={handleChangeLanguage}>{i18n.language}</button>
            </div>
            {menuHam && <MenuHam setShow={setMenuHam} />}
        </header>
    )
}
