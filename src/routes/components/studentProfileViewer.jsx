import { useState, useContext, useEffect } from 'react'
import StudentProfileResumen from './studentProfile/studentProfileResumen'
import StudentProfileMetrics from './studentProfile/studentProfileMetrics'
import ActivityContext from '../../context/ActivityContext'
import '../../styles/studentProfileViewer.css'

export default function StudentProfileViewer() {
  const { setTitle } = useContext(ActivityContext)
  const [ toggleView, setToggleView ] = useState(false)
  useEffect(() => {
    setTitle('Perfil')

    return () => {
      setTitle('HUB')
    }
    
  }, [])

  return(
    <>
      {
        toggleView ?
        <StudentProfileMetrics toggleView={setToggleView} /> :
        <StudentProfileResumen toggleView={setToggleView} />
      }
    </>
  )
}
