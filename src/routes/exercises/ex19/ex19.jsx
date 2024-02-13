import React, { useState, useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import BalloonsComponent from '../components/balloonsComponent'
import '../../../styles/balloon.css'
import useData from '../../../hooks/useData'

const Ex19 = () => {
  const { data } = useData('ex19')
  const [myData, setMyData] = useState({
    ...data
  })
  useEffect(() => {
    setMyData({
      ...data
    })
  }, [data])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <div className="game-container">
            <BalloonsComponent data={myData} setPhase={setPhase} setScore={setScore}/>
          </div>
        )
      }
    </ScoringComponent>

  )
}
export default Ex19
