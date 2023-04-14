import { useState, useEffect } from 'react'
import blackboxSrc from '../../../../public/images/exercises/40/blackbox.svg'
import data from './data.json'
import NoScoringComponent from '../components/noScoringComponent'
import BlackboxWithDropdown from '../components/blackboxWithDropdown'
import UniqueOption from '../components/uniqueOption'
import '../../../styles/ex94.css'

export default function Ex94 () {
  const [myData] = useState({
    ...data,
    options: data.options.sort(() => 0.5 - Math.random()).slice(0, 3)
  })

  const [results, setResults] = useState({})
  const [nextScreen, setNextScreen] = useState(false)

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <>
            {!nextScreen && <>
              <FirstScreen data={myData} setResults={setResults} />
              <button onClick={() => setNextScreen(true)} disabled={Object.keys(results).length < 3}>SIGUIENTE</button>
            </>}
            {nextScreen && <>
              <SecondScreen data={myData} prevInputs={results} />
              <button onClick={() => setPhase('end')}>FINALIZAR</button>
            </>}
          </>
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

function SecondScreen ({ data, prevInputs }) {
  const [inputSel, setInputSel] = useState(null)
  const [total, setTotal] = useState(null)
  const [myInputs] = useState({
    options: data.options2.sort(() => 0.5 - Math.random()).slice(0, 4)
  })

  useEffect(() => {
    if (inputSel) {
      const f = Function(inputSel.arguments, inputSel.body)
      const result = f(...Object.values(prevInputs))
      setTotal(result)
    }
  }, [inputSel])

  return (
    <div className='ex94-second-container'>
      <div className='ex94-second-container-blackbox'>
        <img src={blackboxSrc} alt='blackbox' />
        <span>{total}</span>
      </div>
      <UniqueOption options={myInputs.options} uniqueName='entradas' isCorrectOption={setInputSel} />
    </div>
  )
}
