import React, { useEffect } from 'react'
import ScreenRenderUniqueOptionsEncapsulate from '../components/screenRenderUniqueOptionsEncapsulate'
import ScoringComponent from '../components/scoringComponent'
import useData from '../../../hooks/useData'

export default function Ex79 () {
  const { data } = useData('ex79')
  // eslint-disable-next-line no-unused-vars
  const data2 = { ...data, options: data.options[`${Math.floor(Math.random() * 1) + 1}`] }
  const [myData, setMyData] = React.useState({
    ...data2,
    options: data2.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
  })

  useEffect(() => {
    setMyData({
      ...data2,
      options: data2.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })
  }, [data2])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={true} returnScore={setScore} isFinished={setPhase} />
        )
      }
    </ScoringComponent>
  )
}
