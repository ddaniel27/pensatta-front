import React from "react"
import { Draggable } from "react-beautiful-dnd"

export default function DraggableListComponent({ option, index }) {

    return (
        <Draggable draggableId={option.id} index={index} isDragDisabled={option.isDragDisabled}>
            {
                (provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="draggable-list-item">
                        <img className="card" src={`./images/exercises/${option.src}`}/>

                    </div>
                )

            }
        </Draggable>
    )
}