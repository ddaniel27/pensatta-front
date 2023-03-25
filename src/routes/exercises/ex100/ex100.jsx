import React from 'react'
import ScoringComponent from '../components/scoringComponent'
import ToggleSwitches from '../components/toggleSwitchesComponent'
import data from './data.json'

export default function Ex100 () {
  // eslint-disable-next-line no-unused-vars
  const [myData, setMyData] = React.useState(data)

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <ToggleSwitches setScore={setScore} setPhase={setPhase} data={myData.options}/>
        )
      }
    </ScoringComponent>
  )
}
