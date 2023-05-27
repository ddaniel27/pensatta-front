import React from 'react'
import NoScoringComponent from '../components/noScoringComponent'
import data from './data.json'
import '../../../styles/ex56.css'

export default function Ex55 () {
  const [myData] = React.useState({
    ...data,
    options: data.options.sort(() => 0.5 - Math.random()).slice(0, 4)
  })

  const [idx, setIdx] = React.useState(-1)
  const [text, setText] = React.useState('')
  const pRef = React.useRef(null)

  React.useEffect(() => {
    setText(myData.options[idx]?.code || '')
  }, [idx])

  React.useEffect(() => {
    if (pRef.current) {
      pRef.current.innerHTML = text
    }
  }, [text])

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} exerciseId={myData.id}>
      {
        (setPhase) => (
          <div className='ex56-play-area'>
            <div className='ex56-textarea-container'>
              <p ref={pRef} />
            </div>
            <div className='ex56-buttons-container'>
              {myData.options.map((option, index) => (
                <VisualCodeButton key={index} data={option} id={index} changeIdx={setIdx} />
              ))}
            </div>
            <button className='ex56-btn' onClick={() => setPhase('end')}>FINALIZAR</button>
          </div>
        )
      }
    </NoScoringComponent>
  )
}

function VisualCodeButton ({ data, id, changeIdx }) {
  const handleChange = () => {
    changeIdx(id)
  }
  return (
    <div className='ex56-btn-img'>
      <label>
        <input type='radio' name='ex56-radio' onChange={handleChange} />
        <img src={`./images/exercises/56/${data.src}`} alt='placeholder' />
      </label>
    </div>
  )
}
