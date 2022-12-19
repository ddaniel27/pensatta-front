import { useContext, useState, useEffect } from 'react'
import ActivityContext from '../../../context/ActivityContext'
import ProfileCard from "../../components/studentProfile/profileCard"
import ProgressBar from '../../components/studentProfile/progressBar'
import BadgeDisplayer from "../../components/studentProfile/badgeDisplayer"
import TableDisplayExercises from '../../components/studentProfile/tableDisplayExercises'
import '../../../styles/studentProfileResume.css'

export default function StudentProfileResume({ toggleView }) {

  const { exercises } = useContext(ActivityContext)

  const [ resumenData, setResumenData ] = useState([])
  const [ actualData, _setActualData ] = useState(Object.values(exercises).filter(exercises => exercises.score !==undefined).length)

  useEffect(()=>{
    const reduced = Object.values(exercises).filter(exercises => exercises.score !==undefined).reduce((acc, curr) => {
      acc.exercise_id += 1
      acc.time += curr.time
      acc.score += +curr.score
      return acc
    },{
      exercise_id: 0,
      time: 0,
      score: 0
    })

    const timeToSeconds = Math.round(reduced.time / 1000)
    const timeStr = `${Math.floor(timeToSeconds/60)}:${timeToSeconds%60 < 10 ? "0"+timeToSeconds%60 : timeToSeconds%60}`
    const objMaped = {
      exercise_id: reduced.exercise_id,
      time: timeStr,
      score: (reduced.score/ (reduced.exercise_id > 0 ? reduced.exercise_id : 1)).toFixed(2)
    }

    setResumenData([objMaped])
    
  },[])

  return(
    <div className="student-profile-viewer">
      <div className="student-profile-viewer-header-left">
      	<ProfileCard />
      </div>
      <div className="student-profile-viewer-header-right">
          <span>Última conexión: { new Date(Date.now()).toLocaleString() }</span>
          <span className="level-span">Nivel 1</span>
      </div>
      <div className="student-profile-viewer-body-left">
        <ProgressBar total={5} actual={actualData}/>
        <TableDisplayExercises
          registers={resumenData}
          headers_titles={['Ejercicios', 'Tiempo (mm:ss)', 'Promedio (%)']} 
          resumen={true} 
         />
      </div>
      <div className="student-profile-viewer-body-right">
      	<BadgeDisplayer total={5} actual={actualData} />
      </div>

      <button onClick={()=>{toggleView(true)}}>ESTADISTICAS</button>
    </div>	
  )
}
