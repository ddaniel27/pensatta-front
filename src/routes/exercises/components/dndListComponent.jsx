import React from "react"
import { DragDropContext } from "react-beautiful-dnd"
import DroppableListComponent from "./droppableListComponent"
import "../../../styles/dndListComponent.css"


export default function DndListComponent({data, returnScore, reset, showCorrect = false}) {
    const [myData, setmyData] = React.useState(data)

    React.useEffect(() => {
        if(returnScore){
            let returnData = Object.values(myData.columns).map(column => column.optionsIds[0])
            returnScore(returnData)
        }

    }, [myData])

    React.useEffect(() => {
        if(reset){
            setmyData(data)
        }
    }, [reset])

    const onDragEnd = result => {
        const {destination, source, draggableId } = result
        if(!destination) { return }
        if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

        const start = myData.columns[source.droppableId]
        const finish = myData.columns[destination.droppableId]

       
        const startOptionsIds = Array.from(start.optionsIds)
        let aux = startOptionsIds.splice(source.index, 1)

        const finishOptionsIds = Array.from(finish.optionsIds)
        let aux2 = finishOptionsIds.splice(destination.index, 1)

        startOptionsIds.splice(destination.index, 0, aux2[0])
        finishOptionsIds.splice(source.index, 0, aux[0])

        const newStart = {
            ...start,
            optionsIds: startOptionsIds
        }

        const newFinish = {
            ...finish,
            optionsIds: finishOptionsIds
        }

        setmyData(prevState=>(
            {...prevState,
                columns:{
                ...prevState.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
                }
            }
        ))
        
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="drag-drop-list-context">
                <DroppableListComponent showCorrect={showCorrect} column={myData.columns["column-1"]} options={myData.columns["column-1"].optionsIds.map(optionId => myData.options[optionId])} />
                <DroppableListComponent showCorrect={showCorrect} column={myData.columns["column-2"]} options={myData.columns["column-2"].optionsIds.map(optionId => myData.options[optionId])} />
                <DroppableListComponent showCorrect={showCorrect} column={myData.columns["column-3"]} options={myData.columns["column-3"].optionsIds.map(optionId => myData.options[optionId])} />
            </div>
        </DragDropContext>
    )
}