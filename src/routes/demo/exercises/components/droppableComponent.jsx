import React from "react"
import { Droppable } from "react-beautiful-dnd"
import DraggableComponent from "./draggableComponent"

export default function DroppableComponent({ column, options, returnData, isLoop }) {

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
        <div className={`droppable-container ${column.id} ${isLoop && "loop"}`}>
            <div className={`${isLoop ? "loop-top" :"header-list"}`}>
                <h2>{column.title}</h2>
            </div>
            {isLoop && <span className="block-top">Repetir <input type="text" onChange={handleChange} maxLength="2" name="forBlock" value={value}/> veces</span>}
            <Droppable droppableId={column.id} isDropDisabled={column.isDropDisabled}>
                {
                    (provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="droppable-list"
                        >
                            {options.map((option, index) => (
                                <DraggableComponent key={option.id} option={option} index={index} setOwnValue={setCurrValue}/>
                                )
                            )}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <p className={`${isLoop && "loop-bottom"}`}>{column.info}</p>
        </div>
    )
}