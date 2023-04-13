import React from 'react'
import ScoringComponent from '../components/scoringComponent'
import DndVonListComponent from '../components/dndVonListComponent'
import data from './data.json'

export default function Ex15 () {
  const [myData] = React.useState({
    ...data,
    variations: data.variations.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
  })

  const [values, setValues] = React.useState([])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <div className='list-ex15'>
            <DndVonListComponent data={myData.variations} returnScore={setValues} />
          </div>
        )
      }
    </ScoringComponent>
  )
}
