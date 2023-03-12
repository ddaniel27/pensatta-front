<<<<<<< HEAD
import { useState, useEffect } from 'react'
=======
import { useState, useEffect, useContext } from 'react'
>>>>>>> c00bc8471477e46d705f38d76ed1aa3a08fb7920
import { Link } from 'react-router-dom'
import Spider from './spider'
import PieChart from './pieChart'
import TableDisplayExercises from './tableDisplayExercises'
import ProfileCard from './profileCard'
import { getMetrics, getStudentsHistory } from '../../../requests'
import '../../../styles/studentProfileMetrics.css'

<<<<<<< HEAD
export default function StudentProfileMetrics ({ toggleView, userObject }) {
=======
export default function StudentProfileMetrics ({ toggleView }) {
>>>>>>> c00bc8471477e46d705f38d76ed1aa3a08fb7920
  const [dummyHistory, setDummyHistory] = useState([])
  const [spiderURL, setSpiderURL] = useState('')
  const [pieURL, setPieURL] = useState('')
  const [metrics, setMetrics] = useState({})
<<<<<<< HEAD
=======
  const { loginUser } = useContext(UserContext)
>>>>>>> c00bc8471477e46d705f38d76ed1aa3a08fb7920

  const callMetricsEndpoint = async (user) => {
    getMetrics(user, setMetrics)
  }
  const callHistoryEndpoint = async (user) => {
    getStudentsHistory(user, setDummyHistory)
  }

  useEffect(() => {
    callHistoryEndpoint(userObject.id)
    callMetricsEndpoint(userObject.id)
  }, [])

  return (
<<<<<<< HEAD
    <div className='student-profile-metrics'>
      <div className='student-profile-metrics-header'>
        <ProfileCard {...userObject} institution_code='Estadísticas' />
=======
    <div className="student-profile-metrics">
      <div className="student-profile-metrics-header">
        <ProfileCard {...loginUser} institution_code={'Estadísticas'} />
>>>>>>> c00bc8471477e46d705f38d76ed1aa3a08fb7920
      </div>
      <div className='student-profile-metrics-body'>
        <div className='student-profile-metrics-body-chart'>
          <span>Dimensiones</span>
          <Spider spider={metrics.spiderValues} setImgURL={setSpiderURL} />
        </div>
        <div className='student-profile-metrics-body-chart pie-chart-container'>
          <span>Apropiación</span>
          <PieChart pieValues={metrics.apropiacionValues} setImgURL={setPieURL} />
        </div>
        <div className='student-profile-metrics-body-chart table-container'>
          <span>Historial</span>
          <TableDisplayExercises registers={dummyHistory} />
        </div>
        <button onClick={() => { toggleView(false) }}>RESUMEN</button>
      </div>
      <div className='student-pdf-button'>
        <Link
<<<<<<< HEAD
          to={`/resumen/${userObject.id}`}
          state={{
            userObject,
=======
          to={`/resumen/${loginUser.id}`}
          state={{
            loginUser,
>>>>>>> c00bc8471477e46d705f38d76ed1aa3a08fb7920
            dummyHistory,
            spiderImg: spiderURL,
            pieImg: pieURL,
            badges: Number(((dummyHistory.length / 30) * 100).toFixed(2))
          }}
        >
          DESCARGAR PDF
        </Link>
      </div>
    </div>
  )
}
