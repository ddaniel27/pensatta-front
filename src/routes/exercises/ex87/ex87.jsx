import React, { useEffect, useState } from 'react'
import data from './data.json'
import DfdClickable from '../components/dfdClickable'
import BoardDfd from '../components/boardDfd'
import '../../../styles/ex87.css'
import NoScoringComponent from '../components/noScoringComponent'
import useData from '../../../hooks/useData'

const Ex87 = () => {
  const { data } = useData('ex87')
  const [myData, setmyData] = useState(data)
  const [column, setColumn] = useState(data.options[Math.floor(Math.random() * 10) + 1].column)
  const [targetId, setTargetId] = useState(0)

  const handleFinish = (setPhase) => {
    setPhase('end')
  }

  useEffect(() => {
    setmyData(data)
    setColumn(data.options[Math.floor(Math.random() * 10) + 1].column)
  }, [data])

  return (

    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <div className="dnd-context-container-game-87">
            <DfdClickable column = {column} setTargetId={setTargetId} game={87}/>
            <BoardDfd targetId={targetId} column ={column}/>

            <div className="buttons-field">
              <button onClick={() => { handleFinish(setPhase) }}>{myData.btnNext}</button>
            </div>
          </div>
        )
      }
    </NoScoringComponent>

  )
}
export default Ex87
