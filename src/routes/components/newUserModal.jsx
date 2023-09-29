import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { postRegister } from '../../requests'
import GenericSelector from '../components/genericSelector'
import styles from '../../styles/popups.module.css'

export default function NewUserModal ({ close }) {
  const { t } = useTranslation("newUserModal")
  const [code, setCode] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [numb, setNumb] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('')

  const [enabled, setEnabled] = useState(false)
  const [done, setDone] = useState(false)
  const [textDone, setTextDone] = useState('')

const options = [
  { value: 'student', label: t("student") },
  { value: 'teacher', label: t("teacher") },
  { value: 'coordinator', label: t("principal") }
]

  useEffect(() => {
    if (code !== '' && firstname !== '' && lastname !== '' && numb !== '' && password !== '' && rol !== '') {
      setEnabled(false)
    } else {
      setEnabled(true)
    }
  }, [code, firstname, lastname, numb, password, rol])
  const handleClick = () => {
    postRegister(
      { institution_code: code, password, first_name: firstname, last_name: lastname, list_number: numb, role: rol },
      (data) => {
        if (data.registered) {
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
              <h2>{t("info-text")}</h2>
              <div className={styles['form-container']}>
                <input type='text' placeholder={t("code")} value={code} onChange={(e) => { setCode(e.target.value) }} />
                <input type='text' placeholder={t("first-name")} value={firstname} onChange={(e) => { setFirstname(e.target.value) }} />
                <input type='text' placeholder={t("last-name")} value={lastname} onChange={(e) => { setLastname(e.target.value) }} />
                <input type='text' placeholder={t("list-number")} value={numb} onChange={(e) => { setNumb(e.target.value) }} />
                <input type='password' placeholder={t("password")} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <GenericSelector options={options} defaultLabel='Rol' setCurrentValue={setRol} />
              </div>
              <button onClick={handleClick} disabled={enabled}>{t("save")}</button>
            </>
        }
      </div>
    </div>
  )
}
