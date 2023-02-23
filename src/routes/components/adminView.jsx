import React from 'react'
import SelectExercise from './selectExercise'
import ActivityContext from '../../context/ActivityContext'
import RouterActivity from '../exercises/routerActivity'
import InstitutionScreen from './institutionScreen'
import NavMenu from './navMenu'
import { getInstitutions } from '../../requests'
import '../../styles/adminView.css'

export default function AdminView () {
  const { activity, setTitle, setBackground, setActivity } = React.useContext(ActivityContext)
  const [exerciseId, setExerciseId] = React.useState(0)
  const [disableButton, setDisableButton] = React.useState(true)
  const [screen, setScreen] = React.useState('exercise')
  const refContainer = React.useRef({})

  React.useEffect(() => {
    async function getInst () {
      getInstitutions((data) => {
        refContainer.current.institutionList = data.institutions
      })
    }
    getInst()
  }, [])

  React.useEffect(() => {
    if (activity) {
      setTitle('HUB')
      setBackground('#E0E0E0')
    }
  }, [activity, setBackground, setTitle])

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
                    <SelectExercise setId={setExerciseId} disableButton={setDisableButton} />
                    <button className='button-play' onClick={handleStart} disabled={disableButton}>JUGAR</button>
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
