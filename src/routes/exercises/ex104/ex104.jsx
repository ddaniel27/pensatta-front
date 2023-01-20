import React, {useEffect,useState} from "react";
import data from "./data.json"
import NoScoringComponent from "../components/noScoringComponent";
import OrigamiComponent from "../components/origamiComponent";


const Ex104 = ()=>{
    const [myData, setmyData] = useState(data)
    const [isLoaded, setIsLoaded] =useState(false)
   
    const handleFinish = (setPhase)=>{
        setPhase("end")
    }
    
    return(
       
       <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
       {
           (setPhase) => (
            
                    <>
                        <OrigamiComponent data={myData.column[0]} setPhase={setPhase}/>
       
                       {
                        isLoaded&& <div className="buttons-field">
                                            <button onClick={()=>{handleFinish(setPhase)}}>SIGUIENTE</button>
                                    </div>
                                        }
                    </>
    
           )
       }
   </NoScoringComponent>
           
       
    )
}
export default Ex104