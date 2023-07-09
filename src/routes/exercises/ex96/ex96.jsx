import { useState, useEffect } from 'react'
import NoScoringComponent from '../components/noScoringComponent'
import data from './data.json'
import styles from '../../../styles/ex96.module.css'

export default function Ex96 () {
  const [showModal, setShowModal] = useState(false)
  const [text, setText] = useState('')
  const [state, setState] = useState([])
  const [myData] = useState({
    ...data
  })

  const handleText = () => {
    setState(prev => [...prev, text])
    setShowModal(false)
  }

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {(setPhase) => (
        <div className={styles['game-area']}>
          <Ram inputArray={state} />
          {showModal && <Modal setValue={setText} handleClick={handleText} />}
          {state.length < 10 && <div className={styles['game-area-button']} onClick={() => { setShowModal(true) }}>NUEVO DOCUMENTO</div>}
          {state.length === 10 && <div className={styles['game-area-button']} onClick={() => { setPhase('end') }}>FINALIZAR</div>}
        </div>
      )}
    </NoScoringComponent>
  )
}

function Modal ({ setValue, handleClick }) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (setValue) setValue(text)
  }, [text])

  return (
    <div className={styles.modal}>
      <div className={styles['ram-title']}>Ingresar Texto</div>
      <div className={styles['modal-content']}>
        <textarea className={styles['modal-textarea']} value={text} onChange={({ target }) => { setText(target.value) }} />
        <div className={styles['modal-buttons']} onClick={handleClick}>INGRESAR</div>
      </div>
    </div>
  )
}

function Ram ({ inputArray }) {
  const [slots, setSlots] = useState(Array(10).fill(0))

  useEffect(() => {
    if (inputArray.length > 0) {
      const newSlots = [...slots]
      for (let i = 0; i < inputArray.length; i++) {
        newSlots[i] = inputArray[i]
      }
      setSlots(newSlots)
    }
  }, [inputArray])

  return (
    <div className={styles.ram}>
      <div className={styles['ram-title']}>Memoria RAM</div>
      <div className={styles['ram-slots']}>
        {slots.map((v, i) => <Slot key={i} label={v !== 0 ? 'doc' : 'Empty'} content={v !== 0 ? 'doc' : 'Empty'} txt={v !== 0 ? v : 'Empty'} />)}
      </div>
    </div>
  )
}

function Slot ({ label = 'Empty', content = 'Empty', txt = 'Empty' }) {
  const handleClick = () => {
    if (content !== 'Empty') {
      alert(txt)
    }
  }

  return (
    <div className={styles.slot}>
      <div className={`${styles['slot-content']} ${content !== 'Empty' && (content === 'audio' ? styles['slot-content-audio'] : styles['slot-content-doc'])}`} onClick={handleClick} />
      <div className={styles['slot-title']}>{label}</div>
    </div>
  )
}
