import GameComponent from './components/gameComponent'
import NoScoringComponent from '../components/noScoringComponent'
import { useState } from 'react'
import data from './data.json'

export default function Ex36 () {
  const [isFinish, setIsFinish] = useState(false)
  const props = {
    gridSize: 12,
    animate: true
  }
  return (
    <NoScoringComponent initMessages={data.initMessages} background={data.color} title={data.title} >
      {
        (setPhase) => (
          <GameComponent {...props} setPhase={setPhase} setIsFinish={setIsFinish} isFinish={isFinish}/>
        )
      }
    </NoScoringComponent>
  )
}
