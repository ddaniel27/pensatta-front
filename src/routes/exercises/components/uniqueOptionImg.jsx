import React from "react"
import "../../../styles/uniqueOptionImg.css"

export default function uniqueOptionImg({ path, options, returnScore, disabled }){

    const handleChange = ({target}) => {
        if(target.checked){
            returnScore(target.value)
        }
    }

    return(
        <div className="uniqueOptionImg">
            {
                options.map((option, index) => {
                    return(
                        <label key={index} className="img-item">
                            <input type="radio" name="uniqueOptionImg" value={option.value} onChange={handleChange} disabled={disabled} />
                            <p className={`uni-opt-img-${option.value}`}></p>
                            <img src={`images/exercises/${path}/${option.img}`} alt={option.value} />
                        </label>
                    )
                })
            }
        </div>
    )

}