import React, {useEffect,useState} from "react";
import data from "./data.json"
import NoScoringComponent from "../components/noScoringComponent";
import ScoringComponent from "../components/scoringComponent";
import OrigamiComponent from "../components/origamiComponent";


const Ex104 = ()=>{
    const [myData, setmyData] = useState(data)
    const [isLoaded, setIsLoaded] =useState(false)
   
    const handleFinish = (setPhase)=>{
        setPhase("end")
    }
    
    return(
       
       <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
       {
           (setScore, setPhase) => (
            
                    <>
                        <OrigamiComponent data={myData.column[0]} setPhase={setPhase} setScore={setScore}/>
       
                       {
                        isLoaded&& <div className="buttons-field">
                                            <button onClick={()=>{handleFinish(setPhase)}}>SIGUIENTE</button>
                                    </div>
                                        }
                    </>
    
           )
       }
   </ScoringComponent>
           
       
    )
}
export default Ex104