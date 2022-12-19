import React from "react"

import Battery from "./battery"
import CircuitCard from "./circuitCard"
import CircuitDisplay from "./circuitDisplay"

import '../../../styles/circuit.css'
export default function Circuit({book, left, right, showValue=false, isCorrect}){

    const [site, setSite] = React.useState(false)
    const [author, setAuthor] = React.useState(false)

    React.useEffect(()=>{
        if(isCorrect){
            isCorrect((site && author))
        }
    },[site,author])

    return(
        <div className="circuit">
            <div className="circuit-components-container">
                <div className="battery-container">
                    <Battery />
                </div>
                <div className="left-circuit-cards-container">
                    {
                        left.map((card, index) => (
                            <CircuitCard key={index} text={card.text} group={'left-circuit-card-group'} correct={card.correct} isCorrect={setSite} disabled={showValue} />
                        ))
                    }
                </div>
                <div className="right-circuit-cards-container">
                    {
                        right.map((card, index) => (
                            <CircuitCard key={index} text={card.text} group={'right-circuit-card-group'} correct={card.correct} isCorrect={setAuthor} disabled={showValue} reverse={true} />
                        ))
                    }
                </div>
                <div className="circuit-display-container">
                    <CircuitDisplay text={book} showCorrect={showValue} correct={(author && site)} />
                </div>
            </div>
        </div>
    )
}