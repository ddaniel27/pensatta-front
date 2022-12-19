import React from "react"
import { Draggable } from "react-beautiful-dnd"
import "../../../styles/dndComponent.css"

export default function DraggableComponent({ option, index, setOwnValue }) {

    const [value, setValue] = React.useState(option.value || "")

    const handleChange = ({target}) => {
        setValue(target.value)
    }

    React.useEffect(() => {
        if(setOwnValue) {
            setOwnValue(prevState => ({
                ...prevState,
                [option.id]: value
            }))
        }
    }, [value])

    return (
        <Draggable draggableId={option.id} index={index} isDragDisabled={option.isDragDisabled}>
            {
                (provided, snapshot, rubric) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="draggable-item">
                        <span>{option.text}</span>
                        {
                            option.hasInput && 
                                option.type === "text" &&
                                <input onChange={handleChange} type="text" disabled={rubric.source.droppableId === "column-1"} maxLength="2" value={value} />
                        }
                        {
                            option.hasInput && 
                                option.type === "select" &&
                                <select onChange={handleChange} defaultValue={"0"} disabled={rubric.source.droppableId === "column-1"}>
                                    <option value="0" hidden disabled>Select</option>
                                    {option.options.map((opt,idx) => <option key={idx}>{opt}</option>)}
                                </select>
                        }

                    </div>
                )

            }
        </Draggable>
    )
}