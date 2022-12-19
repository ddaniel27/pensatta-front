import React from "react"
import "../../../../styles/uniqueOption.css"

function MultipleOption({options, isCorrectOption, enableButton, title, showCorrect, maxOptions}) {

    const [selected, setSelected] = React.useState([])
    React.useEffect(()=>{
        selected.forEach( tag => tag.classList.add('selected'))
    },[selected])


    React.useEffect(()=>{
        const inputsOpts = []
        document.querySelectorAll('.multiple-option-item').forEach(label => inputsOpts.push(label.childNodes[0]))
        inputsOpts.forEach(input => { input.checked = false })
        selected.forEach( tag => tag.classList.add('selected'))
        if(!showCorrect){
            selected.forEach( tag => tag.classList.remove('selected'))
            setSelected([])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showCorrect])

    const handleChange = ({target},option) => {
        if(showCorrect){ return }
        if(enableButton){ enableButton(false) }

        const selectedLabel = [...document.querySelectorAll('.multiple-option-item.selected')]
        if(target.parentNode.classList.contains('selected')){
            isCorrectOption(prevStatus=>{
                const {[target.parentNode.title]: value, ...rest} = prevStatus
                return rest
            })
            target.parentNode.classList.remove('selected')
            setSelected(selectedLabel.filter(label => label.title !== target.parentNode.title))
        }
        if(selectedLabel.length >= maxOptions){
            target.checked = false
            target.parentNode.classList.remove('selected')
        }else if(target.checked){
            enableButton(false)
            isCorrectOption(prevStatus=>{
                return {
                    ...prevStatus,
                    [target.parentNode.title]: option.isCorrect
                }
            })
            target.parentNode.classList.add('selected')
            setSelected([...selected, target.parentNode])
        }
    }

    return(
        <div className="multiple-option">
            <h2>{title}</h2>
            {
                options
                    .map((option, index) =>
                    <label className={`multiple-option-item ${showCorrect && "show-value"}`} key={index} title={index} id={`multiple-${index}`}> 
                        <input type="checkbox" onChange={(e)=>{handleChange(e,option)}} name="multioption" value={option.isCorrect} disabled={showCorrect} />
                        <span >{option.text}</span>
                    </label>
                    )
            }
        </div>
    )
}

export default React.memo(MultipleOption)