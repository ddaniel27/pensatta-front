import ScoringComponent from '../components/scoringComponent.jsx'
import BloodnameComponent from '../components/bloodnameComponent.jsx'
import { useEffect, useState } from 'react'
import useData from '../../../hooks/useData.jsx'

const Ex52 = () => {
  const { data } = useData('ex52')
  const [myData, setMyData] = useState(data)

  useEffect(() => {
    setMyData(data)
  }, [data])
  return (
    <ScoringComponent initMessages={myData.initMessages} title={myData.name} background={myData.color} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <BloodnameComponent setPhase={setPhase} setScore={setScore} />
        )
      }
    </ScoringComponent>
  )
}
export default Ex52
