import HeaderMain from '../headerMainTeacherCoordinator'
import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import CardHorizontalRow from '../CardHorizontalRow'
import PieChart from './pieChart'
import pencil from '/images/Atomo_Icono_Editar.svg'
import '../../../styles/dashboardMain.css'
import { MeanBarChart } from './meanBarChart'

export default function DashboardMain ({ data = defaultData }) {
  return (
    <div className='DashboardMain'>
      <HeaderMain />
      <div className='DashboardMain__content'>
        <CardHorizontalRow {...data} />
        <div className='DashboardMain__content__group'>
          <div className='DashboardMain__content__group__graphs'>
            <MeanBarChart />
            <PieChart pieValues={{ 0: 12, 1: 15, 2: 20 }} />
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
