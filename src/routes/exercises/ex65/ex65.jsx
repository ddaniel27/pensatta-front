import { useState, useLayoutEffect, useEffect } from 'react'
import NoScoringComponent from '../components/noScoringComponent'
import DndComponent from '../components/dndComponent'
import ImagenEditor from '../components/imageEditor65'
import '../../../styles/ex10.css'
import useData from '../../../hooks/useData'

export default function Ex65 () {
  const { data } = useData('ex65')
  const [myData, setMyData] = useState({
    ...data,
    options: data.variations.sort(() => Math.random() - 0.5).slice(0, 1)[0]
  })
  const [start, setStart] = useState(false)
  const [reset, setReset] = useState(false)
  const [finished, setFinished] = useState(false)

  const [optionsData, setOptionsData] = useState({})

  useEffect(() => {
    setMyData({
      ...data,
      options: data.variations.sort(() => Math.random() - 0.5).slice(0, 1)[0]
    })
  }, [data])

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
              num={myData.options.img}
            />
            <div className='buttons-field'>
              {optionsData.length > 0 && <button onClick={handleReset} className='restart'>{myData.btnAgain}</button>}
              {!start && <button onClick={handleClick} disabled={!optionsData.length}>{myData.btnStart}</button>}
              {finished && <button onClick={() => { setPhase('end') }} disabled={!optionsData.length}>{myData.btnEnd}</button>}
            </div>
          </div>
        )
      }
    </NoScoringComponent>
  )
}
