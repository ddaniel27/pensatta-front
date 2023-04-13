import { useState, useEffect } from 'react'
import NoScoringComponent from '../components/noScoringComponent'
import data from './data.json'
import '../../../styles/ex94.css'
import BlackboxWithDropdown from '../components/blackboxWithDropdown'

export default function Ex94 () {
  const [myData] = useState({
    ...data,
    options: data.options.sort(() => 0.5 - Math.random()).slice(0, 3)
  })

  const [results, setResults] = useState({})

  useEffect(() => {
    console.log(results)
  }, [results])

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <FirstScreen data={myData} setResults={setResults} />
        )
      }
    </NoScoringComponent>
  )
}

function FirstScreen ({ data, setResults }) {
  return (
    <div className='ex94-container'>
      {data.options.map((option, index) => (
        <BlackboxWithDropdown key={index} inputs={option.inputs} idBox={index + 1} setOperationResult={(currentResult) => setResults(prev => ({ ...prev, [index + 1]: currentResult }))} />
      ))}
    </div>
  )
}
