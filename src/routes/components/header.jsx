import { useState, useContext } from 'react'
import MenuHam from './menuHam'
import { useTranslation } from 'react-i18next'
import ActivityContext from '../../context/ActivityContext'
import UserContext from '../../context/UserContext'
import '../../styles/header.css'

export default function Header({ headerText }){

    const { setActivity, setProfile } = useContext(ActivityContext)
  const { loginUser } = useContext(UserContext)
    const [menuHam, setMenuHam] = useState(false)
    const { i18n } = useTranslation()

    const toggleMenuHam = () => {
        setMenuHam(true)
    }

    const handleReset = () => {
        setActivity(true)
        setProfile(false)
    }

    const handleChangeLanguage = ({ target }) => {
      i18n.changeLanguage(target.value)
    }

    return(
        <header>
            <img src='./images/Atomo_Pensatta-Símbolo.svg' alt='Atomo Pensatta' onClick={handleReset}/>
            <h1>{headerText}</h1>
            <div className="ham-div">
              <img src='./images/Atomo_Icono_MenúHamburguesa.svg' alt='Menú' onClick={toggleMenuHam}/>
              {
                loginUser.role.toLowerCase() === 'admin' &&
                <select className="select-header-lang" name="type" onChange={handleChangeLanguage} >
                  <option value="es">ES</option>
                  <option value="en">EN</option>
                  <option value="pt">PT</option>
                </select>
              }
            </div>
            {menuHam && <MenuHam setShow={setMenuHam} />}
        </header>
    )
}
