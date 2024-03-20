import { useEffect, useState } from 'react'
import MazeCardsComponent from '../components/mazeCardsComponent'
import ScoringComponent from '../components/scoringComponent'
import useData from '../../../hooks/useData'

const Ex110 = () => {
  const [lab, setLab] = useState(Math.floor(Math.random() * 6) + 1)
  useEffect(() => {
    setLab(Math.floor(Math.random() * 6) + 1)
  }, [])

  const { data } = useData('ex110')
  const [myData, setMyData] = useState({
    ...data,
    options: data.options.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
  })

  useEffect(() => {
    console.log(data)
    setMyData({
      ...data,
      options: data.options.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
    })
  }, [data])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.options.title} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <MazeCardsComponent cardsArray={myData.options.cards} setPhase={setPhase} setScore={setScore}/>
        )
      }
    </ScoringComponent>

  )
}

export default Ex110
