import React from "react"
import { DragDropContext } from "react-beautiful-dnd"
import DroppableComponent from "./droppableVonListComponent"
import "../../../styles/dndVonListComponent.css"


function DndVonListComponent({data, returnScore, block}) {
    const [myData, setmyData] = React.useState(data)

    React.useEffect(() => {
        if(returnScore){
            const finalReturn = myData.columns["column"].optionsIds
            returnScore(finalReturn)
        }
    }, [myData])

    React.useEffect(() => {
        if(block){
            setmyData(prevState=>({
                ...prevState,
                columns:{
                    ...prevState.columns,
                    "column":{
                        ...prevState.columns["column"],
                        "isDropDisabled":block
                    }
                }
            }))
        }
    }, [block])

    const onDragEnd = result => {
        const {destination, source, draggableId } = result
        if(!destination) { return }
        if (destination.droppableId === source.droppableId && destination.index === source.index) { return }
        
        const start = myData.columns[source.droppableId]
        const finish = myData.columns[destination.droppableId]

        if(start === finish) {
            const newoptionsIds = Array.from(start.optionsIds)
            newoptionsIds.splice(source.index, 1)
            newoptionsIds.splice(destination.index, 0, draggableId)
          
            const newColumn = {
              ...finish,
              optionsIds: newoptionsIds,
            }
          
            setmyData(prevState => ({
              ...prevState,
              columns: {
                ...prevState.columns,
                [newColumn.id]: newColumn,
              },
            }))
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="drag-drop-von-context">
                <DroppableComponent
                    column={myData.columns["column"]}
                    options={myData.columns["column"].optionsIds.map(optionId => myData.options[optionId])}
                />
            </div>
        </DragDropContext>
    )
}

export default React.memo(DndVonListComponent)