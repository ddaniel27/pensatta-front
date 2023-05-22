import { useState, useEffect } from 'react'

import NorthAmerica from './continentNorthAmerica'
import CentralAmerica from './continentCentralAmerica'
import SouthAmerica from './continentSouthAmerica'
import NorthEurope from './continentNorthEurope'
import CentralEurope from './continentCentralEurope'
import SouthEurope from './continentSouthEurope'
import SeptentrionalAfrica from './continentSeptentrionalAfrica'
import WestAfrica from './continentWestAfrica'
import EastAfrica from './continentEastAfrica'
import MeridionalAfrica from './continentMeridionalAfrica'
import WestAsia from './continentWestAsia'
import CentralAsia from './continentCentralAsia'
import EastAsia from './continentEastAsia'
import SouthAsia from './continentSouthAsia'
import Oceania from './continentOceania'
import AllWorld from './continentsAll'

const SecondStage = ({ options = [] }) => {
  const [country, setCountry] = useState('')
  const [continent, setContinent] = useState('')

  return (
    <div>
      <div>
        {

        }
      </div>
      <div>
        <div>
          <AllWorld setContinent={setContinent} continent={continent}/>
        </div>
        <div>
          {
            options.map((option, index) => (
              <div key={index}>
                <div>{option}</div>
                <div>{}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

const MapsGame = () => {
  return (
    <>
      <SecondStage />
    </>

  )
}
export default MapsGame
