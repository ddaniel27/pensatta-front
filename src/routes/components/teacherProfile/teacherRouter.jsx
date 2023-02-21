import {useState, useContext} from 'react';
import DashboardMain from './dashboardMain';
import UserContext from '../../../context/UserContext';
import DashboardListGrades from '../coordinatorProfile/dashboardListGrades';
import DashboardTableManage from '../coordinatorProfile/dashboardTableManager';
import DashboardCardsHorizontalRows from '../coordinatorProfile/dashboardCardsHorizontalRows';
import DashboardHorizontalBar from '../coordinatorProfile/dashboardHorizontalBar';
import DashboardRows from '../coordinatorProfile/dashboardRows';
import DashboardStudentIndividual from '../coordinatorProfile/dashboardStudentIndividual';
import CoordinatorContext from '../../../context/CoordinatorContext';

export default function TeacherRouter() {
    const [phase, setPhase] = useState("main")
    const [ctx_lG_mC, setCtx_lG_mC] = useState([])
    const [ctx_main_hR, setCtx_main_hR] = useState([])
    const [ctx_hB_r_sI, setCtx_hB_r_sI] = useState([])
    const {loginUser} = useContext(UserContext)
    

    return (
        <CoordinatorContext.Provider value={{phase, setPhase, ctx_lG_mC, setCtx_lG_mC, ctx_main_hR, setCtx_main_hR, ctx_hB_r_sI, setCtx_hB_r_sI}}>
            {phase == "main" && <DashboardMain coordinator={false} userId={loginUser.id}/>}
            {phase == "listGrades" && <DashboardListGrades coordinator={false} userId={loginUser.id}/>}
            {phase == "manageCourse" && <DashboardTableManage coordinator={false} />}
            {phase == "horizontalRows" && <DashboardCardsHorizontalRows coordinator={false}  />}
            {phase == "horizontalBar" && <DashboardHorizontalBar coordinator={false}  userId={loginUser.id} />}
            {phase == "rows" && <DashboardRows coordinator={false} userId={loginUser.id}/>}
            {phase == "studentIndividual" && <DashboardStudentIndividual coordinator={false} />}              
        </CoordinatorContext.Provider >
    )
}