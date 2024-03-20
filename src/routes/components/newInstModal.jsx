import { useState, useEffect } from 'react'
import { addInstitution } from '../../requests'
import { useTranslation } from 'react-i18next'
import styles from '../../styles/popups.module.css'

export default function NewInstModal ({ close }) {
  const { t } = useTranslation('newInstModal')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [language, setLanguage] = useState('')

  const [enabled, setEnabled] = useState(false)
  const [done, setDone] = useState(false)
  const [textDone, setTextDone] = useState('')

  useEffect(() => {
    if (code !== '' && name !== '' && email !== '' && country !== '' && province !== '' && city !== '') {
      setEnabled(false)
    } else {
      setEnabled(true)
    }
  }, [code, name, email, country, province, city])
  const handleClick = () => {
    addInstitution(
      { institution_code: code, name, email, country, province, city, language },
      (data) => {
        if (data.registered) {
          setTextDone(t('success'))
        } else {
          setTextDone(t('error'))
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
              <button onClick={() => { window.location.reload() }}>{t('update-button')}</button>
            </>
            : <>
              <span onClick={() => { close(false) }} />
              <h2>{t('info-text')}</h2>
              <input type='text' placeholder={t('code')} value={code} onChange={(e) => { setCode(e.target.value) }} />
              <input type='text' placeholder={t('name')} value={name} onChange={(e) => { setName(e.target.value) }} />
              <input type='text' placeholder={t('email')} value={email} onChange={(e) => { setEmail(e.target.value) }} />
              <input type='text' placeholder={t('country')} value={country} onChange={(e) => { setCountry(e.target.value) }} />
              <input type='text' placeholder={t('province')} value={province} onChange={(e) => { setProvince(e.target.value) }} />
              <input type='text' placeholder={t('city')} value={city} onChange={(e) => { setCity(e.target.value) }} />
              <select value={language} onChange={(e) => { setLanguage(e.target.value) }}>
                <option value='' disabled>{t('language')}</option>
                <option value='es'>{t('spanish')}</option>
                <option value='en'>{t('english')}</option>
                <option value="pt">{t('portuguese')}</option>
              </select>
              <button onClick={handleClick} disabled={enabled}>{t('save')}</button>
            </>
        }
      </div>
    </div>
  )
}
