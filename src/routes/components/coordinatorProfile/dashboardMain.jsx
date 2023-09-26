import { useState, useEffect, useContext } from 'react'
import HeaderMain from '../headerMainTeacherCoordinator'
import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import CardHorizontalRow from '../CardHorizontalRow'
import PieChart from './pieChart'
import pencil from '/images/Atomo_Icono_Editar.svg'
import '../../../styles/dashboardMain.css'
import { MeanBarChart } from './meanBarChart'
import { coordinacionMetricsAll } from '../../../requests'
import CoordinatorContext from '../../../context/CoordinatorContext'
import Loading from '../loadingView'

export default function DashboardMain ({ data = defaultData, coordinator = true, userId }) {
  const { setCtx_main_hR } = useContext(CoordinatorContext)
  const [coordinatorName, setCoordinatorName] = useState('')
  const [coordinatorInstitution, setCoordinatorInstitution] = useState('')
  const [metrics, setMetrics] = useState([])
  const [metricsAverage, setMetricsAverage] = useState([])
  const [average, setAverage] = useState({})
  const [conformedData, setConformedData] = useState(data)
  const [pieValues, setPieValues] = useState({ 0: 12, 1: 15, 2: 20 })
  const [meanBarProps, setMeanBarProps] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    coordinacionMetricsAll(userId, (response) => {
      setCoordinatorName(response.coordinator)
      setCoordinatorInstitution(response.institution)
      setMetrics(response.metrics)
      setAverage(response.average)
      setMetricsAverage(response.metricsAverage)
      setCtx_main_hR(response.metricsByGroup)
      setIsLoaded(true)
    })
  }, [])

  useEffect(() => {
    const title = coordinator ? 'Progreso' : 'Grado'
    const average = 5
    const rows = metrics.map((metric) => {
      return {
        label: metric.nivel,
        valueGreen: metric.apropiacionValues[3],
        valueYellow: metric.apropiacionValues[2],
        valueRed: metric.apropiacionValues[1]
      }
    })

    setConformedData({
      title,
      average,
      rows
    })
  }, [metrics])

  useEffect(() => {
    setPieValues(
      {
        0: metricsAverage.apropiacionValues ? metricsAverage.apropiacionValues['1'] : 0,
        1: metricsAverage.apropiacionValues ? metricsAverage.apropiacionValues['2'] : 0,
        2: metricsAverage.apropiacionValues ? metricsAverage.apropiacionValues['3'] : 0
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
      dataValues[lab] = { obt: metricsAverage.spiderValues ? metricsAverage.spiderValues[index + 1] : 0, med: average.spiderValues ? average.spiderValues[index + 1] : 0 }
    })

    setMeanBarProps({
      labs,
      dataValues
    })
  }, [metricsAverage])

  return (
    isLoaded
      ? <div className='DashboardMain'>
        <HeaderMain title={coordinatorName} subtitle={coordinatorInstitution}/>
        <div className='DashboardMain__content'>
          <CardHorizontalRow {...conformedData} />
          <div className='DashboardMain__content__group'>
            <div className='DashboardMain__content__group__graphs'>
              <MeanBarChart {...meanBarProps}/>
              <PieChart pieValues={pieValues} />
            </div>
            <div className='DashboardMain__content__group__buttons'>
              <div className='DashboardMain__content__group__buttons__pdf'>DESCARGAR INFORME EN PDF</div>
              <div className='DashboardMain__content__group__buttons__teachers'>
                <span>Listado docentes</span>
                <img src={pencil} alt='pencil' />
              </div>
            </div>
          </div>
        </div>
        <FooterTeacherCoordinatorView />
      </div>
      : <Loading />
  )
}

const defaultData = {
  title: 'Grado',
  average: 5,
  rows: [
    {
      label: '6',
      valueGreen: 0,
      valueYellow: 0,
      valueRed: 0
    }
  ]
}
