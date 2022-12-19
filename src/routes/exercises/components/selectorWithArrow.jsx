import React from "react"
import "../../../styles/selectorWithArrow.css"

export default function SelectorWithArrow({title="Field", options=[], min=0, max=3, initSelected=0, returnValue}){

    const [selected, setSelected] = React.useState(initSelected)

    React.useEffect(()=>{
        if(returnValue){
            returnValue({value:options[selected], index:selected})
        }
    }, [selected])

    const handleIncrement = () => {
        setSelected(selected < max ? selected + 1 : min)
    }

    const handleDecrement = () => {
        setSelected(selected > min ? selected - 1 : max)
    }

    return(
        <div className="selector-field-item">
            <h2>{title}</h2>
            <span className="arrow-select reverse" value={title} onClick={handleDecrement}></span>
            <span className="current-value">{options[selected]}</span>
            <span className="arrow-select" value={title} onClick={handleIncrement}></span>            
        </div>
    )
}