import { useEffect, useState, useRef } from 'react'
import styles from '../../../styles/dfdSelect.module.css'

function SelectDropdown ({ x = 0, y = 0, options = ['B / 2', '2*(X + B)', 'X - 1'], setAnswers, id }) {
  const handleClick = (option) => {
    console.log(option)
    setAnswers(prev => ({ ...prev, [id]: option }))
  }
  return (
    <div className={styles.dropdown} style={{ top: `${y}%`, left: `${x}%` }}>
      <div className={styles.dropdownButton}>
        {'>'}
      </div>
      <div className={styles.options}>
        {options.map((option, index) => (
          <p key={index} className={styles.option} onClick={() => { handleClick(option) }}>{option}</p>
        ))}
      </div>
    </div>
  )
}

export default function DfdSelect ({ purple = 'X=9 ; B=6;', blue = 'Fin del programa', gray1 = 'X + B', gray2 = 'B / 2', gray3 = '2*(X + B)', gray4 = 'X - 1', yellow = '¿X > B?', corrects = { 1: '2*(X + B)', 2: 'X - 1', 3: 'B / 2' }, setScore = () => {}, setPhase = () => {} }) {
  const [isFinish, setIsFinish] = useState(false)
  const [validations, setValidations] = useState({ 1: false, 2: false, 3: false })
  const optionsRef = useRef([gray2, gray3, gray4].sort(() => Math.random() - 0.5))
  const [answers, setAnswers] = useState({ 1: optionsRef.current[0], 2: optionsRef.current[1], 3: optionsRef.current[2] })

  useEffect(() => {
    if (isFinish) {
      let numCorrects = 0
      Object.keys(corrects).forEach(key => {
        if (answers[key] === corrects[key]) {
          numCorrects++
          setValidations(prev => ({ ...prev, [key]: true }))
        }
      })
      setScore(numCorrects)
    }
  }, [isFinish])

  return (
    <>
      <div className={styles['dfd-container']}>
        <svg width="480" height="420" viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M141 40C141 39.4477 140.552 39 140 39C139.448 39 139 39.4477 139 40L141 40ZM140 60L145.774 50L134.227 50L140 60ZM139 40L139 51L141 51L141 40L139 40Z" fill="white"/>
          <path d="M141 180C141 179.448 140.552 179 140 179C139.448 179 139 179.448 139 180L141 180ZM140 200L145.774 190L134.227 190L140 200ZM139 180L139 191L141 191L141 180L139 180Z" fill="white"/>
          <path d="M141 240C141 239.448 140.552 239 140 239C139.448 239 139 239.448 139 240L141 240ZM140 260L145.774 250L134.227 250L140 260ZM139 240L139 251L141 251L141 240L139 240Z" fill="white"/>
          <path d="M141 300C141 299.448 140.552 299 140 299C139.448 299 139 299.448 139 300L141 300ZM140 320L145.774 310L134.227 310L140 320ZM139 300L139 311L141 311L141 300L139 300Z" fill="white"/>
          <path d="M141 360C141 359.448 140.552 359 140 359C139.448 359 139 359.448 139 360L141 360ZM140 380L145.774 370L134.227 370L140 380ZM139 360L139 371L141 371L141 360L139 360Z" fill="white"/>
          <path d="M279 399C278.448 399 278 399.448 278 400C278 400.552 278.448 401 279 401L279 399ZM390 280L384.226 290L395.774 290L390 280ZM390 400L390 401C390.552 401 391 400.552 391 400L390 400ZM279 401L390 401L390 399L279 399L279 401ZM391 400L391 289L389 289L389 400L391 400Z" fill="white"/>
          <path d="M234 121C233.448 121 233 120.552 233 120C233 119.448 233.448 119 234 119L234 121ZM391 200L385.226 190L396.773 190L391 200ZM391 120L391 119C391.552 119 392 119.448 392 120L391 120ZM234 119L391 119L391 121L234 121L234 119ZM392 120L392 191L390 191L390 120L392 120Z" fill="white"/>
          <rect width="280" height="40" rx="20" fill="#E78CFE"/>
          <rect x="300" y="200" width="180" height="80" rx="20" fill="#3FDFE9"/>
          <rect y="200" width="280" height="40" rx="20" fill="#BDBDBD"/>
          <rect y="260" width="280" height="40" rx="20" fill={!isFinish ? '#BDBDBD' : (validations[1] ? '#69E485' : '#FF7171') }/>
          <rect y="320" width="280" height="40" rx="20" fill={!isFinish ? '#BDBDBD' : (validations[2] ? '#69E485' : '#FF7171') }/>
          <rect y="380" width="280" height="40" rx="20" fill={!isFinish ? '#BDBDBD' : (validations[3] ? '#69E485' : '#FF7171') }/>
          <path d="M130.359 65.6453L50.2417 111.312C43.5111 115.149 43.5111 124.851 50.2417 128.688L130.359 174.355C136.498 177.854 144.028 177.854 150.167 174.355L230.285 128.688C237.015 124.851 237.015 115.149 230.285 111.312L150.167 65.6453C144.028 62.146 136.498 62.146 130.359 65.6453Z" fill="#EDCA71"/>
          <text x="110" y="20" className={styles.text} fontWeight='bolder'>{purple}</text>
          <text x="115" y="120" className={styles.text}>{yellow}</text>
          <text x="330" y="240" className={styles.text}>{blue}</text>
          <text x="120" y="225" className={styles.text}>{gray1}</text>
          <text x="120" y="285" className={styles.text}>{answers['1']}</text>
          <text x="120" y="345" className={styles.text}>{answers['2']}</text>
          <text x="120" y="405" className={styles.text}>{answers['3']}</text>
          <text x="330" y="110" className={styles.textyn}>NO</text>
          <text x="150" y="195" className={styles.textyn}>SÍ</text>
        </svg>
        {!isFinish && <>
          <SelectDropdown options = {optionsRef.current} x={52} y={62.5} id={1} setAnswers={setAnswers}/>
          <SelectDropdown options = {optionsRef.current} x={52} y={76.5} id={2} setAnswers={setAnswers}/>
          <SelectDropdown options = {optionsRef.current} x={52} y={90.5} id={3} setAnswers={setAnswers}/>
        </>}
      </div>
      {!isFinish && <button onClick={() => setIsFinish(true)}>RESPONDER</button>}
      {isFinish && <button onClick={() => setPhase('end')}>FINALIZAR</button>}
    </>

  )
}
