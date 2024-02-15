import ScoringComponent from '../components/scoringComponent'
import TextSelectComponent from '../components/textSelectComponent'
import { useEffect, useState } from 'react'
import useData from '../../../hooks/useData'

export default function Ex72 () {
  const { data } = useData('ex72')
  const [myData, setMyData] = useState(data)

  useEffect(() => {
    setMyData(data)
  }
  , [data])

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
