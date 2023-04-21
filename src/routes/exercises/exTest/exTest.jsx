// import HorizontalBar from '../../components/horizontalBar'
// import GradeInfoCard from '../../components/gradeInfoCard'

// import DashboardStudentIndividual from '../../components/coordinatorProfile/dashboardMain'
// import DashboardStudentIndividual from '../../components/coordinatorProfile/dashboardListGrades'
// import DashboardStudentIndividual from '../../components/tableManageCourse'
// import DashboardStudentIndividual from '../../components/coordinatorProfile/dashboardCardsHorizontalRows'
// import DashboardStudentIndividual from '../../components/coordinatorProfile/dashboardHorizontalBar'
// import DashboardStudentIndividual from '../../components/coordinatorProfile/dashboardRows'
// import DashboardStudentIndividual from '../../components/coordinatorProfile/dashboardStudentIndividual'
// import data from './data.json'
// Teacher
// import DashboardStudentIndividual from '../../components/teacherProfile/dashboardMain'
import WindowsExplorer from '../components/windowsExplorer'
export default function ExTest () {
  const content = [{
    name: 'Costos de producción',
    type: 'Archivo Excel',
    size: '24 KB',
    date: '5-Oct-2022 12:00 p.m.',
    image: 'excel.svg'
  }]

  return (
    <>
      <WindowsExplorer content={content} />
    </>
  )
}
