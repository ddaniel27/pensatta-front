import { useEffect, useState } from 'react'
import Maze2Component from '../components/maze2Component'
import ScoringComponent from '../components/scoringComponent'
import useData from '../../../hooks/useData'

const Ex09 = () => {
  const [lab, setLab] = useState(Math.floor(Math.random() * 10) + 1)
  useEffect(() => {
    setLab(Math.floor(Math.random() * 10) + 1)
  }, [])

  const { data } = useData('ex09')
  const [myData, setMyData] = useState({
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
          <Maze2Component lab={lab} setPhase={setPhase} setScore={setScore}/>
        )
      }
    </ScoringComponent>

  )
}

export default Ex09
