import HeaderTeacherCoordinator from '../headerTeacherCoordinatorView'
import FooterTeacherCoordinator from '../footerTeacherCoordinatorView'
import HorizontalBar from '../horizontalBar'
import PieChart from './pieChart'
import { MeanBarChart } from './meanBarChart'
import '../../../styles/dashboardHorizontalBar.css'

export default function DashboardHorizontalBar ({ title = 'Grado', average = '5', data = defaultData }) {
  return (
    <div className='DashboardHorizontalBar'>
      <HeaderTeacherCoordinator title='' grade={title} text={`Unidad promedio: ${average}`} />
      <HorizontalBarGrid data={data} />
      <div className='DashboardRows__footer'>
        <MeanBarChart />
        <PieChart pieValues={{ 0: 12, 1: 15, 2: 20 }} />
      </div>
      <FooterTeacherCoordinator />
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
    valueGreen: 0.3,
    valueYellow: 0.2,
    valueRed: 0.5
  },
  {
    label: '6 B',
    valueGreen: 0.5,
    valueYellow: 0.2,
    valueRed: 0.3
  },
  {
    label: '6 C',
    valueGreen: 0.2,
    valueYellow: 0.5,
    valueRed: 0.3
  },
  {
    label: '6 D',
    valueGreen: 0.34,
    valueYellow: 0.33,
    valueRed: 0.33
  }
]
