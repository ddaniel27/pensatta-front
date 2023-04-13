import { useState, useEffect, memo } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import DroppableComponent from './droppableFor108'
import '../../../styles/dndFor108.css'

function DndVonListComponent ({ data, returnScore, block }) {
  const [myData, setmyData] = useState(data)

  useEffect(() => {
    if (returnScore) {
      const finalReturn = myData.columns.column.optionsIds
      returnScore(finalReturn)
    }
  }, [myData])

  useEffect(() => {
    if (block) {
      setmyData(prevState => ({
        ...prevState,
        columns: {
          ...prevState.columns,
          column: {
            ...prevState.columns.column,
            isDropDisabled: block
          }
        }
      }))
    }
  }, [block])

  const onDragEnd = result => {
    const { destination, source, draggableId } = result
    if (!destination) { return }
    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    const start = myData.columns[source.droppableId]
    const finish = myData.columns[destination.droppableId]

    if (start === finish) {
      const newoptionsIds = Array.from(start.optionsIds)
      newoptionsIds.splice(source.index, 1)
      newoptionsIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...finish,
        optionsIds: newoptionsIds
      }

      setmyData(prevState => ({
        ...prevState,
        columns: {
          ...prevState.columns,
          [newColumn.id]: newColumn
        }
      }))
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='drag-drop-108-context'>
        <DroppableComponent
          column={myData.columns.column}
          options={myData.columns.column.optionsIds.map(optionId => myData.options[optionId])}
        />
        <ContentComponent sequence={myData.sequence} />
      </div>
    </DragDropContext>
  )
}

function ContentComponent ({ sequence = [{}, {}, {}, {}] }) {
  return (
    <div className='drag-drop-108-content'>
      {sequence.map((item, index) => (
        <div className='drag-drop-108-content-item' key={index}>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  )
}

export default memo(DndVonListComponent)
