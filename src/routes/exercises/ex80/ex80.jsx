import useData from '../../../hooks/useData'
import LaboratoryGame from '../components/laboratoryComponent'
import ScoringComponent from '../components/scoringComponent'
import { useState, useEffect } from 'react'

export default function Ex80 () {
  const [variation, setVariation] = useState(null)
  const { data } = useData('ex80')
  useEffect(() => {
    setVariation(Math.ceil(Math.random() * 10))
  }, [])
  return (
    <ScoringComponent initMessages={data.initMessages} title={data.name} background={data.color} threshold={data.threshold} exerciseId={data.id}>
      {
        (setScore, setPhase) => (
          <LaboratoryGame algorithm={data.algorithms[variation].algorithm} image={data.algorithms[variation].image} setScore={setScore} setPhase={setPhase}/>
        )
      }
    </ScoringComponent>
  )
}
