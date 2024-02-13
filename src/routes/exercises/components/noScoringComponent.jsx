import { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Information from '../../components/information'
import ActivityContext from '../../../context/ActivityContext'
import BackButtonInGame from './backButtonIngame'

export default function NoScoringComponent ({ initMessages = ['Inicia dando click al boton'], title = 'Actividad', children, background = '#E0E0E0' }) {
  const { setActivity, setTitle, setBackground } = useContext(ActivityContext)
  const [phase, setPhase] = useState('init')
  const { t } = useTranslation('noScoringComponent')
  const [finalMessages, setFinalMessages] = useState([t('final-messages')])

  useEffect(() => {
    setTitle(title)
    setBackground(background)
  }, [setTitle, title, setBackground, background])

  useEffect(() => {
    setFinalMessages([t('final-messages')])
  }, [initMessages])

  const handleStart = () => {
    setPhase('activity')
  }

  return (
    <>

      {
        phase === 'init' && <><Information messages={initMessages} /> <button onClick={handleStart}>{t('start-button')}</button></>
      }

      {
        phase === 'activity' && children(setPhase)
      }
      {
        phase === 'activity' && <BackButtonInGame onClick={() => { setPhase('init') }}/>
      }
      {
        phase === 'end' && <><Information messages={finalMessages} />{t('finish-button')} <button onClick={() => { setActivity(true) }} >{t('finish-button')}</button></>
      }
    </>
  )
}
