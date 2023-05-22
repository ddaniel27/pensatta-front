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
import CentralAfrica from './continentCentralAfrica'
import WestAsia from './continentWestAsia'
import CentralAsia from './continentCentralAsia'
import EastAsia from './continentEastAsia'
import SouthAsia from './continentSouthAsia'
import Oceania from './continentOceania'
import AllWorld from './continentsAll'

const SecondStage = ({ options = [] }) => {
  const [country, setCountry] = useState('usa')
  const [continent, setContinent] = useState('north-america')

  return (
    <div>
      <div>
        {
          continent === 'north-america' && <NorthAmerica setCountry={setCountry} country={country} />
        }
        {
          continent === 'central-america' && <CentralAmerica setCountry={setCountry} country={country} />
        }
        {
          continent === 'south-america' && <SouthAmerica setCountry={setCountry} country={country} />
        }
        {
          continent === 'north-europe' && <NorthEurope setCountry={setCountry} country={country} />
        }
        {
          continent === 'central-europe' && <CentralEurope setCountry={setCountry} country={country} />
        }
        {
          continent === 'south-europe' && <SouthEurope setCountry={setCountry} country={country} />
        }
        {
          continent === 'north-africa' && <SeptentrionalAfrica setCountry={setCountry} country={country} />
        }
        {
          continent === 'west-africa' && <WestAfrica setCountry={setCountry} country={country} />
        }
        {
          continent === 'east-africa' && <EastAfrica setCountry={setCountry} country={country} />
        }
        {
          continent === 'south-africa' && <MeridionalAfrica setCountry={setCountry} country={country} />
        }
        {
          continent === 'central-africa' && <CentralAfrica setCountry={setCountry} country={country} />
        }
        {
          continent === 'west-asia' && <WestAsia setCountry={setCountry} country={country} />
        }
        {
          continent === 'central-asia' && <CentralAsia setCountry={setCountry} country={country} />
        }
        {
          continent === 'east-asia' && <EastAsia setCountry={setCountry} country={country} />
        }
        {
          continent === 'south-asia' && <SouthAsia setCountry={setCountry} country={country} />
        }
        {
          continent === 'oceania' && <Oceania setCountry={setCountry} country={country} />
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
