import React, { useEffect } from 'react'
import ScreenRenderUniqueOptionsEncapsulate from '../components/screenRenderUniqueOptionsEncapsulate'
import ScoringComponent from '../components/scoringComponent'
import useData from '../../../hooks/useData'

export default function Ex69 () {
  const { data } = useData('ex99')
  // eslint-disable-next-line no-unused-vars
  const [myData, setMyData] = React.useState({
    ...data,
    options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
  })

  useEffect(() => {
    setMyData({
      ...data,
      options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })
  }, [data])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={false} returnScore={setScore} isFinished={setPhase} center={true} />
        )
      }
    </ScoringComponent>
  )
}
