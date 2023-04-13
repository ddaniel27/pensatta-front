import React from 'react'
import NoScoringComponent from '../components/noScoringComponent'
import BlackboxDropdown from '../components/blackboxWithDropdown'
import data from './data.json'
import '../../../styles/ex94.css'

export default function Ex94 () {
  const [myData] = React.useState({
    ...data
  })

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <div className='ex94-container'>
            <BlackboxDropdown />
            <BlackboxDropdown />
            <BlackboxDropdown />
          </div>
        )
      }
    </NoScoringComponent>
  )
}
