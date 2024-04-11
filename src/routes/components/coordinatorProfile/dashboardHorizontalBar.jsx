import HeaderTeacherCoordinator from '../headerTeacherCoordinatorView'
import FooterTeacherCoordinator from '../footerTeacherCoordinatorView'
import HorizontalBar from '../horizontalBar'
import PieChart from './pieChart'
import Spider from './spider'
import '../../../styles/dashboardHorizontalBar.css'
import { useContext, useEffect, useState } from 'react'
import CoordinatorContext from '../../../context/CoordinatorContext'
import { coordinacionMetrics, profesorMetrics } from '../../../requests'
import Loading from '../loadingView'

export default function DashboardHorizontalBar ({ title = 'Grado', average = '5', data = defaultData, userId, coordinator = true }) {
  const { ctx_hB_r_sI } = useContext(CoordinatorContext)
  const [conformedData, setConformedData] = useState(data)
  const [pieValues, setPieValues] = useState({ 0: 12, 1: 15, 2: 20 })
  const [spiderProps, setSpiderProps] = useState({})
  const [spiderURL, setSpiderURL] = useState('')
  const [pieURL, setPieURL] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const cb = (response) => {
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

    setSpiderProps({
      spider: rows[0].spiderValues
    })
    setIsLoaded(true)
  }

  useEffect(() => {
    if (coordinator) {
      coordinacionMetrics(userId, ctx_hB_r_sI.level, cb)
    } else {
      profesorMetrics(userId, ctx_hB_r_sI.level, cb)
    }
  }, [])

  return (
    isLoaded
      ? <div className='DashboardHorizontalBar'>
        <HeaderTeacherCoordinator title='' grade={title} text={`Unidad promedio: ${average}`} />
        <HorizontalBarGrid data={conformedData} />
        <div className='DashboardRows__footer'>
          <Spider {...spiderProps} setImgURL={setSpiderURL} />
          <PieChart pieValues={pieValues} setImgURL={setPieURL} />
        </div>
        <FooterTeacherCoordinator coordinator={coordinator} data={conformedData} spiderURL={spiderURL} pieURL={pieURL} userId={userId} />
      </div>
      : <Loading />
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
