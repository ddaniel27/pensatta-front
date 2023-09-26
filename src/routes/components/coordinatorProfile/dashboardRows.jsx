import HeaderTeacherCoordinator from '../headerTeacherCoordinatorView'
import FooterTeacherCoordinator from '../footerTeacherCoordinatorView'
import RowTwentyColors from '../rowTwentyColors'
import PieChart from './pieChart'
import '../../../styles/dashboardRows.css'
import { MeanBarChart } from './meanBarChart'
import { useContext, useEffect, useState } from 'react'
import CoordinatorContext from '../../../context/CoordinatorContext'
import { coordinacionMetricsStudents, profesorMetricsStudents } from '../../../requests'
import Loading from '../loadingView'

export default function DashboardRows ({ title = 'Grado', grade = '6 A', average = 5, data = defaultData, userId, coordinator = true }) {
  const { ctx_hB_r_sI, setCtx_hB_r_sI } = useContext(CoordinatorContext)
  const [conformedData, setConformedData] = useState(data)
  const [pieValues, setPieValues] = useState({ 0: 12, 1: 15, 2: 20 })
  const [meanBarProps, setMeanBarProps] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  const cb = (response) => {
    const students = response.infoUsuario
    const average = response.average
    const formedData = students.map((student) => {
      return {
        name: `${student.first_name} ${student.last_name}`,
        list: student.exercisesScore,
        id: student.id,
        stdAprops: student.allExercisesAprops,
        stdSpider: student.allExercisesSpider,
        lastHistory: student.lastHistory
      }
    })
    setConformedData(formedData)
    setCtx_hB_r_sI(prev => ({ ...prev, r: formedData, average }))
    const aprops = [0, 1, 2]
    const dataAprops = {}
    aprops.forEach((aprop, index) => {
      dataAprops[aprop] = students.reduce((acc, next) => acc + next.allExercisesAprops[index + 1], 0) / students.length
    })
    setPieValues(dataAprops)
    const labs = [
      'abst',
      'p. algo',
      'desc',
      'rec pat',
      'mod & sim',
      'eval'
    ]

    const dataValues = {}
    labs.forEach((lab, index) => {
      dataValues[lab] = {
        obt: students.reduce((acc, next) => acc + (next.allExercisesSpider[index + 1] ? next.allExercisesSpider[index + 1] : 0), 0) / students.length,
        med: average.spiderValues ? average.spiderValues[index + 1] : 0
      }
    })

    setMeanBarProps({
      labs,
      dataValues
    })
    setIsLoaded(true)
  }
  useEffect(() => {
    if (coordinator) {
      coordinacionMetricsStudents(userId, ctx_hB_r_sI.gradoId, cb)
    } else {
      profesorMetricsStudents(userId, ctx_hB_r_sI.gradoId, cb)
    }
  }, [])
  return (
    isLoaded
      ? <div className='DashboardRows'>
        <HeaderTeacherCoordinator title={title} grade={ctx_hB_r_sI?.label} text={`Unidad promedio: ${average}`} />
        <RowsGrid students={conformedData} />
        <div className='DashboardRows__footer'>
          <MeanBarChart {...meanBarProps} />
          <PieChart pieValues={pieValues} />
        </div>
        <FooterTeacherCoordinator coordinator={coordinator} />
      </div>
      : <Loading/>
  )
}

function RowsGrid ({ students = [] }) {
  return (
    <div className='RowsGrid'>
      {students.map((student, index) => (
        <RowTwentyColors label={student.name} list={student.lastHistory} id={student.id} key={index} />
      ))}
    </div>
  )
}

const defaultData = [
  {
    name: 'Dummy',
    lastHistory: [{ id: 1, score: 0 }]
  }
]
