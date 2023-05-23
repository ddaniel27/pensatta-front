import { useState } from 'react'

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

const ButtonOption = ({ option, setOptions, options }) => {
  const handleClick = () => {
    if (options.includes(option[1])) {
      setOptions(options.filter((opt) => opt !== option[1]))
    } else {
      setOptions([...options, option[1]])
    }
  }
  return (
    <div className={`${styles['btn-option']} ${options.includes(option[1]) ? styles['btn-option-selected'] : ''}`} onClick={handleClick} >{option[0]}</div>
  )
}

const FirstStage = ({ setOptions, options, setStage }) => {
  const preOptions = [['Gentilicio', 'demonym'], ['Moneda', 'money'], ['Dominio internet', 'domain'], ['Idioma', 'language'], ['Capital', 'capital']]

  return (
    <div className={styles['game-container']}>
      <div className={styles['options-buttons']}>
        <span>Al tocar un país, mostrar</span>
        {
          preOptions.map((option, index) => (
            <ButtonOption key={index} option={option} setOptions={setOptions} options={options} />
          ))
        }
      </div>
      <button className={styles['btn-start']} disabled={options.length == 0} onClick={() => setStage(2)}>SIGUIENTE</button>
    </div>

  )
}

const SecondStage = ({ options = [], countries = {}, setPhase, setStage }) => {
  const [country, setCountry] = useState('usa')
  const [continent, setContinent] = useState('north-america')
  const preOptions = { demonym: 'Gentilicio', money: 'Moneda', domain: 'Dominio internet', language: 'Idioma', capital: 'Capital' }

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
              <div className={`${styles['size-20px']} ${styles['color-dark-green']}`}>Nombre</div>
              <div className={`${styles['size-20px']} ${styles['bolder-font']} ${styles['color-dark-green']}`}>{countries?.[continent]?.[country]?.name ?? '-'}</div>
            </div>
            {
              options.map((option, index) => (
                <div key={index} className={styles['option-container']}>
                  <div className={`${styles['size-20px']} ${styles['color-dark-gray']}`}>{preOptions[option]}</div>
                  <div className={`${styles['size-20px']} ${styles['bolder-font']} ${styles['color-dark-gray']}`}>{countries?.[continent]?.[country]?.[option] ?? '-'}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <button id={styles['btn-finish']} onClick={() => { setPhase('end') }}>FINALIZAR</button>
      <button id={styles['btn-back']} onClick={() => { setStage(1) }}>VOLVER</button>
    </div>
  )
}

const MapsGame = ({ countries, setPhase }) => {
  const [stage, setStage] = useState(1)
  const [options, setOptions] = useState([])

  return (
    <>
      {stage === 1 && <FirstStage setOptions={setOptions} options={options} setStage={setStage} />}
      {stage === 2 && <SecondStage countries={countries} setPhase={setPhase} setStage={setStage} options={options}/>}
    </>

  )
}
export default MapsGame
