import { useState, useEffect } from 'react'
import { updateInsitutions } from '../../requests'
import { useTranslation } from 'react-i18next'
import styles from '../../styles/popups.module.css'

export default function EditorModal ({ institution, field, close }) {
  const [value, setValue] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [done, setDone] = useState(false)
  const [textDone, setTextDone] = useState('')
  const { t } = useTranslation("editorModal")

  useEffect(() => {
    if (value !== '') {
      setEnabled(false)
    } else {
      setEnabled(true)
    }
  }, [value])

  const handleClick = () => {
    updateInsitutions(
      { institution_code: institution, field, value },
      (data) => {
        if (data.updated) {
          setTextDone(t("success"))
        } else {
          setTextDone(t("error"))
        }
        setDone(true)
      },
      () => {
        alert('Error')
      })
  }

  return (
    <div className={styles['big-container']}>
      <div className={styles['editor-modal']}>
        {
          done
            ? <>
              <h2>{textDone}</h2>
              <button onClick={() => { window.location.reload() }}>{t("update-button")}</button>
            </>
            : <>
              <span onClick={() => { close(false) }} />
              <h2>{t("new-value")}</h2>
              <input type='text' placeholder={field} value={value} onChange={(e) => { setValue(e.target.value) }} />
              <button onClick={handleClick} disabled={enabled}>{t("save")}</button>
            </>
        }
      </div>
    </div>
  )
}
