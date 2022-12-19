import React from "react"
import { DragDropContext } from "react-beautiful-dnd"
import DroppableComponent from "./droppableComponent"
import "../../../styles/dndComponent.css"


export default function DndComponent({data, returnScore, reset}) {
    const [myData, setmyData] = React.useState(data)
    const [counter, setCounter] = React.useState(0)
    const [optionsData, setOptionsData] = React.useState({})

    React.useEffect(() => {
        if(returnScore){
            const finalReturn = myData.columns["column-2"].optionsIds.map( id => ([myData.options[id].key, optionsData[id]]))
            if(myData.isLoop){
                finalReturn.push(["forBlock", optionsData["forBlock"]])
            }
            returnScore(finalReturn)
        }

    }, [optionsData, myData])

    React.useEffect(() => {
        if(reset){
            setmyData(data)
            setCounter(0)
            setOptionsData({})
        }
    }, [reset])

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
        }else{
            const startOptionsIds = Array.from(start.optionsIds)
            let aux = startOptionsIds.splice(source.index, 1)
            const newAux = aux[0] + `${counter}`
            setCounter(counter + 1)
            startOptionsIds.splice(source.index, 0, newAux)

            const newStart = {
            ...start,
            optionsIds: startOptionsIds
            }

            const finishOptionsIds = Array.from(finish.optionsIds)
            finishOptionsIds.splice(destination.index, 0, draggableId)
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
                    },
                    options:{
                        ...prevState.options,
                        [newAux]: {
                            ...prevState.options[aux[0]],
                            id: newAux
                        }
                    }
                }
            ))
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="drag-drop-context">
                {
                    !myData.isSingle ? 
                        <DroppableComponent column={myData.columns["column-2"]} options={myData.columns["column-2"].optionsIds.map(optionId => myData.options[optionId])} returnData={setOptionsData} />:
                    <>
                        <DroppableComponent column={myData.columns["column-1"]} options={myData.columns["column-1"].optionsIds.map(optionId => myData.options[optionId])} />
                        <DroppableComponent column={myData.columns["column-2"]} options={myData.columns["column-2"].optionsIds.map(optionId => myData.options[optionId])} returnData={setOptionsData} isLoop={myData.isLoop} />
                    </>
                }
            </div>
        </DragDropContext>
    )
}