import React, { useEffect, useState } from 'react'
import MazePistaComponent from '../components/mazePistaComponent'
import ScoringComponent from '../components/scoringComponent'
import conosH from '/images/exercises/32/conosH.svg'
import conosV from '/images/exercises/32/conosV.svg'
import useData from '../../../hooks/useData'

const Ex32 = () => {
  const { data } = useData('ex32')
  const [myData, setMyData] = useState(data)
  const conos = { H: conosH, V: conosV }
  const [lab, setLab] = useState(Math.floor(Math.random() * 6) + 1)
  useEffect(() => {
    setLab(Math.floor(Math.random() * 6) + 1)
  }, [])

  useEffect(() => {
    setMyData(data)
  }, [data])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <MazePistaComponent lab={lab} setPhase={setPhase} setScore={setScore} colorLine="transparent" imagePath={conos}/>
        )
      }
    </ScoringComponent>

  )
}

export default Ex32
