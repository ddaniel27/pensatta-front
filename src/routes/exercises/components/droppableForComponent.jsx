import React from "react"
import { Droppable } from "react-beautiful-dnd"
import DraggableForComponent from "./draggableForComponent"

export default function DroppableForComponent({ column, options, returnData }) {

    const [ currValue, setCurrValue ] = React.useState({})
    const [value, setValue] = React.useState("")

    React.useEffect(() => {
        if(returnData){
            returnData(currValue)
        }
    }, [currValue])

    const handleChange = ({target}) => {
        setValue(target.value)
    }

    React.useEffect(() => {
        setCurrValue(prevState => ({
            ...prevState,
            "forBlock": value
        }))
    }, [value])

    return (
        <div className={`droppable-container ${column.id}-loop`}>
            <div className={`loop-top`}>
                <h2>{column.title}</h2>
            </div>
            {column.id === "column-2" && <span className="block-top">Repetir <input type="text" onChange={handleChange} maxLength="2" name="forBlock" value={value}/> veces</span>}
            <Droppable droppableId={column.id} isDropDisabled={column.isDropDisabled}>
                {
                    (provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="droppable-list"
                        >
                            {options.map((option, index) => (
                                <DraggableForComponent key={option.id} option={option} index={index} setOwnValue={setCurrValue}/>
                                )
                            )}
                            {provided.placeholder}
                            <p className={`loop-bottom`}>{column.info}</p>
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}