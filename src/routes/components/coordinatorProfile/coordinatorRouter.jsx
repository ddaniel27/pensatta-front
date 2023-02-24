import { useState, useContext } from 'react'
import DashboardCardsHorizontalRows from './dashboardCardsHorizontalRows'
import DashboardHorizontalBar from './dashboardHorizontalBar'
import DashboardListGrades from './dashboardListGrades'
import DashboardMain from './dashboardMain'
import DashboardRows from './dashboardRows'
import DashboardStudentIndividual from './dashboardStudentIndividual'
import DashboardTableManage from './dashboardTableManager'
import CoordinatorContext from '../../../context/CoordinatorContext'
import UserContext from '../../../context/UserContext'

export default function CoordinatorRouter () {
  const [phase, setPhase] = useState('main')
  const [ctx_lG_mC, setCtx_lG_mC] = useState([])
  const [ctx_main_hR, setCtx_main_hR] = useState([])
  const [ctx_hB_r_sI, setCtx_hB_r_sI] = useState([])
  const { loginUser } = useContext(UserContext)

  return (
    <CoordinatorContext.Provider value={{ phase, setPhase, ctx_lG_mC, setCtx_lG_mC, ctx_main_hR, setCtx_main_hR, ctx_hB_r_sI, setCtx_hB_r_sI }}>
      {phase == 'main' && <DashboardMain coordinator={true} userId={loginUser.id}/>}
      {phase == 'listGrades' && <DashboardListGrades coordinator={true} userId={loginUser.id}/>}
      {phase == 'manageCourse' && <DashboardTableManage coordinator={true} userId={loginUser.id} />}
      {phase == 'horizontalRows' && <DashboardCardsHorizontalRows coordinator={true} />}
      {phase == 'horizontalBar' && <DashboardHorizontalBar coordinator={true} userId={loginUser.id} />}
      {phase == 'rows' && <DashboardRows coordinator={true} userId={loginUser.id}/>}
      {phase == 'studentIndividual' && <DashboardStudentIndividual coordinator={true} />}
    </CoordinatorContext.Provider >
  )
}
