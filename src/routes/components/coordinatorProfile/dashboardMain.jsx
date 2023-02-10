import { useState, useEffect } from 'react'
import HeaderMain from '../headerMainTeacherCoordinator'
import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import CardHorizontalRow from '../CardHorizontalRow'
import PieChart from './pieChart'
import pencil from '/images/Atomo_Icono_Editar.svg'
import '../../../styles/dashboardMain.css'
import { MeanBarChart } from './meanBarChart'
import { coordinacionMetricsAll } from '../../../requests'

export default function DashboardMain ({ data = defaultData, coordinator=true, userId}) {

  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorInstitution, setCoordinatorInstitution] = useState('');
  const [metrics, setMetrics] = useState([]);
  const [metricsAverage, setMetricsAverage] = useState([])
  const [average, setAverage] = useState({});
  const [conformedData, setConformedData] = useState(data)
  const [pieValues, setPieValues] = useState({ 0: 12, 1: 15, 2: 20 })
  const [meanBarProps, setMeanBarProps] = useState({})

  useEffect(() => {
    coordinacionMetricsAll(userId, (response)=>{
      console.log(response)
      setCoordinatorName(response.coordinator)
      setCoordinatorInstitution(response.institution)
      setMetrics(response.metrics)
      setAverage(response.average)
      setMetricsAverage(response.metricsAverage)
    })
  },[])
  
  useEffect(()=>{
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
      title: title,
      average: average,
      rows: rows
    })

  },[metrics])

  useEffect(()=>{
    setPieValues(
      { 0: metricsAverage.apropiacionValues? metricsAverage.apropiacionValues['1']:0, 
        1: metricsAverage.apropiacionValues? metricsAverage.apropiacionValues['2']:0, 
        2: metricsAverage.apropiacionValues? metricsAverage.apropiacionValues['3']:0})

    setMeanBarProps({
      labs: ['dim1','dim2','dim3','dim4','dim5','dim6'],
      dataValues: {
        dim1: { obt: metricsAverage.spiderValues? metricsAverage.spiderValues['1']:0, med: average.spiderValues? average.spiderValues['1']:0 },
        dim2: { obt: metricsAverage.spiderValues? metricsAverage.spiderValues['2']:0, med: average.spiderValues? average.spiderValues['2']:0 },
        dim3: { obt: metricsAverage.spiderValues? metricsAverage.spiderValues['3']:0, med: average.spiderValues? average.spiderValues['3']:0 },
        dim4: { obt: metricsAverage.spiderValues? metricsAverage.spiderValues['4']:0, med: average.spiderValues? average.spiderValues['4']:0 },
        dim5: { obt: metricsAverage.spiderValues? metricsAverage.spiderValues['5']:0, med: average.spiderValues? average.spiderValues['5']:0 },
        dim6: { obt: metricsAverage.spiderValues? metricsAverage.spiderValues['6']:0, med: average.spiderValues? average.spiderValues['6']:0 }
      }
    })
  },[metricsAverage])



  return (
    <div className='DashboardMain'>
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
  )
}

const defaultData = {
  title: 'Grado',
  average: 5,
  rows: [
    {
      label: '6',
      valueGreen: 0.3,
      valueYellow: 0.2,
      valueRed: 0.5
    },
    {
      label: '7',
      valueGreen: 0.5,
      valueYellow: 0.3,
      valueRed: 0.2
    },
    {
      label: '8',
      valueGreen: 0.2,
      valueYellow: 0.5,
      valueRed: 0.3
    },
    {
      label: '9',
      valueGreen: 0.3,
      valueYellow: 0.2,
      valueRed: 0.5
    },
    {
      label: '10',
      valueGreen: 0.34,
      valueYellow: 0.33,
      valueRed: 0.33
    },
    {
      label: '11',
      valueGreen: 0.2,
      valueYellow: 0.2,
      valueRed: 0.6
    }
  ]
}
