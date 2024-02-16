import useData from '../../../hooks/useData'
import NoScoringComponent from '../components/noScoringComponent'
import MapsGame from '../components/mapsGame'
import { useEffect, useState } from 'react'

export default function Ex93 () {
  const { data } = useData('ex93')
  const [myData, setMyData] = useState(data)
  useEffect(() => {
    setMyData(data)
  }, [data])
  return (
    <NoScoringComponent initMessages={myData.initMessages} title={myData.name} background={myData.color}>
      {(setPhase) => (
        <MapsGame setPhase={setPhase} countries={myData.countries} />
      )}
    </NoScoringComponent>
  )
}
