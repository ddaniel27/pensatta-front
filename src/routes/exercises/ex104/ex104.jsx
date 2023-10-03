import { useEffect, useState } from "react";
import useData from "../../../hooks/useData"
import ScoringComponent from "../components/scoringComponent";
import OrigamiComponent from "../components/origamiComponent";


const Ex104 = ()=>{
  const { data } = useData("ex104")
    const [myData, setMyData] = useState({ ...data })
    const [isLoaded, setIsLoaded] =useState(false)

  useEffect(() => {
    setMyData({ ...data })
  }, [data])
   
    const handleFinish = (setPhase)=>{
        setPhase("end")
    }
    
    return(
       
       <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <>
          <OrigamiComponent data={myData.column[Math.floor(Math.random() * 7)]} setPhase={setPhase} setScore={setScore}/>

          {
            isLoaded&& <div className="buttons-field">
            <button onClick={()=>{handleFinish(setPhase)}}>{myData["next-button"]}</button>
            </div>
          }
          </>

        )
      }
   </ScoringComponent>
           
       
    )
}
export default Ex104
