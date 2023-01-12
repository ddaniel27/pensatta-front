import React, {useEffect, useState, useRef} from "react"
import cover from "/images/exercises/48/cardCover.svg"
import styles from "../../../styles/mazeCards.module.css"
import  "../../../styles/mazeCards.css"


const Card = ({card, handleChoice,flipped,disabled})=>{
   
    const handleClick = ()=>{
        if(!disabled){
            handleChoice(card)
        }

    }
    
    return (
        <div className="card" >
            <div className={flipped ? "cardFlipped" : ""}>   
                <svg className="frontCard" width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="180" height="180" rx="20" fill="#00635D"/>
                <rect x="21.5" y="21.5" width="137" height="137" rx="8.5" stroke="white" strokeWidth="3"/>
                <text x="50%" y="50%" textAnchor="middle" fill="#FFFFFF" fontSize={card.type == "name"? "100%": "180%"} fontFamily="Montserrat" dy=".3em" fontWeight="bold">{card.text}</text>
                </svg>
                <img className="backCard" src={cover} onClick={handleClick}></img>
            </div>
        </div>
    )
}

const BoardMazeCard = ({cards, handleChoice, choiceOne, choiceTwo, disabled}) =>{
    return(
        <div className={styles.cardGrid}>
            {
                cards.map((card) => (
                    <Card 
                        card={card} 
                        key={card.id} 
                        handleChoice={handleChoice} 
                        flipped={card === choiceOne || card === choiceTwo || card.isMatched }
                        disabled={disabled}/>                    
                ))
            }
        </div>
    )
    
}


const MazeCardsComponent = ({cardsArray, setPhase, setScore}) => {
    const [cards, setCards] = useState([])
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [numCorrects, setNumCorrects] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [isFinish, setIsFinish] = useState(false)
    const [time, setTime] = useState(180)
    const interval = useRef(null)

    const shuffleCards = ()=>{
        const shuffledCards = cardsArray.sort( () => Math.random() - 0.5).map( card => ({...card, isMatched : false}) )
        setCards(shuffledCards)
    }
    useEffect(()=>{
    
        interval.current = setInterval(
            ()=>{
                setTime(prevTime => {
                    if (prevTime - 1 <= 0 ){
                        setIsFinish(true)
                        clearInterval(interval.current)
                        setDisabled(true)
                    }
                    return prevTime-1
                })
            }, 1000  
        )

        shuffleCards()
    },[])

    const handleChoice = (card)=>{
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

    }

    useEffect( ()=>{
        
        if(choiceOne&&choiceTwo){
            setDisabled(true)
            if(choiceOne.pair === choiceTwo.pair && choiceOne.id != choiceTwo.id){
                setNumCorrects(prev => prev + 1)
                setCards(prevCards => {
                    return prevCards.map((card)=>{
                        if (card.pair === choiceOne.pair){
                            return {...card, isMatched:true}
                        }
                        return card
                    })
                })
                resetChoices()
            }else{
                setTimeout(()=>resetChoices(),1000)
            }
            
        }


    }, [choiceOne,choiceTwo])

    const handleFinish = ()=>{
        clearInterval(interval.current)
        setPhase("end")
        setScore(numCorrects)
        
    }

    const resetChoices = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setDisabled(false)
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }

    const finished =()=>{
        clearInterval(interval.current)
        return(
            <button onClick={handleFinish}> FINALIZAR</button>
        )
    }
   
    
    return(
        <>  
            <div className={styles.gameContainer}>
                <div className={styles.mazeContainer}>                
                    <BoardMazeCard cards={cards} handleChoice={handleChoice} choiceOne={choiceOne} choiceTwo={choiceTwo} disabled={disabled}/>
                    <div className={styles.pairsText}> Parejas encontradas: {numCorrects}/{cards.length/2} </div>
                </div>
                <div className={styles.timer}>{`${padTo2Digits(Math.floor(time / 60))} : ${padTo2Digits(time%60)}`}</div>  
            </div>         
            {isFinish || numCorrects*2 == cards.length?finished():<></>}
        </>
    )

}

export default MazeCardsComponent