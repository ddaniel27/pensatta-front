import React from "react"
import { Droppable } from "react-beautiful-dnd"
import DraggableComponent from "./draggableVonListComponent"

export default function DroppableVonListComponent({ column, options }) {

    return (
        <div className={`droppable-von-container`}>
            <h2>{column.title}</h2>
            <Droppable droppableId={column.id} isDropDisabled={column.isDropDisabled}>
                {
                    (provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="droppable-von-list"
                        >
                            {options.map((option, index) => (
                                <DraggableComponent 
                                    key={option.id}
                                    option={option}
                                    index={index}
                                />
                                )
                            )}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}