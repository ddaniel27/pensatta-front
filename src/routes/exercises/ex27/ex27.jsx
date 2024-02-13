import { useState, useEffect } from 'react'
import NoScoringComponent from '../components/noScoringComponent'
import WhiteboardComponent from '../components/whiteBoardComponent'
import useData from '../../../hooks/useData'

const Ex27 = () => {
  const { data } = useData('ex27')
  const [myData, setMyData] = useState(data)
  useEffect(() => {
    setMyData(data)
  }, [data])
  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {(setPhase) => (
        <WhiteboardComponent setPhase={setPhase}/>
      )}
    </NoScoringComponent>
  )
}
export default Ex27
