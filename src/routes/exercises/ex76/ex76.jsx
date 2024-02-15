import WindowsExplorer from '../components/windowsExplorer'
import NoScoringComponent from '../components/noScoringComponent'
import { useEffect, useState } from 'react'
import useData from '../../../hooks/useData'

export default function Ex76 () {
  const { data } = useData('ex76')
  const [myData, setMyData] = useState(data)

  useEffect(() => {
    setMyData(data)
  }, [data])

  return (
    <NoScoringComponent initMessages={myData.initMessages} title={myData.name} background={myData.color}>
      {
        (setPhase) => (
          <>
            <WindowsExplorer content={myData.content}/>
            <button onClick={() => setPhase('end')}>{myData.btnNext}</button>
          </>
        )
      }
    </NoScoringComponent>
  )
}
