import React, { useEffect } from 'react'
import ScreenRenderUniqueOptionsEncapsulate from '../components/screenRenderUniqueOptionsEncapsulate'
import ScoringComponent from '../components/scoringComponent'
import useData from '../../../hooks/useData'

export default function Ex02 () {
  /* const { t } = useTranslation('ex02') */
  const { data } = useData('ex02')
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

  // const info = t('options', { returnObjects: true }).sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
  return (
    <ScoringComponent initMessages={/* t('initMessages', { returnObjects: true }) */ myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages returnScore={setScore} isFinished={setPhase} />
        )
      }
    </ScoringComponent>
  )
}
