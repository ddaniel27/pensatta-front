import React, { useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import TextSelectComponent from '../components/textSelectComponent'
import useData from '../../../hooks/useData'

export default function Ex102 () {
  const { data } = useData('ex112')
  // eslint-disable-next-line no-unused-vars
  const [myData, setMyData] = React.useState({
    ...data,
    options: data.options.sort(() => 0.5 - Math.random()).slice(0, 1)
  })

  useEffect(() => {
    setMyData({
      ...data,
      options: data.options.sort(() => 0.5 - Math.random()).slice(0, 1)
    })
  }, [data])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <TextSelectComponent text={myData.options[0].texto} options={myData.options[0].opciones} setPhase={setPhase} setScore={setScore}/>
        )
      }
    </ScoringComponent>
  )
}
