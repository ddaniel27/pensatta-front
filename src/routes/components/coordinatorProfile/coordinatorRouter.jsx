import { useState, useContext} from "react";
import DashboardCardsHorizontalRows from "./dashboardCardsHorizontalRows";
import DashboardHorizontalBar from "./dashboardHorizontalBar";
import DashboardListGrades from "./dashboardListGrades";
import DashboardMain from "./dashboardMain";
import DashboardRows from "./dashboardRows";
import DashboardStudentIndividual from "./dashboardStudentIndividual";
import DashboardTableManage from "./dashboardTableManager";
import CoordinatorContext from "../../../context/CoordinatorContext";
import UserContext from "../../../context/UserContext"



export default function CoordinatorRouter () {
    const [phase, setPhase] = useState("main")
    const {loginUser} = useContext(UserContext)
    console.log(loginUser)
    

    return (
        <CoordinatorContext.Provider value={{setPhase,phase}}>
            {phase == "main" && <DashboardMain coordinator={true} userId={loginUser.id}/>}
            {phase == "listGrades" && <DashboardListGrades coordinator={true} />}
            {phase == "manageCourse" && <DashboardTableManage coordinator={true} />}
            {phase == "horizontalRows" && <DashboardCardsHorizontalRows coordinator={true} />}
            {phase == "horizontalBar" && <DashboardHorizontalBar coordinator={true}  />}
            {phase == "rows" && <DashboardRows coordinator={true} />}
            {phase == "studentIndividual" && <DashboardStudentIndividual coordinator={true} />}              
        </CoordinatorContext.Provider >
    )
}
