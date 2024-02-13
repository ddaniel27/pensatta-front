import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import DfdComponent from '../components/dfdComponent'
import '../../../styles/ex20.css'
import NoScoringComponent from '../components/noScoringComponent'
import useData from '../../../hooks/useData'

const Ex20 = () => {
  const { data } = useData('ex20')
  const [game, setGame] = useState(Math.floor(Math.random() * 4) + 1)
  const [myData, setmyData] = useState(data)
  const [column1, setColumn1] = useState(data.options[game].column1)
  const [column2, setColumn2] = useState(data.options[game].column2)

  useEffect(() => {
    setmyData(data)
  }, [data])

  const onDragEnd = (result) => {
    if (!result.destination) return
    if (result.source.index === result.destination.index &&
            result.source.droppableId === result.destination.droppableId) return
    const column2ObjId = parseInt(result.destination.droppableId.replace('drag', ''))
    const draggableSelId = parseInt(result.draggableId.replace('element', ''))
    const draggableSelObj = column1.find(x => x.id == draggableSelId)
    const newColumn2 = column2.map(obj => {
      if (column2ObjId != obj.id) return obj
      return { ...obj, type: `drag${draggableSelObj.type}`, text: draggableSelObj.text }
    })
    setColumn2(newColumn2)
  }
  const handleFinish = (setPhase) => {
    setPhase('end')
  }

  return (

    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <div className="dndContextContainer">
            <DragDropContext onDragEnd={onDragEnd}>
              <DfdComponent data={myData} column1={column1} column2={column2}/>
            </DragDropContext>
            <div className="buttons-field">
              <button onClick={() => { handleFinish(setPhase) }}>{myData.btnNext}</button>
            </div>
          </div>
        )
      }
    </NoScoringComponent>

  )
}
export default Ex20
