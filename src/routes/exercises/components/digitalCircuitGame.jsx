import and from '/images/exercises/90/and.svg'
import or from '/images/exercises/90/or.svg'
import xor from '/images/exercises/90/xor.svg'
import nand from '/images/exercises/90/nand.svg'
import nor from '/images/exercises/90/nor.svg'
import { useState, useRef } from 'react'
import styles from '../../../styles/digitalCircuit.module.css'
import { useTranslation } from 'react-i18next'

const DigitalCircuitGame = ({ setPhase, setScore, texts }) => {
  const { t } = useTranslation('digitalCircuitGame')
  const randomChoice = (array, n) => {
    const randomIndexes = []
    while (randomIndexes.length < n) {
      const randomIndex = Math.floor(Math.random() * array.length)
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex)
      }
    }
    const randomElements = randomIndexes.map((index) => array[index])
    return randomElements
  }
  const gates = ['and', 'or', 'xor', 'nand', 'nor']
  const inputs = useRef(Array(4).fill(0).map(_ => Math.floor(Math.random() * 2)))
  const [answer, setAnswer] = useState(null)
  const [response, setResponse] = useState(null)
  const [isFinish, setIsFinish] = useState(false)
  const firstGates = useRef(randomChoice(gates, 2))
  const secondGates = useRef(randomChoice(gates, 1))
  const gatesFunctions = {
    and: (a, b) => a && b,
    or: (a, b) => a || b,
    xor: (a, b) => a !== b,
    nand: (a, b) => !(a && b),
    nor: (a, b) => !(a || b)
  }
  const gatesImages = {
    and: <img src={and} alt='and'/>,
    or: <img src={or} alt='or'/>,
    xor: <img src={xor} alt='xor'/>,
    nand: <img src={nand} alt='nand'/>,
    nor: <img src={nor} alt='nor'/>
  }
  const handleResponse = () => {
    const firstResult = gatesFunctions[firstGates.current[0]](inputs.current[0], inputs.current[1])
    const secondResult = gatesFunctions[firstGates.current[1]](inputs.current[2], inputs.current[3])
    const finalResult = gatesFunctions[secondGates.current[0]](firstResult, secondResult)
    setResponse(finalResult == answer)
    setIsFinish(true)
  }

  const handleFinish = () => {
    setPhase('end')
    setScore(response ? 1 : 0)
  }
  return (
    <>
      <div className={styles['game-container']}>
        <div className={styles['first-gate-text']}>
          {texts[firstGates.current[0]]}
        </div>
        <div className={styles['io-gates-container']}>
          <div className={styles['inputs-container']}>
            {
              inputs.current.map((input, index) => {
                return (
                  <div key={index} className={styles['input-container']}>
                    {
                      input
                    }
                  </div>
                )
              })
            }
          </div>
          <div className={styles['first-gates-container']}>
            {
              firstGates.current.map((gate, index) => (<div className={styles['first-gate']} key={index}>{gatesImages[gate]}</div>))
            }
          </div>
          <div className={styles['second-gates-container']}>
            {
              <div className={styles['second-gate']}>{gatesImages[secondGates.current[0]]}</div>
            }
          </div>
          <div className={styles['output-container']}>
            {t('output')}
            <div className={`${styles.output} ${answer && styles['output-selected']} ${answer && isFinish ? (response ? styles['output-correct'] : styles['output-wrong']) : ''}`} onClick={() => !isFinish && setAnswer(1)}>1</div>
            <div className={`${styles.output} ${answer === 0 && styles['output-selected']} ${answer === 0 && isFinish ? (response ? styles['output-correct'] : styles['output-wrong']) : ''}`} onClick={() => !isFinish && setAnswer(0)}>0</div>
          </div>
        </div>
        <div className={styles['first-gate-text']}>
          {texts[firstGates.current[1]]}
        </div>
      </div>
      {!isFinish && response == null && <button onClick={handleResponse}>{t('btnAnswer')}</button>}
      {isFinish && <button onClick={handleFinish}>{t('btnNext')}</button>}
    </>
  )
}
export default DigitalCircuitGame
