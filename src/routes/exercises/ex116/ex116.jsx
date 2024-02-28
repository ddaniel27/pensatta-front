import React from 'react'
import ScreenRenderUniqueOptionsEncapsulate from '../components/screenRenderUniqueOptionsEncapsulate'
import ScoringComponent from '../components/scoringComponent'
import useData from '../../../hooks/useData'

export default function Ex116 () {
  const { data } = useData('ex116')
  const [myData] = React.useState({
    ...data,
    options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
  })

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={false} returnScore={setScore} isFinished={setPhase} center={true}/>
        )
      }
    </ScoringComponent>
  )
}
