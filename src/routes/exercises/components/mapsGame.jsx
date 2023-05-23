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
import styles from '../../../styles/mapsGame.module.css'

const SecondStage = ({ options = [], countries = {} }) => {
  const [country, setCountry] = useState('usa')
  const [continent, setContinent] = useState('north-america')

  return (
    <div className={styles['game-container']}>
      <div className={styles['maps-info-container']}>
        <div className={styles['big-map-container']}>
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
        <div className={styles['info-container']}>
          <div className={styles['small-map']}>
            <AllWorld setContinent={setContinent} continent={continent}/>
          </div>
          <div className={styles['info-country-card']}>
            <div className={styles['option-container']}>
              <div className={`${styles['size-20px']} ${styles['bolder-font']} ${styles['color-dark-green']}`}>Nombre</div>
              <div className={`${styles['size-20px']} ${styles['color-dark-green']}`}>{countries[continent][country]?.name}</div>
            </div>
            {
              options.map((option, index) => (
                <div key={index} className={styles['option-container']}>
                  <div>{option}</div>
                  <div>{countries[option]}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const MapsGame = ({ countries }) => {
  return (
    <>
      <SecondStage countries={countries} />
    </>

  )
}
export default MapsGame
