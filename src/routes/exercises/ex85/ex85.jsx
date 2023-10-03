import { useState, useEffect } from "react"
import ScreenRenderUniqueOptionsEncapsulate from "../components/screenRenderUniqueOptionsEncapsulate"
import ScoringComponent from "../components/scoringComponent"
import useData from "../../../hooks/useData"

export default function Ex85(){
  const { data } = useData("ex85")

    const [ game ] = useState(Math.floor(Math.random()*data.options.length))
    const [ myData, setMyData ] = useState({
        ...data,
        options: data.options[game].sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })
    const [ nextQuestion, setNextQuestion ] = useState(false)

  useEffect(() => {
    setMyData({
      ...data,
        options: data.options[game].sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })
  }, [data])

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <>
                    {!nextQuestion ? 
                        <>
                            <div className="ex85-img-container" style={{textAlign:"center", padding:"3%"}}>
                                <img src="images/exercises/85/dfd.svg" alt="dfd" style={{width:"70vw"}} />
                            </div>
                            <button className="button" onClick={() => setNextQuestion(true)}>{myData["start-button"]}</button>
                        </>: 
                        <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={false} returnScore={setScore} isFinished={setPhase} center={true}/> 
                    }
                    </>
                )
            }
        </ScoringComponent>
    )
}
