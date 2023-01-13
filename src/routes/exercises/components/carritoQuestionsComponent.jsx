import { useState, useEffect } from "react";
import carrito from "/images/exercises/64/carrito.svg"
import styles from "../../../styles/carritoQuestions.module.css"
import pista from "/images/exercises/64/pista.svg"

const Pista = ({corrects})=>{
    return(
        <div className={styles.pista}>
            <img src={carrito} className={styles[`carrito${corrects}`]}></img>
        </div>
    )

}

const Card = ({id, question, value})=>{
    
    return (
        <div className={styles.card}>
            <div className={styles.cardSentence}>{question}</div>
            <div className={styles.cardButtonsContainer}>
                <div className={styles.cardButton}>F</div>
                <div className={styles.cardButton}>V</div>
            </div>
        </div>
    )
}

const GridCards = ()=>{

}

const CarritoQuestionsComponent = ({data})=>{
    const [questions, setQuestions] = useState(data.questions)

    const sortQuestions = ()=>{
        const shuffleQuestions = questions.sort( () => Math.random() - 0.5).map(
            question=>({
                ...question, isSelected: false
            })
        )
        setQuestions(shuffleQuestions)
    }

    return(
        <div>
            <Pista corrects={4} />
        </div>
    )

}

export default CarritoQuestionsComponent