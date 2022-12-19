import React from "react"
import "../../../../styles/uniqueOption.css"

function UniqueOption({options, isCorrectOption, enableButton, title, showCorrect, uniqueName}) {

    const [selected, setSelected] = React.useState({classList:{add:(e)=>{}}})


    React.useEffect(()=>{
            selected.classList.add('selected')
    },[selected])

    React.useEffect(()=>{
        const inputsOpts = []
        document.querySelectorAll('.multiple-option-item').forEach(label => inputsOpts.push(label.childNodes[0]))
        inputsOpts.forEach(input => { input.checked = false })
        selected.classList.add('selected')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showCorrect])

    const handleClick = ({target},option) => {
        if(showCorrect){
            return
        }
        if(isCorrectOption){
            isCorrectOption(option.isCorrect);
        }
        if(enableButton){
            enableButton(false); 
        }
        document.querySelectorAll('.multiple-option-item').forEach(label => label.classList.remove('selected'))
        setSelected(target.parentNode)
    }

    return(
        <div className="multiple-option">
            <h2>{title}</h2>
            {
                options
                    .map((option, index) =>
                    <label className={`multiple-option-item ${showCorrect && "show-value"}`} key={index}> 
                        <input type="radio" name={`${uniqueName ? uniqueName : "multioption"}`} value={option.isCorrect} disabled={showCorrect} />
                        <span onClick={(e)=>{handleClick(e,option)}}>{option.text}</span>
                    </label>
                    )
            }
        </div>
    )
}

export default React.memo(UniqueOption)