import { useState, useContext, useEffect } from 'react'
import StudentProfileResumen from './studentProfile/studentProfileResumen'
import StudentProfileMetrics from './studentProfile/studentProfileMetrics'
import ActivityContext from '../../context/ActivityContext'
import UserContext from '../../context/UserContext'
import '../../styles/studentProfileViewer.css'

export default function StudentProfileViewer() {
  const { setTitle } = useContext(ActivityContext)
  const { loginUser } = useContext(UserContext)
  const [toggleView, setToggleView] = useState(false)
  useEffect(() => {
    setTitle('Perfil')

    return () => {
      setTitle('HUB')
    }
  }, [])

  return(
    <>
      {
        toggleView
          ? <StudentProfileMetrics toggleView={setToggleView} userObject={loginUser} />
          : <StudentProfileResumen toggleView={setToggleView} userObject={loginUser} />
      }
    </>
  )
}
