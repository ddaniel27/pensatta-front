import HeaderTeacherCoordinator from '../headerTeacherCoordinatorView'
import FooterTeacherCoordinator from '../footerTeacherCoordinatorView'
import RowTwentyColors from '../rowTwentyColors'
import PieChart from './pieChart'
import Spider from './spider'
import '../../../styles/dashboardStudentIndividual.css'
import { MeanBarChart } from './meanBarChart'
import { useContext, useEffect, useState } from 'react'
import CoordinatorContext from '../../../context/CoordinatorContext'

export default function DashboardStudentIndividual ({ title = 'Grado', grade = '6 A', current = 11, coordinator = true }) {
  const { ctx_hB_r_sI } = useContext(CoordinatorContext)
  const [conformedData, setConformedData] = useState({ label: '', list: [{ id: 0, score: 0 }] })
  const [pieValues, setPieValues] = useState({ 0: 12, 1: 15, 2: 20 })
  const [spiderProps, setSpiderProps] = useState({})
  const [meanBarProps, setMeanBarProps] = useState({
    labs: [],
    dataValues: {}
  })

  useEffect(() => {
    const idStudent = ctx_hB_r_sI.studentSelected
    const student = ctx_hB_r_sI.r.find((student) => student.id === idStudent)

    setConformedData({ label: student.name, list: student.lastHistory })
    setPieValues({
      0: student.stdAprops[1],
      1: student.stdAprops[2],
      2: student.stdAprops[3]
    })
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
        obt: student.stdSpider[index + 1] || 0,
        med: ctx_hB_r_sI.average.spiderValues[index + 1]
      }
    })
    setMeanBarProps({
      labs,
      dataValues
    })
    setSpiderProps({
      spider: student.stdSpider
    })
  }, [])

  return (
    <div className='DashboardStudentIndividual'>
      <HeaderTeacherCoordinator title={title} grade={ctx_hB_r_sI?.label} text={`Unidad actual: ${current}`} />
      <div className='RowsGrid'>
        <RowTwentyColors {...conformedData} />
      </div>
      <div className='DashboardStudentIndividual__graphs'>
        <Spider {...spiderProps} />
        <div className='DashboardStudentIndividual__graphs__group'>
          <MeanBarChart {...meanBarProps} />
          <PieChart pieValues={pieValues} />
        </div>
      </div>
      <FooterTeacherCoordinator coordinator={coordinator} />
    </div>
  )
}
