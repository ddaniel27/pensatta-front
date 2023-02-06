import HeaderMain from '../headerMainTeacherCoordinator'
import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import CardHorizontalRow from '../CardHorizontalRow'
import PieChart from '../coordinatorProfile/pieChart'
import styles from '../../../styles/dashboardMainTeacher.module.css'
import { MeanBarChart } from '../coordinatorProfile/meanBarChart'

export default function DashboardMainTeacher ({ data = defaultData }) {
  return (
    <div className={styles['DashboardMainTeacher']}>
      <HeaderMain title='Profe Ramirez' subtitle='Institucion Educativa Education Soul'/>
      <div className={styles['DashboardMainTeacher__cards__container']}>
        {
            data.map(item => <GridElement data={item}/>)
        }      
      </div>
      <FooterTeacherCoordinatorView />
    </div>
  )
}
function GridElement ({data}){
    return(
        <div className={styles['DashboardMainTeacher__content']}>
            <CardHorizontalRow {...data} />
            <div className={styles['DashboardMainTeacher__content__group']}>
            <div className={styles['DashboardMainTeacher__content__group__graphs']}>
                <MeanBarChart />
                <PieChart pieValues={{ 0: 12, 1: 15, 2: 20 }} />
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