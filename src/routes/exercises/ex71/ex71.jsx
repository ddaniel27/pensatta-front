import React from 'react'
import ActivityContext from '../../../context/ActivityContext'
import UniqueOption from '../components/uniqueOption'
import ScoringComponent from '../components/scoringComponent'
import data from './data.json'

export default function Ex40 () {
  const { setActivity, setTitle, setBackground } = React.useContext(ActivityContext)
  const [inputSel, setInputSel] = React.useState([])
  const [operatorSel, setOperatorSel] = React.useState(null)
  const [result, setResult] = React.useState(null)
  const [myInputs] = React.useState(
    data.variations
      .sort(() => 0.5 - Math.random())
      .slice(0, data.threshold.perfect)[0]
  )
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

  React.useEffect(() => {
    setResult(handleOperation(inputSel, operatorSel))
  }, [inputSel, operatorSel])

  const handleOperation = (input, operator) => {
    if (!operator || !input.length) {
      return 'Prueba seleccionando un operador y un valor'
    }
    if (operator === 1) {
      return typeof input[0] === 'number' ? input[0] + input[1] : 'Error'
    }
    if (operator === 2) {
      return typeof input[0] === 'number' ? input[0] - input[1] : 'Error'
    }
    if (operator === 3) {
      return typeof input[0] === 'number' ? input[0] * input[1] : 'Error'
    }
    if (operator === 4) {
      return typeof input[0] === 'number' ? (input[0] / input[1]).toFixed(3) : 'Error'
    }
  }

  const handleNext = (cb1, cb2) => {
    if (operatorSel === inputSel[2]) {
      cb1(1)
    } else {
      cb1(0)
    }
    cb2('end')
  }

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <>
            <div className='blackbox'>
              <UniqueOption title={myInputs.input.title} options={[myInputs.input]} uniqueName='entradas' isCorrectOption={setInputSel} />
              <UniqueOption options={myInputs.operators} uniqueName='operador' isCorrectOption={setOperatorSel} />
              <div className='function'>
                <img src='./images/exercises/40/blackbox.svg' alt='blackbox' />
                <div className='message'><p>{result}</p></div>
              </div>
            </div>
            <button onClick={() => handleNext(setScore, setPhase)}>SIGUIENTE</button>
          </>
        )
      }
    </ScoringComponent>
  )
}
