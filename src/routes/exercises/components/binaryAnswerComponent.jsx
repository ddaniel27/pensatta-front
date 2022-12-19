import React from "react"
import "../../../styles/binaryAnswerComponent.css"


function BinaryAnswerComponent({ options, showCorrect, returnScore, indexGlobal=0 }) {

    const [selected, setSelected] = React.useState({classList:{add:(e)=>{}}})

    React.useEffect(()=>{
        selected.classList.add('selected')
    },[selected])

    React.useEffect(()=>{
        const inputsOpts = []
        document.querySelectorAll('.binary-item').forEach(label => inputsOpts.push(label.childNodes[0]))
        inputsOpts.forEach(input => { input.checked = false })
        selected.classList.add('selected')
    },[showCorrect])

    const handleChange = (isCorrect, {target}) => {
        if(showCorrect){ return }
        if(target.checked){ returnScore(isCorrect, indexGlobal) }
        document.querySelectorAll('.binary-item').forEach(label => label.classList.remove('selected'))
        setSelected(target.parentNode)
    }

    return(
        <div className="binary-option">
            {
                options
                    .map((option, index) =>
                        <label className={`binary-item ${showCorrect && "show-value"} ${option.isCorrect ? "right" : "wrong"} ${option.name}`} key={index}> 
                            <input type="radio" name={`binary-${indexGlobal}`} disabled={showCorrect} onChange={(e)=>{handleChange(option.isCorrect,e)}} value={option.isCorrect} />
                            <p></p>
                        </label>
                    )
            }
        </div>
    )
}

export default React.memo(BinaryAnswerComponent)