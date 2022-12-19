import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ActivityContext from '../../../context/ActivityContext'
import Spider from "../../components/studentProfile/spider"
import PieChart from "../../components/studentProfile/pieChart"
import TableDisplayExercises from "../../components/studentProfile/tableDisplayExercises"
import ProfileCard from '../../components/studentProfile/profileCard'
import '../../../styles/studentProfileMetrics.css'

export default function StudentProfileMetrics({ toggleView }){

  const { exercises } = useContext(ActivityContext)
  const [ spiderURL, setSpiderURL ] = useState('')
  const [ pieURL, setPieURL ] = useState('')
  const [ spiderData, setSpiderData ] = useState({})
  const [ pieData, setPieData ] = useState({})
  const [ tableData, setTableData ] = useState([])
  
  const initSpider = () => {
    const obj = {}
    Object.entries(exercises).map(([key, value]) => {
      return {
        [key]: +value.dim * 10
      }
    }).forEach(element => {
      Object.assign(obj, element)
    })
    setSpiderData(obj)
  }

  const initPie = () => {
    const mapped = Object.values(exercises).reduce((acc, item) => {
      if(+item.score < 60.0) { acc['1'] += 1 }
      else if(+item.score < 80.0) { acc['2'] += 1 }
      else{ acc['3'] += 1 }
      return acc
    },{'3': 0, '1': 0, '2': 0})

    setPieData(mapped)
    
  }

  const initTable = () => {
    const filteredData = Object.values(exercises).filter(exercise => exercise.score !== undefined).map(exercise => {

      const timeToSeconds = Math.round(exercise.time / 1000)
      const timeStr = `${Math.floor(timeToSeconds/60)}:${timeToSeconds%60 < 10 ? "0"+timeToSeconds%60 : timeToSeconds%60}`

      return {
        exercise_id: exercise.exercise,
        time: timeStr,
        score: +exercise.score
      }

    })

    setTableData(filteredData)
  }

  useEffect(()=>{
    initSpider()
    initPie()
    initTable()
  },[])


  return(
    <div className="student-profile-metrics">
      <div className="student-profile-metrics-header">
        <ProfileCard institution_code={'Estadísticas'} />
      </div>
      <div className="student-profile-metrics-body" >
        <div className='student-profile-metrics-body-chart'>
          <span>Dimensiones</span>
          <Spider spider={spiderData} setImgURL={setSpiderURL} />
        </div>
        <div className='student-profile-metrics-body-chart pie-chart-container'>
          <span>Apropiación</span>
          <PieChart pieValues={pieData} setImgURL={setPieURL}/>
        </div>
        <div className='student-profile-metrics-body-chart table-container'>
          <span>Historial</span>
          <TableDisplayExercises registers={tableData} />
        </div>
        <button onClick={()=>{toggleView(false)}}>RESUMEN</button>
      </div>
      <div className='student-pdf-button'>
      <Link 
        to={`/resumen/demo`}
        state={{
          loginUser:{
            name: 'Cuenta Demo',
          },
          dummyHistory: tableData,
          spiderImg: spiderURL,
          pieImg: pieURL,
          badges: Number(((tableData.length / 5) * 100).toFixed(2))
        }}
      >
          DESCARGAR PDF
      </Link>
      </div>
    </div>
  )
}
