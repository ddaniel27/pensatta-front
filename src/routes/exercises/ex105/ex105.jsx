import data from './data.json'
import NoScoringComponent from '../components/noScoringComponent'
import FormExercise from '../components/formExercise'
import useData from '../../../hooks/useData'
import { useEffect, useState } from 'react'

const Ex105 = () => {
  const { data } = useData('ex105')

  const [myData, setMyData] = useState(data)

  useEffect(() => {
    setMyData(data)
  }, [data])
  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {(setPhase) => (
        <FormExercise inputs={myData.inputs[Math.floor(Math.random() * 10)]} setPhase={setPhase} btn={myData.btnEnd}/>
      )}
    </NoScoringComponent>
  )
}
export default Ex105
