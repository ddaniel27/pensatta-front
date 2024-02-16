import { useState, useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import BoardInstruction from '../components/boardInstructions'
import useData from '../../../hooks/useData'

const Ex89 = () => {
  const { data } = useData('ex89')
  const [myData, setMyData] = useState(data)

  useEffect(() => {
    setMyData(data)
  }, [data])
  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {(setScore, setPhase) => (
        <BoardInstruction setScore={setScore} setPhase={setPhase} data={myData.codigos[Math.floor(Math.random() * 10) + 1]}/>
      )}
    </ScoringComponent>
  )
}
export default Ex89
