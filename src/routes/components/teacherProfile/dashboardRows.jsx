import RowTwentyColors from '../rowTwentyColors'
import PieChart from './pieChart'
import '../../../styles/dashboardRows.css'

export default function DashboardRows () {
  return (
    <div className='DashboardRows'>
      <div className='DashboardRows__header' />
      <RowsGrid students={data} />
      <div className='DashboardRows__footer'>
        <PieChart pieValues={{ 0: 12, 1: 15, 2: 20 }} />
        <PieChart pieValues={{ 0: 12, 1: 15, 2: 20 }} />
      </div>
      <div className='DashboardRows__buttons'>
        <div className='DashboardRows__buttons__informe'>DESCARGAR INFORME DEL CURSO</div>
        <div className='DashboardRows__buttons__group'>
          <div className='DashboardRows__buttons__listado'>LISTADOS</div>
          <div className='DashboardRows__buttons__progreso'>PROGRESO</div>
          <div className='DashboardRows__buttons__perfil'>PERFIL</div>
        </div>
      </div>
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

const data = [
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
