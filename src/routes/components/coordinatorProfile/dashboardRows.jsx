import HeaderTeacherCoordinator from '../headerTeacherCoordinatorView'
import FooterTeacherCoordinator from '../footerTeacherCoordinatorView'
import RowTwentyColors from '../rowTwentyColors'
import PieChart from './pieChart'
import '../../../styles/dashboardRows.css'
import { MeanBarChart } from './meanBarChart'
import { useContext, useEffect, useState } from 'react'
import CoordinatorContext from '../../../context/CoordinatorContext'
import { coordinacionMetricsStudents, profesorMetricsStudents } from '../../../requests'

export default function DashboardRows ({ title = 'Grado', grade = '6 A', average = 5, data = defaultData, userId, coordinator = true }) {
  const { ctx_hB_r_sI, setCtx_hB_r_sI } = useContext(CoordinatorContext)
  const [conformedData, setConformedData] = useState(data)
  const [pieValues, setPieValues] = useState({ 0: 12, 1: 15, 2: 20 })
  const [meanBarProps, setMeanBarProps] = useState({})
  const cb = (response) => {
    console.log('rows res', response)
    const students = response.infoUsuario
    const average = response.average
    const formedData = students.map((student) => {
      return {
        name: `${student.first_name} ${student.last_name}`,
        list: student.exercisesScore,
        id: student.id,
        stdAprops: student.allExercisesAprops,
        stdSpider: student.allExercisesSpider
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
    const labs = ['dim1', 'dim2', 'dim3', 'dim4', 'dim5', 'dim6']
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
  }
  useEffect(() => {
    if (coordinator) {
      coordinacionMetricsStudents(userId, ctx_hB_r_sI.gradoId, cb)
    } else {
      profesorMetricsStudents(userId, ctx_hB_r_sI.gradoId, cb)
    }
  }, [])
  return (
    <div className='DashboardRows'>
      <HeaderTeacherCoordinator title={title} grade={grade} text={`Unidad promedio: ${average}`} />
      <RowsGrid students={conformedData} />
      <div className='DashboardRows__footer'>
        <MeanBarChart {...meanBarProps} />
        <PieChart pieValues={pieValues} />
      </div>
      <FooterTeacherCoordinator coordinator={coordinator} />
    </div>
  )
}

function RowsGrid ({ students = [] }) {
  return (
    <div className='RowsGrid'>
      {students.map((student, index) => (
        <RowTwentyColors label={student.name} list={student.list} id={student.id} key={index} />
      ))}
    </div>
  )
}

const defaultData = [
  {
    name: 'Juan',
    list: [0.1, 0.6, 0.83, 0.4, 0.9, 0.9, 0.8]
  },
  {
    name: 'Carlos',
    list: [0.6, 0.4, 0.4, 0.8, 0.7, 0.8, 0.7, 0.4]
  },
  {
    name: 'Kevin',
    list: [0.1, 0.6, 0.83, 0.6, 0.9, 0.1]
  },
  {
    name: 'Manuel',
    list: [0.1, 0.6, 0.83, 0.4, 0.9, 0.9, 0.8]
  },
  {
    name: 'Jorge',
    list: [0.6, 0.4, 0.4, 0.8, 0.7, 0.8, 0.7, 0.4]
  },
  {
    name: 'Alex',
    list: [0.1, 0.6, 0.83, 0.6, 0.9, 0.1]
  },
  {
    name: 'Daniel',
    list: [0.1, 0.6, 0.83, 0.4, 0.9, 0.9, 0.8]
  },
  {
    name: 'Luis',
    list: [0.6, 0.4, 0.4, 0.8, 0.7, 0.8, 0.7, 0.4]
  },
  {
    name: 'Pedro',
    list: [0.1, 0.6, 0.83, 0.6, 0.9, 0.1]
  },
  {
    name: 'Jose',
    list: [0.1, 0.6, 0.83, 0.4, 0.9, 0.9, 0.8]
  },
  {
    name: 'Raul',
    list: [0.6, 0.4, 0.4, 0.8, 0.7, 0.8, 0.7, 0.4]
  }
]
