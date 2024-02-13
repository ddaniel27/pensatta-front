import React, { useEffect } from 'react'
import NoScoringComponent from '../components/noScoringComponent'
import DndForComponent from '../components/dndForComponent'
import '../../../styles/ex10.css'
import useData from '../../../hooks/useData'

export default function Ex31 () {
  const { data } = useData('ex31')
  // eslint-disable-next-line no-unused-vars
  const [myData, setMyData] = React.useState({
    ...data
  })
  const [reset, setReset] = React.useState(false)
  const [start, setStart] = React.useState(false)
  const [finished, setFinished] = React.useState(false)

  const [optionsData, setOptionsData] = React.useState({})

  React.useLayoutEffect(() => {
    console.log(optionsData)
    if (reset) {
      setReset(false)
    }
  }, [optionsData])

  useEffect(() => {
    setMyData(data)
  }
  , [data])

  const handleClick = async () => {
    setStart(true)
    const audio = new Audio()
    const finalArr = []
    const audioArr = optionsData.map(opt => opt[1])
    audioArr.pop()

    for (let i = 0; i < optionsData[optionsData.length - 1][1]; i++) {
      finalArr.push(...audioArr)
    }
    finalArr.reverse()

    if (finalArr.length === 0) {
      setFinished(true)
      return
    }

    audio.src = `images/exercises/31/${finalArr.pop()}`
    audio.play()

    audio.addEventListener('ended', () => {
      if (finalArr.length) {
        audio.src = `images/exercises/31/${finalArr.pop()}`
        audio.play()
      } else {
        setFinished(true)
      }
    })
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
          <div className="maze-style">
            <DndForComponent data={myData} returnScore={setOptionsData} reset={reset} />
            <div className="info-box">
              {!start ? <p onClick={handleClick} /> : <div />}
              <span>{myData.playMusic}</span>
            </div>

            <div className="buttons-field">
              {optionsData.length > 0 && <button onClick={handleReset} className="restart">{myData.btnAgain}</button>}
              {finished && <button onClick={() => { setPhase('end') }}>{myData.btnEnd}</button>}
            </div>
          </div>
        )
      }
    </NoScoringComponent>
  )
}
