import TableManageCourse from '../tableManageCourse'
import FooterTeacherCoordinatorView from '../footerTeacherCoordinatorView'
import styles from '../../../styles/dashboardTableManage.module.css'
import { useContext } from 'react'
import CoordinatorContext from '../../../context/CoordinatorContext'

export default function DashboardTableManage ({ coordinator = true, userId }) {
  const { ctx_lG_mC } = useContext(CoordinatorContext)
  console.log(ctx_lG_mC.formData)
  const formData = ctx_lG_mC.formData.find((d) => d.level == ctx_lG_mC.selected)
  const conformedData = {
    title: formData.title,
    data: formData.lista.map(item => ({
      course_id: item.course_id,
      title: item.grade,
      teacher: item.teacher,
      teacher_id: item.teacher_id,
      students: item.students.map(std => ({
        id: std.id,
        username: std.username,
        name: `${std.first_name} ${std.last_name}`
      }))
    }))
  }

  return (
    <div className={styles['dashboard-table-manage']}>
      <TableManageCourse {...conformedData} coordinator={coordinator} userId={userId} />
      <FooterTeacherCoordinatorView downloadPDF={false} />
    </div>
  )
}
