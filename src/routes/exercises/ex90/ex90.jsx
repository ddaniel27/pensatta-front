import ScoringComponent from '../components/scoringComponent.jsx'
import DigitalCircuitGame from '../components/digitalCircuitGame.jsx'
import useData from '../../../hooks/useData.jsx'
import { useEffect, useState } from 'react'

export default function Ex90 () {
  const { data } = useData('ex90')
  const [myData, setMyData] = useState(data)

  useEffect(() => {
    setMyData(data)
  }, [data])
  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} exerciseId={myData.id} threshold={myData.threshold}>
      {
        (setScore, setPhase) => (
          <DigitalCircuitGame setPhase={setPhase} setScore={setScore} texts={myData.texts}/>
        )
      }
    </ScoringComponent>)
}
