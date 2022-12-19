import { useState, useContext, useEffect } from 'react'
import ProfileCard from "./profileCard"
import ProgressBar from './progressBar'
import BadgeDisplayer from "./badgeDisplayer"
import TableDisplayExercises from './tableDisplayExercises'
import UserContext from '../../../context/UserContext'
import { getResumen } from '../../../requests'
import '../../../styles/studentProfileResume.css'

export default function StudentProfileResume({ toggleView }) {
  const [ resumenData, setResumenData ] = useState({})
  const [ registers, setRegisters ] = useState([])
  const { loginUser } = useContext(UserContext)


  const callHistoryEndpoint = async (user) => {
    getResumen(user, setResumenData)
  }

  useEffect(() => {
    callHistoryEndpoint(loginUser.id)
  }, [])

  useEffect(() => {
    if(resumenData.resumen) {
      const timeToSeconds = Math.round(resumenData.resumen.average_time / 1000)
      const timeStr = `${Math.floor(timeToSeconds/60)}:${timeToSeconds%60 < 10 ? "0"+timeToSeconds%60 : timeToSeconds%60}`
      const objeMaped = {
        exercise_id: resumenData.resumen.total_exercises,
        time: timeStr,
        score: resumenData.resumen.average_score
      }
      setRegisters([objeMaped])
    }
  }, [resumenData])


  return(
    <div className="student-profile-viewer">
      <div className="student-profile-viewer-header-left">
      	<ProfileCard {...loginUser} institution_code={resumenData.institution_name} />
      </div>
      <div className="student-profile-viewer-header-right">
          <span>Última conexión: { new Date(loginUser.last_login).toLocaleString() }</span>
          <span className="level-span">Nivel { Math.ceil(loginUser.total_exercises/4) }</span>
      </div>
      <div className="student-profile-viewer-body-left">
        <ProgressBar actual={registers[0]?.exercise_id || loginUser.total_exercises} />
        <TableDisplayExercises 
          registers={registers} 
          headers_titles={['Ejercicios', 'Tiempo (mm:ss)', 'Promedio (%)']} 
          resumen={true} 
        />
      </div>
      <div className="student-profile-viewer-body-right">
      	<BadgeDisplayer actual={registers[0]?.exercise_id || loginUser.total_exercises} />
      </div>

      <button onClick={()=>{toggleView(true)}}>ESTADISTICAS</button>
    </div>	
  )
}
