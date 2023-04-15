import HeaderMain from '../headerMainTeacherCoordinator'
import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import CardHorizontalRow from '../CardHorizontalRow'
import PieChart from '../coordinatorProfile/pieChart'
import styles from '../../../styles/dashboardMainTeacher.module.css'
import { MeanBarChart } from '../coordinatorProfile/meanBarChart'
import { useEffect, useState, useContext } from 'react'
import { profesorMetricsAll } from '../../../requests'
import CoordinatorContext from '../../../context/CoordinatorContext'

export default function DashboardMainTeacher ({ data = defaultData, userId, coordinator }) {
  const [conformedData, setConformedData] = useState(data)
  const [name, setName] = useState('Profesor de Pensatta')
  const [institution, setInstitution] = useState('Institución de Pensatta')
  const { setCtx_main_hR } = useContext(CoordinatorContext)

  const title = {
    6: 'Grado sexto',
    7: 'Grado séptimo',
    8: 'Grado octavo',
    9: 'Grado noveno',
    10: 'Grado décimo',
    11: 'Grado undécimo'
  }

  useEffect(() => {
    profesorMetricsAll(userId, (response) => {
      setName(response.name)
      setInstitution(response.institution)
      const metrics = response.metrics
      setCtx_main_hR(response.metrics)
      const average = response.average
      const lvls = new Set(metrics.map((curso) => {
        return curso.nivel
      }))
      const levels = [...lvls]
      const dataFormed = levels.map((level) => {
        const lst = metrics.filter((curso) => {
          return curso.nivel === level
        })
        const lista = lst.map((curso) => {
          return {
            label: `${curso.nivel} ${curso.curso}`,
            valueGreen: curso.apropiacionValues[3],
            valueYellow: curso.apropiacionValues[2],
            valueRed: curso.apropiacionValues[1]
          }
        })

        console.log('lst', lst)
        const aprops = [0, 1, 2]
        const dataAprops = {}
        aprops.forEach((aprop, index) => {
          dataAprops[aprop] = lst.reduce((acc, next) => acc + next.apropiacionValues[index + 1], 0) / lst.length
        })
        const labs = ['dim1', 'dim2', 'dim3', 'dim4', 'dim5', 'dim6']
        const dataValues = {}
        labs.forEach((lab, index) => {
          dataValues[lab] = {
            obt: lst.reduce((acc, next) => acc + (next.spiderValues[index + 1] ? next.spiderValues[index + 1] : 0), 0) / lst.length,
            med: average.spiderValues ? average.spiderValues[index + 1] : 0
          }
        })
        const meanBarProps = {
          labs,
          dataValues
        }

        return {
          title: title[level],
          rows: lista,
          average: response.average.averageAll,
          meanBarProps,
          pieChartProps: dataAprops
        }
      })
      setConformedData(dataFormed)
    }
    )
  }, [])
  return (
    <div className={styles.DashboardMainTeacher}>
      <HeaderMain title={name} subtitle={institution}/>
      <div className={styles.DashboardMainTeacher__cards__container}>
        {
          conformedData.map(item => <GridElement data={item} meanBarProps={item.meanBarProps} pieChartProps={item.pieChartProps}/>)
        }
      </div>
      <FooterTeacherCoordinatorView coordinator={coordinator}/>
    </div>
  )
}
function GridElement ({ data, meanBarProps, pieChartProps }) {
  console.log('mbp', meanBarProps)
  console.log('pcp', pieChartProps)
  return (
    <div className={styles.DashboardMainTeacher__content}>
      <CardHorizontalRow {...data} />
      <div className={styles.DashboardMainTeacher__content__group}>
        <div className={styles.DashboardMainTeacher__content__group__graphs}>
          <MeanBarChart {...meanBarProps}/>
          <PieChart pieValues={pieChartProps} />
        </div>
      </div>
    </div>
  )
}

const defaultData = [
  {
    title: 'Grado',
    average: 5,
    rows: [
      {
        label: '6A',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      },
      {
        label: '6B',
        valueGreen: 0.5,
        valueYellow: 0.3,
        valueRed: 0.2
      },
      {
        label: '6C',
        valueGreen: 0.2,
        valueYellow: 0.5,
        valueRed: 0.3
      },
      {
        label: '6D',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      }
    ]
  },
  {
    title: 'Grado',
    average: 5,
    rows: [
      {
        label: '7A',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      },
      {
        label: '7B',
        valueGreen: 0.5,
        valueYellow: 0.3,
        valueRed: 0.2
      },
      {
        label: '7C',
        valueGreen: 0.2,
        valueYellow: 0.5,
        valueRed: 0.3
      },
      {
        label: '7D',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      }
    ]
  },
  {
    title: 'Grado',
    average: 5,
    rows: [
      {
        label: '8A',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      },
      {
        label: '8B',
        valueGreen: 0.5,
        valueYellow: 0.3,
        valueRed: 0.2
      },
      {
        label: '8C',
        valueGreen: 0.2,
        valueYellow: 0.5,
        valueRed: 0.3
      },
      {
        label: '8D',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      }
    ]
  },
  {
    title: 'Grado',
    average: 5,
    rows: [
      {
        label: '9A',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      },
      {
        label: '9B',
        valueGreen: 0.5,
        valueYellow: 0.3,
        valueRed: 0.2
      },
      {
        label: '9C',
        valueGreen: 0.2,
        valueYellow: 0.5,
        valueRed: 0.3
      },
      {
        label: '9D',
        valueGreen: 0.3,
        valueYellow: 0.2,
        valueRed: 0.5
      }
    ]
  }
]
