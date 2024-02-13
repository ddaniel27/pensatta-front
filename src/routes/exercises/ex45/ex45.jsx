import useData from '../../../hooks/useData'
import NoScoringComponent from '../components/noScoringComponent'
import FishGame from '../components/fishGame'
import { useEffect, useState } from 'react'
export default function Ex45 () {
  const { data } = useData('ex45')
  const [myData, setMyData] = useState(data)
  useEffect(() => {
    setMyData(data)
  }, [data])
  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {(setPhase) => (
        <FishGame setPhase={setPhase}/>
      )}
    </NoScoringComponent>
  )
}
