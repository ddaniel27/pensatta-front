import React from 'react'
import ActivityContext from '../../../context/ActivityContext'
import NoScoringComponent from '../components/noScoringComponent'
import BlackboxDropdown from '../components/blackboxWithDropdown'
import data from './data.json'

export default function Ex94 () {
  const { setActivity, setTitle, setBackground } = React.useContext(ActivityContext)
  const [myData] = React.useState({
    ...data
  })

  React.useEffect(() => {
    setTitle(data.name)
    setBackground(data.color)
    return () => {
      setActivity(true)
    }
  }, [setActivity, setBackground, setTitle])

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <>
            <BlackboxDropdown setPhase={setPhase} />
          </>
        )
      }
    </NoScoringComponent>
  )
}
