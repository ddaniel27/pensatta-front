import React, { useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import TextSelectComponent from '../components/textSelectComponent'
import useData from '../../../hooks/useData'

export default function Ex78 () {
  const { data } = useData('ex78')
  // eslint-disable-next-line no-unused-vars
  const [myData, setMyData] = React.useState(data)

  useEffect(() => {
    setMyData(data)
  }, [data])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <TextSelectComponent text={myData.options[1].texto} options={myData.options[1].opciones} setPhase={setPhase} setScore={setScore}/>
        )
      }
    </ScoringComponent>
  )
}
