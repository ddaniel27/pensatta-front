import RowTwentyColors from '../rowTwentyColors'
import PieChart from './pieChart'
import leftArrow from '../../../../public/images/AuxButtons/left_Default.svg'
import '../../../styles/dashboardRows.css'

export default function DashboardRows ({ title = 'Grado', grade = '6 A', average = 5, data = defaultData }) {
  return (
    <div className='DashboardRows'>
      <div className='DashboardRows__header'>
        <div className='DashboardRows__header__group'>
          <img src={leftArrow} alt='left arrow' />
          <div className='DashboardRows__header__title'>{title}</div>
          <div className='DashboardRows__header__id'>{grade}</div>
        </div>
        <div className='DashboardRows__header__average'>Unidad promedio: {average}</div>
      </div>
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
