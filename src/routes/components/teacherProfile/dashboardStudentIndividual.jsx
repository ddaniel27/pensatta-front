import HeaderTeacherCoordinator from '../headerTeacherCoordinatorView'
import FooterTeacherCoordinator from '../footerTeacherCoordinatorView'
import RowTwentyColors from '../rowTwentyColors'
import PieChart from './pieChart'
import Spider from './spider'
import '../../../styles/dashboardStudentIndividual.css'

export default function DashboardStudentIndividual ({ title = 'Grado', grade = '6 A', current = 11 }) {
  return (
    <div className='DashboardStudentIndividual'>
      <HeaderTeacherCoordinator title={title} grade={grade} text={`Unidad actual: ${current}`} />
      <div className='RowsGrid'>
        <RowTwentyColors label='Juan' list={[0.6, 0.4, 0.4, 0.8, 0.7, 0.8, 0.7, 0.4]} />
      </div>
      <div className='DashboardStudentIndividual__graphs'>
        <Spider />
        <div className='DashboardStudentIndividual__graphs__group'>
          <MeanBarChart />
          <PieChart pieValues={{ 0: 12, 1: 15, 2: 20 }} />
        </div>
      </div>
      <FooterTeacherCoordinator />
    </div>
  )
}
