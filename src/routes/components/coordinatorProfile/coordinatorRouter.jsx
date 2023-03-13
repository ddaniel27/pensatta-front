import { useState, useContext, useEffect } from 'react'
import DashboardCardsHorizontalRows from './dashboardCardsHorizontalRows'
import DashboardHorizontalBar from './dashboardHorizontalBar'
import DashboardListGrades from './dashboardListGrades'
import DashboardMain from './dashboardMain'
import DashboardRows from './dashboardRows'
import DashboardStudentIndividual from './dashboardStudentIndividual'
import DashboardTableManage from './dashboardTableManager'
import CoordinatorContext from '../../../context/CoordinatorContext'
import UserContext from '../../../context/UserContext'
import StudentProfileResume from '../studentProfile/studentProfileResumen'
import StudentProfileMetrics from '../studentProfile/studentProfileMetrics'

export default function CoordinatorRouter () {
  const [toggleView, setToggleView] = useState(false)
  const [phase, setPhase] = useState('main')
  const [ctx_lG_mC, setCtx_lG_mC] = useState([])
  const [ctx_main_hR, setCtx_main_hR] = useState([])
  const [ctx_hB_r_sI, setCtx_hB_r_sI] = useState([])
  const { loginUser } = useContext(UserContext)

  useEffect(() => {
    console.log('ctx_hB_r_sI', ctx_hB_r_sI)
  }, [ctx_hB_r_sI])

  return (
    <CoordinatorContext.Provider value={{ phase, setPhase, ctx_lG_mC, setCtx_lG_mC, ctx_main_hR, setCtx_main_hR, ctx_hB_r_sI, setCtx_hB_r_sI }}>
      {phase == 'main' && <DashboardMain coordinator={true} userId={loginUser.id}/>}
      {phase == 'listGrades' && <DashboardListGrades coordinator={true} userId={loginUser.id}/>}
      {phase == 'manageCourse' && <DashboardTableManage coordinator={true} userId={loginUser.id} />}
      {phase == 'horizontalRows' && <DashboardCardsHorizontalRows coordinator={true} />}
      {phase == 'horizontalBar' && <DashboardHorizontalBar coordinator={true} userId={loginUser.id} />}
      {phase == 'rows' && <DashboardRows coordinator={true} userId={loginUser.id}/>}
      {phase == 'studentIndividual' && <DashboardStudentIndividual coordinator={true} />}
      {phase == 'studentView' && toggleView && <StudentProfileMetrics toggleView={setToggleView} userObject={{ id: ctx_hB_r_sI.studentSelected, username: ctx_hB_r_sI.studentSelectedUser }} coordinator={ true }/>}
      {phase == 'studentView' && !toggleView && <StudentProfileResume toggleView={setToggleView} userObject={{ id: ctx_hB_r_sI.studentSelected, username: ctx_hB_r_sI.studentSelectedUser }} coordinator={ true}/>}
    </CoordinatorContext.Provider >
  )
}
