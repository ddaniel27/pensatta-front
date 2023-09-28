import { useTranslation } from 'react-i18next'
import '../../../styles/battery.css'

export default function Battery(){
  const { t } = useTranslation("battery")

    return(
        <div className="battery">
            <div className="battery-text">
                <p>{t("text")}</p>
            </div>
        </div>
    )
}
