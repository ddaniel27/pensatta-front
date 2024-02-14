import React, { useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import DndListComponent from '../components/dndListComponent'
import '../../../styles/ex17.css'
import useData from '../../../hooks/useData'

export default function Ex17 () {
  const { data } = useData('ex58')
  // eslint-disable-next-line no-unused-vars
  const [myData, setMyData] = React.useState({
    ...data,
    selectedVariation: data.variations.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)[0]
  })
  const [reset, setReset] = React.useState(false)
  const [showCorrect, setShowCorrect] = React.useState(false)

  const [optionsData, setOptionsData] = React.useState({})

  useEffect(() => {
    setMyData({
      ...data,
      selectedVariation: data.variations.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)[0]
    })
  }, [data])

  React.useLayoutEffect(() => {
    if (reset) {
      setReset(false)
    }
  }, [optionsData])

  const handleClick = (cb1) => {
    document.querySelector('.maze-list-style').scrollTop = 0
    const lists = document.querySelectorAll('.droppable-list-container')
    setShowCorrect(true)
    let flag = true
    for (let i = 0; i < myData.selectedVariation.sequence.length; i++) {
      lists[i].style.backgroundColor = '#008E86'
      if (optionsData[i] !== myData.selectedVariation.sequence[i]) {
        flag = false
        lists[i].style.backgroundColor = '#fa5833'
      }
    }
    if (flag) {
      cb1(1)
    } else {
      cb1(0)
    }
  }

  const handleReset = () => {
    setOptionsData({})
    setReset(true)
  }

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <div className="maze-list-style">
            <DndListComponent data={myData.selectedVariation} returnScore={setOptionsData} reset={reset} showCorrect = {showCorrect} />

            <div className="buttons-field">
              {optionsData.length > 0 && !showCorrect && <button onClick={handleReset} className="restart">{myData.btnAgain}</button>}
              {showCorrect ? <button onClick={() => { setPhase('end') }}>{myData.btnEnd}</button> : <button onClick={() => { handleClick(setScore) }}>{myData.btnStart}</button>}
            </div>
          </div>
        )
      }
    </ScoringComponent>
  )
}
