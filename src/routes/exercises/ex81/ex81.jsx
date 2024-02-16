import { useState, useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import useData from '../../../hooks/useData'
import TextSelectComponent from '../components/textSelectComponent'

export default function Ex81 () {
  const { data } = useData('ex81')
  const [myData, setMyData] = useState({ ...data })

  useEffect(() => {
    setMyData({ ...data })
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
