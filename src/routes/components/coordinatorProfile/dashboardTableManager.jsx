import TableManageCourse from "../tableManageCourse"
import FooterTeacherCoordinatorView from "../footerTeacherCoordinatorView"
import styles from "../../../styles/dashboardTableManage.module.css"

export default function DashboardTableManage ({coordinator=true}) {
    return(
        <div className={styles['dashboard-table-manage']}>
            <TableManageCourse coordinator={coordinator} />
            <FooterTeacherCoordinatorView downloadPDF={false} />
        </div>
    )
}
