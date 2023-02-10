import TableManageCourse from "../tableManageCourse"
import FooterTeacherCoordinatorView from "../footerTeacherCoordinatorView"
import styles from "../../../styles/dashboardTableManage.module.css"
import {useState, useEffect, useContext} from "react"
import CoordinatorContext from "../../../context/CoordinatorContext"

export default function DashboardTableManage ({coordinator=true}) {
    const {ctx_lG_mC} = useContext(CoordinatorContext)
    const formData = ctx_lG_mC.formData.find((d)=>d.level == ctx_lG_mC.selected)
    console.log(formData)
    const [conformedData, setConformedData] = useState({
                                                            title : formData.title,
                                                            data: formData.lista.map(item =>({
                                                                title: item.grade,
                                                                teacher: item.teacher,
                                                                teacher_id: item.teacher_id,
                                                                students: item.students.map(std => ({
                                                                    id: std.id,
                                                                    username: std.username,
                                                                    name: `${std.first_name} ${std.last_name}`
                                                                }))
                                                            })),
                                                        })


    console.log(ctx_lG_mC)
    return(
        <div className={styles['dashboard-table-manage']}>
            <TableManageCourse {...conformedData} coordinator={coordinator} />
            <FooterTeacherCoordinatorView downloadPDF={false} />
        </div>
    )
}
