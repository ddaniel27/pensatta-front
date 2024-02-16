import NoScoringComponent from '../components/noScoringComponent'
import ServerGame from '../components/serverGame'
import useData from '../../../hooks/useData'
import { useEffect, useState } from 'react'

export default function Ex91 () {
  const { data } = useData('ex91')
  const [myData, setMyData] = useState(data)

  useEffect(() => {
    setMyData(data)
  }, [data])

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <ServerGame setPhase={setPhase}/>
        )
      }
    </NoScoringComponent>
  )
}
