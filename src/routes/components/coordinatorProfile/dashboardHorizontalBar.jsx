import HeaderTeacherCoordinator from '../headerTeacherCoordinatorView'
import FooterTeacherCoordinator from '../footerTeacherCoordinatorView'
import HorizontalBar from '../horizontalBar'
import PieChart from './pieChart'
import { MeanBarChart } from './meanBarChart'
import '../../../styles/dashboardHorizontalBar.css'
import { useContext, useEffect, useState } from 'react'
import CoordinatorContext from '../../../context/CoordinatorContext'
import { coordinacionMetrics, profesorMetrics } from '../../../requests'

export default function DashboardHorizontalBar ({ title = 'Grado', average = '5', data = defaultData, userId, coordinator = true }) {
  const { ctx_hB_r_sI } = useContext(CoordinatorContext)
  const [conformedData, setConformedData] = useState(data)
  const [pieValues, setPieValues] = useState({ 0: 12, 1: 15, 2: 20 })
  const [meanBarProps, setMeanBarProps] = useState({})

  const cb = (response) => {
    const average = response.average
    const rows = response.result.map(
      (curso) => {
        return {
          label: `${curso.nivelGrado} ${curso.cursoGrado}`,
          valueGreen: curso.apropsGrado[3] ? curso.apropsGrado[3] : 0,
          valueYellow: curso.apropsGrado[2] ? curso.apropsGrado[2] : 0,
          valueRed: curso.apropsGrado[1] ? curso.apropsGrado[1] : 0,
          spiderValues: curso.spiderGrado,
          gradoId: curso.idGrado
        }
      }
    )

    setConformedData(rows)
    setPieValues({
      0: rows.reduce((acc, next) => acc + (next.valueRed ? next.valueRed : 0), 0) / rows.length,
      1: rows.reduce((acc, next) => acc + (next.valueYellow ? next.valueYellow : 0), 0) / rows.length,
      2: rows.reduce((acc, next) => acc + (next.valueGreen ? next.valueGreen : 0), 0) / rows.length
    })

    const labs = ['dim1', 'dim2', 'dim3', 'dim4', 'dim5', 'dim6']
    const dataValues = {}
    labs.forEach((lab, index) => {
      dataValues[lab] = {
        obt: rows.reduce((acc, next) => acc + (next.spiderValues[index + 1] ? next.spiderValues[index + 1] : 0), 0) / rows.length,
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
      coordinacionMetrics(userId, ctx_hB_r_sI.level, cb)
    } else {
      profesorMetrics(userId, ctx_hB_r_sI.level, cb)
    }
  }, [])

  return (
    <div className='DashboardHorizontalBar'>
      <HeaderTeacherCoordinator title='' grade={title} text={`Unidad promedio: ${average}`} />
      <HorizontalBarGrid data={conformedData} />
      <div className='DashboardRows__footer'>
        <MeanBarChart {...meanBarProps} />
        <PieChart pieValues={pieValues} />
      </div>
      <FooterTeacherCoordinator coordinator={coordinator}/>
    </div>
  )
}

function HorizontalBarGrid ({ data }) {
  return (
    <div className='HorizontalBarGrid'>
      {data.map((item, index) => (
        <HorizontalBar key={index} {...item} />
      ))}
    </div>
  )
}

const defaultData = [
  {
    label: '6 A',
    valueGreen: 0,
    valueYellow: 0,
    valueRed: 0
  },
  {
    label: '6 B',
    valueGreen: 0,
    valueYellow: 0,
    valueRed: 0
  },
  {
    label: '6 C',
    valueGreen: 0,
    valueYellow: 0,
    valueRed: 0
  },
  {
    label: '6 D',
    valueGreen: 0,
    valueYellow: 0,
    valueRed: 0
  }
]
