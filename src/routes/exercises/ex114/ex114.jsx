import React, { useState, useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import BalloonsComponent from '../components/balloonsComponent'
import '../../../styles/balloon.css'
import useData from '../../../hooks/useData'

const Ex19 = () => {
  const { data } = useData('ex114')
  const [myData, setMyData] = useState(() => {
    const randomOptions = data.options.sort(() => 0.5 - Math.random()).slice(0, 1)[0];
    const { system, balloons, positions, isSo } = randomOptions;
    return {
      ...data,
      system: system,
      balloons: balloons,
      positions: positions,
      isSo: isSo
    };
  })
  useEffect(() => {
    setMyData(() => {
    const randomOptions = data.options.sort(() => 0.5 - Math.random()).slice(0, 1)[0];
    const { system, balloons, positions, isSo } = randomOptions;
    return {
      ...data,
      system: system,
      balloons: balloons,
      positions: positions,
      isSo: isSo
    };
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
