import '../../../styles/circuitCard.css'

export default function CircuitCard({text = 'dummy text to test', group = 'test-group-circuit-card', disabled=false, reverse=false, correct=false, isCorrect}){

    const handleChange = ({target}) =>{
        if(target.checked){
            document.querySelectorAll(`input[name="${group}"]`).forEach(input => {
                input.parentNode.parentNode.classList.remove('selected')
                input.checked = false
            })
            target.checked = true
            target.parentNode.parentNode.classList.add('selected')
            if(isCorrect){ isCorrect(correct) }
        }
    }


    return(
        <div className={`circuit-card ${reverse && 'circuit-card-reverse'}`}>
            <label className={`circuit-card-text ${reverse && 'circuit-card-text-reverse'}`}>
                <input type="radio" name={group} onChange={handleChange} disabled={disabled} />
                <span>{text}</span>
            </label>
        </div>
    )
}