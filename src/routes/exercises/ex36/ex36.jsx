import GameComponent from './components/gameComponent'
import NoScoringComponent from '../components/noScoringComponent'
import { useEffect, useState } from 'react'
import useData from '../../../hooks/useData'

export default function Ex36 () {
  const { data } = useData('ex36')
  const [myData, setMyData] = useState({
    ...data
  })
  const [isFinish, setIsFinish] = useState(false)
  const props = {
    gridSize: 12,
    animate: true
  }
  useEffect(() => {
    setMyData(data)
  }, [data])
  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} >
      {
        (setPhase) => (
          <GameComponent {...props} setPhase={setPhase} setIsFinish={setIsFinish} isFinish={isFinish}/>
        )
      }
    </NoScoringComponent>
  )
}
