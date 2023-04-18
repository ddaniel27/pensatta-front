import { useState, useLayoutEffect } from 'react'
import NoScoringComponent from '../components/noScoringComponent'
import DndComponent from '../components/dndComponent'
import ImagenEditor from '../components/imageEditor65'
import data from './data.json'
import '../../../styles/ex10.css'

export default function Ex65 () {
  const [myData] = useState({
    ...data
  })
  const [start, setStart] = useState(false)
  const [reset, setReset] = useState(false)
  const [finished, setFinished] = useState(false)

  const [optionsData, setOptionsData] = useState({})

  useLayoutEffect(() => {
    if (reset) {
      setReset(false)
    }
  }, [optionsData])

  const handleClick = () => {
    document.querySelector('.maze-style').scrollTop = 0
    setStart(true)
  }

  const handleReset = () => {
    setStart(false)
    setFinished(false)
    setOptionsData({})
    setReset(true)
  }

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <div className='maze-style'>
            <DndComponent data={myData} returnScore={setOptionsData} reset={reset} />
            <ImagenEditor
              sequence={optionsData}
              startSequence={start}
              isFinished={setFinished}
              reset={reset}
              num={1}
            />
            <div className='buttons-field'>
              {optionsData.length > 0 && <button onClick={handleReset} className='restart'>REINTENTAR</button>}
              {!start && <button onClick={handleClick} disabled={!optionsData.length}>INICIAR</button>}
              {finished && <button onClick={() => { setPhase('end') }} disabled={!optionsData.length}>FINALIZAR</button>}
            </div>
          </div>
        )
      }
    </NoScoringComponent>
  )
}
