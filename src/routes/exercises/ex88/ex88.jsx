import React, { useEffect, useState } from 'react'
import DfdClickable from '../components/dfdClickable'
import BoardDfd from '../components/boardDfd'
import '../../../styles/ex88.css'
import NoScoringComponent from '../components/noScoringComponent'
import useData from '../../../hooks/useData'

const Ex88 = () => {
  const { data } = useData('ex88')
  const [myData, setmyData] = useState(data)
  const [column, setColumn] = useState(data.options[Math.floor(Math.random() * 10) + 1].column)
  const [targetId, setTargetId] = useState(0)

  useEffect(() => {
    setmyData(data)
    setColumn(data.options[Math.floor(Math.random() * 10) + 1].column)
  }, [data])

  const handleFinish = (setPhase) => {
    setPhase('end')
  }

  return (

    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <div className='dnd-context-container'>
            <div className='dfd-container'>
              <DfdClickable column={column} setTargetId={setTargetId} game={88} />
            </div>
            <BoardDfd targetId={targetId} column={column} />

            <div className='buttons-field'>
              <button onClick={() => { handleFinish(setPhase) }}>{myData.btnNext}</button>
            </div>
          </div>
        )
      }
    </NoScoringComponent>

  )
}
export default Ex88
