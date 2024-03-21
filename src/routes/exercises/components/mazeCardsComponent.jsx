import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import cover from '/images/exercises/48/cardCover.svg'
import styles from '../../../styles/mazeCards.module.css'
import '../../../styles/mazeCards.css'

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }
  const [newText, setNewText] = useState([])

  useEffect(() => {
    let text = []
    if (card.text.length > 10 && card.text.split(' ').length == 1) {
      text.push(card.text.substring(0, 10) + '...')
      text.push(card.text.substring(10, card.text.length))
      return setNewText(text)
    }
    if (card.text.length > 10) {
      text = card.text.split(' ').reduce((acc, word) => {
        if (acc[acc.length - 1].length + word.length < 12) {
          acc[acc.length - 1] += ` ${word}`
        } else {
          acc.push(word)
        }
        return acc
      }, [''])
      return setNewText(text)
    }
    return setNewText([card.text])
  }, [])

  return (
    <div className="card" >
      <div className={flipped ? 'cardFlipped' : ''}>
        {!card.isImage
          ? (<svg className="frontCard" width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="180" height="180" rx="20" fill="#00635D"/>
            <rect x="21.5" y="21.5" width="137" height="137" rx="8.5" stroke="white" strokeWidth="3"/>
            <text x="50%" y={newText.length > 5 ? '20%' : '30%'} textAnchor="middle" fill="#FFFFFF" fontSize={card.type == 'name' ? '100%' : '180%'} fontFamily="Montserrat" dy=".3em" fontWeight="bold">
              {newText.map((line, index) => (
                <tspan x="50%" dy={index == 0 ? 0 : '1.2em'} key={index}>{line}</tspan>
              ))}
            </text>
          </svg>)
          : <div className="frontCard">
            <img x="50%" y="50%" width="180" height="180" src={card.text} />
          </div>
        }
        <img className="backCard" src={cover} onClick={handleClick} />
      </div>
    </div>
  )
}

const BoardMazeCard = ({ cards, handleChoice, choiceOne, choiceTwo, disabled }) => {
  return (
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

const MazeCardsComponent = ({ cardsArray, setPhase, setScore }) => {
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [numCorrects, setNumCorrects] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [time, setTime] = useState(180)
  const interval = useRef(null)
  const { t } = useTranslation('mazeCardsComponent')

  const shuffleCards = () => {
    const shuffledCards = cardsArray.sort(() => Math.random() - 0.5).map(card => ({ ...card, isMatched: false }))
    setCards(shuffledCards)
  }
  useEffect(() => {
    interval.current = setInterval(
      () => {
        setTime(prevTime => {
          if (prevTime - 1 <= 0) {
            setIsFinish(true)
            clearInterval(interval.current)
            setDisabled(true)
          }
          return prevTime - 1
        })
      }, 1000
    )

    shuffleCards()
  }, [])

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.pair === choiceTwo.pair && choiceOne.id != choiceTwo.id) {
        setNumCorrects(prev => prev + 1)
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.pair === choiceOne.pair) {
              return { ...card, isMatched: true }
            }
            return card
          })
        })
        resetChoices()
      } else {
        setTimeout(() => resetChoices(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const handleFinish = () => {
    clearInterval(interval.current)
    setPhase('end')
    setScore(numCorrects)
  }

  const resetChoices = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
  }

  function padTo2Digits (num) {
    return num.toString().padStart(2, '0')
  }

  const finished = () => {
    clearInterval(interval.current)
    return (
      <button onClick={handleFinish}>{t('finish-button')}</button>
    )
  }

  return (
    <>
      <div className={styles.gameContainer}>
        <div className={styles.mazeContainer}>
          <BoardMazeCard cards={cards} handleChoice={handleChoice} choiceOne={choiceOne} choiceTwo={choiceTwo} disabled={disabled}/>
          <div className={styles.pairsText}>{t('pairs')}{numCorrects}/{cards.length / 2} </div>
        </div>
        <div className={styles.timer}>{`${padTo2Digits(Math.floor(time / 60))} : ${padTo2Digits(time % 60)}`}</div>
      </div>
      {isFinish || numCorrects * 2 == cards.length ? finished() : <></>}
    </>
  )
}

export default MazeCardsComponent
