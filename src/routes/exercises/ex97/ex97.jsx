import { useState, useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import useData from "../../../hooks/useData"
import MonitorColorsComponent from '../components/monitorColorsComponent'

export default function Ex97 () {
  const { data } = useData("ex97")
  const [myData, setMyData] = useState({ ...data })
  useEffect(() => {
    setMyData({ ...data })
  }, [data])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <MonitorColorsComponent setScore={setScore} setPhase={setPhase} data={myData.options}/>
        )
      }
    </ScoringComponent>
  )
}
