import React, { useEffect } from 'react'
import Synth from '../components/synth'
import NoScoringComponent from '../components/noScoringComponent'

import '../../../styles/ex54.css'
import useData from '../../../hooks/useData'

export default function Ex54 () {
  const { data } = useData('ex54')
  const [myData, setMyData] = React.useState({
    ...data
  })

  useEffect(() => {
    setMyData(data)
  }, [data])

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <div className="ex54">
            <div className="synth-container">
              <Synth />
            </div>
            <button onClick={() => { setPhase('end') }}>{myData.btnEnd}</button>
          </div>
        )
      }
    </NoScoringComponent>
  )
}
