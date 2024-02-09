import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import Information from '../../components/information'
import ActivityContext from '../../../context/ActivityContext'
import { postExercise } from '../../../requests'
import BackButtonInGame from './backButtonIngame'

export default function ScoringComponent ({ initMessages = ['Inicia dando click al boton'], title = 'Actividad', children, background = '#E0E0E0', threshold = { perfect: 1, max: 1, min: 1 }, exerciseId = 0 }) {
  const { t } = useTranslation('scoringComponent')
  const { setActivity, setTitle, setBackground } = useContext(ActivityContext)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState('init')
  const [resultMessage, setResultMessage] = useState(['Buen trabajo'])
  const [timeMeasure, setTimeMeasure] = useState(0)
  const [disableButton, setDisableButton] = useState(true)

  useEffect(() => {
    setTitle(title)
    setBackground(background)
  }, [setTitle, title, setBackground, background])

  useEffect(() => {
    setPhase('init')
  }, [initMessages])

  useEffect(() => {
    if (score >= threshold.max) {
      setResultMessage([t('result-excelent'), `${t('result-1')}${score}${t('result-2')}${threshold.perfect}${t('result-3')}`])
    } else if (score < threshold.max && score > threshold.min) {
      setResultMessage([t('result-good'), `${t('result-1')}${score}${t('result-2')}${threshold.perfect}${t('result-3')}`])
    } else {
      setResultMessage([t('result-bad'), `${t('result-1')}${score}${t('result-2')}${threshold.perfect}${t('result-3')}`])
    }
  }, [score, threshold.max, threshold.min, threshold.perfect])

  useEffect(() => {
    function postScore () {
      if (phase === 'end') {
        const data = {
          score: ((score / threshold.perfect) * 100).toFixed(2),
          time: new Date().getTime() - timeMeasure,
          exercise: exerciseId,
          id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : 0
        }
        postExercise(data,
          function (response) {
            setDisableButton(false)
          },
          function (error) {
            setDisableButton(false)
            console.log(error)
          }
        )
      }
    }
    postScore()
  }, [phase, timeMeasure])

  const handleStart = () => {
    setPhase('activity')
    setTimeMeasure(new Date().getTime())
  }

  return (
    <>

      {
        phase === 'init' && <><Information messages={initMessages} /> <button onClick={handleStart}>{t('button-init')}</button></>
      }

      {
        phase === 'activity' && children(setScore, setPhase)
      }
      {
        phase === 'activity' && <BackButtonInGame onClick={() => { setPhase('init') }} />
      }
      {
        phase === 'end' && <><Information messages={resultMessage} /> <button onClick={() => { setActivity(true) }} disabled={disableButton}>{t('button-end')}</button></>
      }
    </>
  )
}
