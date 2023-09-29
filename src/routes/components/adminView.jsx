import { useContext, useRef, useState, useEffect } from 'react'
import GenericSelector from './genericSelector'
import ActivityContext from '../../context/ActivityContext'
import RouterActivity from '../exercises/routerActivity'
import InstitutionScreen from './institutionScreen'
import NavMenu from './navMenu'
import data from '../../exercisesList.json'
import { getInstitutions } from '../../requests'
import { useTranslation } from 'react-i18next'
import '../../styles/adminView.css'

export default function AdminView () {
  const { activity, setTitle, setBackground, setActivity } = useContext(ActivityContext)
  const [exerciseId, setExerciseId] = useState(0)
  const [disableButton, setDisableButton] = useState(true)
  const [screen, setScreen] = useState('exercise')
  const refContainer = useRef({})
  const { t } = useTranslation("adminView")

  useEffect(() => {
    async function getInst () {
      getInstitutions((data) => {
        refContainer.current.institutionList = data.institutions
      })
    }
    getInst()
  }, [])

  useEffect(() => {
    if (activity) {
      setTitle('HUB')
      setBackground('#E0E0E0')
    }
  }, [activity, setBackground, setTitle])

  useEffect(() => {
    if (exerciseId) {
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
  }, [exerciseId])

  const handleStart = () => {
    setActivity(false)
  }

  return (
    <div className='main-area'>
      {
        activity
          ? <div className='screen-selector-admin'>
            <NavMenu setScreen={setScreen} />
            {
              screen === 'exercise' &&
                <>
                  <GenericSelector setCurrentValue={setExerciseId} options={data.ex} defaultLabel={t("label")} />
                  <button className='button-play' onClick={handleStart} disabled={disableButton}>{t("play")}</button>
                </>
            }
            {
              screen === 'institution' &&
                <InstitutionScreen institutionList={refContainer.current.institutionList} />
            }
          </div>
          : <RouterActivity idExercise={exerciseId} />
      }
    </div>
  )
}
