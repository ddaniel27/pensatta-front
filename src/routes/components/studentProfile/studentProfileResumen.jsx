import { useState, useEffect } from 'react'
import ProfileCard from './profileCard'
import ProgressBar from './progressBar'
import BadgeDisplayer from './badgeDisplayer'
import TableDisplayExercises from './tableDisplayExercises'
import { getResumen } from '../../../requests'
import '../../../styles/studentProfileResume.css'

export default function StudentProfileResume ({ toggleView, userObject }) {
  const [resumenData, setResumenData] = useState({})
  const [registers, setRegisters] = useState([])
<<<<<<< HEAD
=======
  const { loginUser } = useContext(UserContext)
  console.log(loginUser)
>>>>>>> c00bc8471477e46d705f38d76ed1aa3a08fb7920

  const callHistoryEndpoint = async (user) => {
    getResumen(user, setResumenData)
  }

  useEffect(() => {
    callHistoryEndpoint(userObject.id)
  }, [])

  useEffect(() => {
    if (resumenData.resumen) {
      const timeToSeconds = Math.round(resumenData.resumen.average_time / 1000)
      const timeStr = `${Math.floor(timeToSeconds / 60)}:${timeToSeconds % 60 < 10 ? '0' + timeToSeconds % 60 : timeToSeconds % 60}`
      const objeMaped = {
        exercise_id: resumenData.resumen.total_exercises,
        time: timeStr,
        score: resumenData.resumen.average_score
      }
      setRegisters([objeMaped])
    }
    console.log('hola', resumenData)
  }, [resumenData])

  useEffect(() => {
    console.log('registest', registers)
  }, [registers])

  return (
<<<<<<< HEAD
    <div className='student-profile-viewer'>
      <div className='student-profile-viewer-header-left'>
        <ProfileCard {...userObject} institution_code={resumenData.institution_name} />
      </div>
      <div className='student-profile-viewer-header-right'>
        <span>Última conexión: {new Date(userObject.last_login).toLocaleString()}</span>
        <span className='level-span'>Nivel {Math.ceil(userObject.total_exercises / 4)}</span>
      </div>
      <div className='student-profile-viewer-body-left'>
        <ProgressBar actual={registers[0]?.exercise_id || userObject.total_exercises} />
=======
    <div className="student-profile-viewer">
      <div className="student-profile-viewer-header-left">
        <ProfileCard {...loginUser} institution_code={resumenData.institution_name} />
      </div>
      <div className="student-profile-viewer-header-right">
        <span>Última conexión: { new Date(resumenData.last_login).toLocaleString() }</span>
        <span className="level-span">Nivel { Math.ceil(resumenData.resumen?.total_exercises / 4) }</span>
      </div>
      <div className="student-profile-viewer-body-left">
        <ProgressBar actual={registers[0]?.exercise_id || resumenData.resumen?.total_exercises} />
>>>>>>> c00bc8471477e46d705f38d76ed1aa3a08fb7920
        <TableDisplayExercises
          registers={registers}
          headers_titles={['Ejercicios', 'Tiempo (mm:ss)', 'Promedio (%)']}
          resumen={true}
        />
      </div>
<<<<<<< HEAD
      <div className='student-profile-viewer-body-right'>
        <BadgeDisplayer actual={registers[0]?.exercise_id || userObject.total_exercises} />
=======
      <div className="student-profile-viewer-body-right">
        <BadgeDisplayer actual={registers[0]?.exercise_id || resumenData.resumen?.total_exercises} />
>>>>>>> c00bc8471477e46d705f38d76ed1aa3a08fb7920
      </div>

      <button onClick={() => { toggleView(true) }}>ESTADISTICAS</button>
    </div>
  )
}
