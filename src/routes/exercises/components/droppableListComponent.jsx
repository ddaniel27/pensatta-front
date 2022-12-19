import React from "react"
import { Droppable } from "react-beautiful-dnd"
import DraggableListComponent from "./draggableListComponent"

export default function DroppableListComponent({ column, options, showCorrect = false }) {

    return (
        <div className={`droppable-list-container ${showCorrect && "showCorrect"}`}>
            <div className="title-list">
                <h2>{column.title}</h2>
            </div>
            <Droppable droppableId={column.id} isDropDisabled={column.isDropDisabled}>
                {
                    (provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="droppable-list-list"
                        >
                            {options.map((option, index) => (
                                <DraggableListComponent key={option.id} option={option} index={index}/>
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