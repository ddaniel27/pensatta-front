import React, { useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import ToggleSwitches from '../components/toggleSwitchesComponent'
import useData from '../../../hooks/useData'

export default function Ex100 () {
  const { data } = useData('ex100')
  // eslint-disable-next-line no-unused-vars
  const [myData, setMyData] = React.useState(data)

  useEffect(() => {
    setMyData(data)
  }, [data])

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
