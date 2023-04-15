import { useState, useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import DndComponent from '../components/dndComponent'
import data from './data.json'
import '../../../styles/ex70.css'

const Ex70 = () => {
  const [myData] = useState({
    ...data,
    options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)[0]
  })
  const [option1, setOption1] = useState(0)
  const [option2, setOption2] = useState(0)
  const [selectedSpan, setSelectedSpan] = useState([])
  const [response, setResponse] = useState(false)
  const [total, setTotal] = useState(true)

  useEffect(() => {
    const spanChecked = document.querySelectorAll('.ex70-radio input:checked + span')
    setSelectedSpan([...spanChecked])
  }, [option1, option2])

  const handleClick = () => {
    setResponse(true)

    const [option1Span, option2Span] = selectedSpan

    if (option1 === myData.options.correct[0]) {
      option1Span.classList.add('correct')
    } else {
      option1Span.classList.add('wrong')
      document.querySelector(`.ex70-radio input[value="${myData.options.correct[0]}"][name="radio-1"] + span`).classList.add('correct')
      setTotal(false)
    }

    if (option2 === myData.options.correct[1]) {
      option2Span.classList.add('correct')
    } else {
      option2Span.classList.add('wrong')
      document.querySelector(`.ex70-radio input[value="${myData.options.correct[1]}"][name="radio-2"] + span`).classList.add('correct')
      setTotal(false)
    }
  }

  const handleEnd = (cb1, cb2) => {
    if (total) {
      cb1(1)
    } else {
      cb1(0)
    }

    cb2('end')
  }

  return (
    <ScoringComponent
      initMessages={myData.initMessages}
      background={myData.color}
      title={myData.name}
      threshold={myData.threshold}
      exerciseId={myData.id}
    >
      {(setScore, setPhase) => (
        <div className='ex70-container'>
          <RadioGroup options={myData.options['radio-1']} setSelected={setOption1} block={response} isTitle />
          <RadioGroup options={myData.options['radio-2']} setSelected={setOption2} block={response} />
          <DndComponent data={myData.options.dnd} />
          {!response && <button onClick={handleClick} disabled={selectedSpan.length < 2}>RESPONDER</button>}
          {response && <button onClick={() => handleEnd(setScore, setPhase)}>SIGUIENTE</button>}
        </div>
      )}
    </ScoringComponent>
  )
}

function RadioGroup ({ options, setSelected, isTitle, block }) {
  return (
    <div className={`ex70-radio-group ${isTitle && 'isTitle'}`}>
      {options.map((option, index) => (
        <InputRadio key={index} label={option.label} value={option.value} setSelected={setSelected} groupValue={option.groupValue} block={block} />
      ))}
    </div>
  )
}

function InputRadio ({ label, value, setSelected, groupValue, block }) {
  return (
    <label className='ex70-radio'>
      <input type='radio' name={groupValue} value={value} onChange={({ target }) => setSelected(target.value)} disabled={block} />
      <span>{label}</span>
    </label>
  )
}

export default Ex70
