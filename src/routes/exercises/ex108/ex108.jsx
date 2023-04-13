import { useState, useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import DndVonListComponent from '../components/dndFor108'
import data from './data.json'
import '../../../styles/ex108.css'

export default function Ex15 () {
  const [myData] = useState({
    ...data,
    variations: data.variations.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
  })

  const [values, setValues] = useState([])

  useEffect(() => {
    console.log(values)
  }, [values])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <div className='list-ex108'>
            <DndVonListComponent data={myData.variations} returnScore={setValues} />
          </div>
        )
      }
    </ScoringComponent>
  )
}
