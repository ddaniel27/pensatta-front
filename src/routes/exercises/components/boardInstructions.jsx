import { useState, useEffect } from 'react'
import styles from '../../../styles/boardInstructions.module.css'
import { useTranslation } from 'react-i18next'

const Lines = ({ id, type, text, isComment, comment, idSelected, setIdSelected, isFinish, correct }) => {
  const handleClick = (event) => {
    if (!isFinish) {
      setIdSelected(event.target.id)
    }
  }

  if (type == 'inner') {
    return (
      <>
        <p key={`${id}p1`}>{'{'}</p>
        {text.map(line => (<Lines id={line.id}
          type={line.type}
          isComment={line.comments}
          text={line.text}
          comment={line.comment}
          idSelected={idSelected}
          setIdSelected={setIdSelected}
          isFinish={isFinish}
          correct={correct}/>))}
        <p key={`${id}p2`}>{'}'}</p>
      </>
    )
  }
  if (type == 'instruction') {
    return (<p key={id} ><span id={id} onClick={handleClick} className={!isFinish ? (idSelected == id ? styles['instruction-selected'] : '') : (correct == id ? styles['instruction-true'] : (idSelected == id ? styles['instruction-selected-false'] : ''))}>{text}</span>{isComment && <span className={styles['comments-instruction']}>{comment}</span>}</p>)
  }
  if (type == 'br') {
    return (<br key={id}/>)
  }
}

const Board = ({ data, setIsSelection, isFinish, setScore }) => {
  let found
  const findCorrect = (datalines) => {
    datalines.map(element => {
      if (element.type == 'inner') {
        return findCorrect(element.text)
      }
      if (!found) {
        if (element.error === true) {
          found = element
        }
      }
    })

    return found
  }

  const [idSelected, setIdSelected] = useState(null)
  const [correct, setCorrect] = useState(findCorrect(data.lines).id)

  useEffect(() => {
    if (idSelected != null) {
      setIsSelection(true)
    }
  }, [idSelected])

  useEffect(() => {
    if (isFinish == true) {
      setScore(correct == idSelected ? 1 : 0)
    }
  }, [isFinish])

  return (
    <>
      <div className={styles['problem-container']}>
        {data.problem}
      </div>
      <div className={styles['board-instructions']}>
        {data.lines.map(line => (<Lines id={line.id}
          type={line.type}
          text={line.text}
          isComment={line.comments}
          comment={line.comment}
          idSelected={idSelected}
          setIdSelected={setIdSelected}
          isFinish={isFinish}
          correct = {correct}
        />))}
        <br/>
        <p> &nbsp; &nbsp;Fin del código</p>
      </div>
    </>
  )
}

const BoardInstruction = ({ setScore, setPhase, data }) => {
  const { t } = useTranslation('textSelectComponent')
  const [isFinish, setIsFinish] = useState(false)
  const [isSelection, setIsSelection] = useState(false)

  const handleClick = () => {
    setIsFinish(true)
  }
  const handleFinish = () => {
    setPhase('end')
  }

  return (
    <>
      <div className={styles['game-container']}>
        <Board data={data} setIsSelection={setIsSelection} isFinish={isFinish} setScore={setScore}/>
      </div>
      {isSelection && !isFinish && <button onClick={handleClick}>{t('answer-button')}</button>}
      {isFinish && <button onClick={handleFinish}>{t('next-button')}</button>}

    </>
  )
}
export default BoardInstruction
