import React from "react"
import { Draggable } from "react-beautiful-dnd"

export default function DraggableComponent({ option, index }) {

    return (
        <Draggable draggableId={option.id} index={index} isDragDisabled={option.isDragDisabled}>
            {
                (provided) => (
                    <div
                        id={option.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="draggable-von-item">
                        <span>{option.text}</span>
                    </div>
                )
            }
        </Draggable>
    )
}