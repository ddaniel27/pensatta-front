import React, { useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import PickerComponent from '../components/pickerComponent'
import DndComponent from '../components/dndComponent'
import '../../../styles/ex10.css'
import useData from '../../../hooks/useData'

export default function Ex38 () {
  const { data } = useData('ex38')
  // eslint-disable-next-line no-unused-vars
  const [myData, setMyData] = React.useState({
    ...data,
    matrices: data.matrices.sort(() => 0.5 - Math.random()).slice(0, 1)
  })
  const [start, setStart] = React.useState(false)
  const [reset, setReset] = React.useState(false)
  const [finished, setFinished] = React.useState(false)

  const [optionsData, setOptionsData] = React.useState({})

  useEffect(() => {
    setMyData({
      ...data,
      matrices: data.matrices.sort(() => 0.5 - Math.random()).slice(0, 1)
    })
  }, [data])

  React.useLayoutEffect(() => {
    if (reset) {
      setReset(false)
    }
  }, [optionsData])

  const handleClick = () => {
    document.querySelector('.maze-style').scrollTop = 0
    setStart(true)
  }

  const handleReset = () => {
    setReset(true)
    setStart(false)
    setFinished(false)
    setOptionsData({})
  }

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <div className="maze-style">
            <DndComponent data={myData} returnScore={setOptionsData} reset={reset} />
            <PickerComponent matrix={myData.matrices[0]}
              recorridoMain={optionsData}
              imgPath={myData.imgPath}
              collectPath={myData.collectPath}
              pos={myData.initPos}
              start={start}
              isFinished={setFinished}
              setScore={setScore}
              piecesCounter={myData.maxPieces}
              reset={reset}
            />

            <div className="buttons-field">
              {optionsData.length > 0 && <button onClick={handleReset} className="restart">{myData.btnAgain}</button>}
              {!start && <button onClick={handleClick} disabled={!optionsData.length}>{myData.btnStart}</button>}
              {finished && <button onClick={() => { setPhase('end') }} >{myData.btnEnd}</button>}
            </div>
          </div>
        )
      }
    </ScoringComponent>
  )
}
