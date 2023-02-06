import HeaderTeacherCoordinator from '../headerTeacherCoordinatorView'
import FooterTeacherCoordinator from '../footerTeacherCoordinatorView'
import RowTwentyColors from '../rowTwentyColors'
import PieChart from './pieChart'
import '../../../styles/dashboardRows.css'
import { MeanBarChart } from './meanBarChart'

export default function DashboardRows ({ title = 'Grado', grade = '6 A', average = 5, data = defaultData }) {
  return (
    <div className='DashboardRows'>
      <HeaderTeacherCoordinator title={title} grade={grade} text={`Unidad promedio: ${average}`} />
      <RowsGrid students={data} />
      <div className='DashboardRows__footer'>
        <MeanBarChart />
        <PieChart pieValues={{ 0: 12, 1: 15, 2: 20 }} />
      </div>
      <FooterTeacherCoordinator />
    </div>
  )
}

function RowsGrid ({ students = [] }) {
  return (
    <div className='RowsGrid'>
      {students.map((student, index) => (
        <RowTwentyColors label={student.name} list={student.list} key={index} />
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
