import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function useData(namespace) {
    const { i18n } = useTranslation([namespace])
    const [data, setData] = useState(i18n.getResourceBundle(i18n.language, namespace))

    useEffect(() => {
      setData(i18n.getResourceBundle(i18n.language, namespace))
    }, [i18n.language])

  return ({ data }) 
}
