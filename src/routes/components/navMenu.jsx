import { useTranslation } from 'react-i18next'
import "../../styles/navMenu.css";

export default function NavMenu({setScreen}){
  const { t } = useTranslation("navMenu")
    const handleClick = ({target}) => {
        if(target.checked && setScreen){
            setScreen(target.value)
        }
    }

    return(
        <div className="nav-menu">
            <input type="radio" name="nav-menu" id="nav-menu-1" value={"exercise"} defaultChecked onChange={handleClick} />
            <label htmlFor="nav-menu-1">
                <span className="nav-menu-icon">
                    <i className="fas fa-dumbbell"></i>
                </span>
                <span className="nav-menu-text">{t("exercises")}</span>
            </label>
            <input type="radio" name="nav-menu" id="nav-menu-2" value={"institution"} onChange={handleClick} />
            <label htmlFor="nav-menu-2">
                <span className="nav-menu-icon">
                    <i className="fas fa-university"></i>
                </span>
                <span className="nav-menu-text">{t("institutions")}</span>
            </label>
        </div>
    )
}
