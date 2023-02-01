import HeaderMain from '../headerMainTeacherCoordinator'
import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import '../../../styles/dashboardMain.css'

export default function DashboardMain () {
  return (
    <div className='DashboardMain'>
      <HeaderMain />
      <div className='DashboardMain__content'>
      </div>
      <FooterTeacherCoordinatorView />
    </div>
  )
}
