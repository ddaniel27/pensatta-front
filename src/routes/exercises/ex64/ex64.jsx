import { useState, useEffect } from 'react'
import CarritoQuestionsComponent from '../components/carritoQuestionsComponent'
import ScoringComponent from '../components/scoringComponent'
import useData from '../../../hooks/useData'

const Ex64 = () => {
  const { data } = useData('ex64')
  const [myData, setMyData] = useState({ ...data })

  useEffect(() => {
    setMyData({ ...data })
  }, [data])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <CarritoQuestionsComponent setScore={setScore} setPhase={setPhase} data={myData}/>
        )
      }
    </ScoringComponent>
  )
}
export default Ex64
