import '../../../styles/circuitDisplay.css';

export default function CircuitDisplay({text='Dummy text', correct=false, showCorrect=false}){
    return(
        <div className={`circuit-display ${showCorrect && (correct ? 'correct' : 'incorrect')}`}>
            <div className="circuit-display-text">
                <p>{text}</p>
            </div>
        </div>
    )
}