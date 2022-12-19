import React from "react"
import "../../../../styles/imageSelector.css"

export default function ImageSelector({options=[], setCurrentValue, setCurrentImage, keyIndex=0, disabled=false, hasBackground=true}) {

    const handleChange = ({target}, option) => {
        if(target.checked){
            if(setCurrentValue){
                setCurrentValue( option.value )
            }
            if(setCurrentImage){
                setCurrentImage( option.image )
            }
        }
    }

    return(
        <div className="image-selector-component">
            {options.map((option, index)=>
                (
                    <label key={index} className="image-selector-option">
                        <input type="radio" name={`image-selector-${keyIndex}`} value={option.value} onChange={(e)=>{handleChange(e,option)}} hidden disabled={disabled}/>
                        <p style={{backgroundImage:`url(${option.image})`}} className={`${hasBackground && 'show-background'}`}></p>
                    </label>
                ))
            }
        </div>
    )
}