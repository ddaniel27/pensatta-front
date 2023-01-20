import React from "react"
import { Droppable } from "react-beautiful-dnd"
import DraggableComponent2 from "./draggableComponent2"
import "../../../styles/dndComponent2.css"

export default function DroppableComponent2({ column, options, returnData, isLoop, res }) {

    const [ currValue, setCurrValue ] = React.useState({})
    const [value, setValue] = React.useState("")
    console.log(options)

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
        <div className={`droppable-container-2 ${column.id}-2 ${isLoop && "loop-2"}`}>
            <div className={`${isLoop ? "loop-top" :"header-list-2"}`}>
                <h3>{column.title}</h3>
            </div>
            {isLoop && <span className="block-top-2">Repetir <input type="text" onChange={handleChange} maxLength="2" name="forBlock" value={value}/> veces</span>}
            <Droppable droppableId={`${column.id}`} isDropDisabled={column.isDropDisabled}>
                {
                    (provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="droppable-list-2"
                        >
                            {options.map((option, index) => (
                                <DraggableComponent2 key={option.id} option={option} index={index} setOwnValue={setCurrValue} res={res}/>
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