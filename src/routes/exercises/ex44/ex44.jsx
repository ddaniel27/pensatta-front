import { useState, useEffect } from "react"
import Circuit from "../components/circuit"
import ScoringComponent from "../components/scoringComponent"
import useData from "../../../hooks/useData"
import "../../../styles/ex44.css"

export default function Ex44(){
  const { data } = useData("ex44")
  const [ myData, setMyData ] = useState({
    ...data,
    options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
  })
  useEffect(() => {
    setMyData({
      ...data,
      options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })
  }, [data])

    const [ nextQuestion, setNextQuestion ] = useState(false)
    const [ value, setValue ] = useState(false)

    const handleClick = (cb1, cb2) => {
        cb1( value ? 1 : 0 )
        cb2("end")
    }

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
            {
                (setScore, setPhase) => (
                    <div className="ex44">
                        <Circuit book={myData.options[0].book} left={myData.options[0].left} right={myData.options[0].right} showValue={nextQuestion} isCorrect={setValue} />
                        {!nextQuestion && <button onClick={()=>{setNextQuestion(true)}}>{data["answer-button"]}</button>}
                        {nextQuestion && <button onClick={()=>{handleClick(setScore, setPhase)}}>{data["finish-button"]}</button>}
                    </div>
                )
            }
        </ScoringComponent>
    )

}
