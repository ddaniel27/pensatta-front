import { useState, useEffect } from 'react'
import NoScoringComponent from '../components/noScoringComponent'
import styles from '../../../styles/ex96.module.css'
import useData from '../../../hooks/useData'

export default function Ex96 () {
  const { data } = useData('ex96')
  const [showModal, setShowModal] = useState(false)
  const [text, setText] = useState('')
  const [state, setState] = useState([])
  const [textPopUp, setTextPopUp] = useState('')
  const [myData, setMyData] = useState({
    ...data
  })

  useEffect(() => {
    setMyData({
      ...data
    })
  }, [data])

  const handleText = () => {
    setState(prev => [...prev, text])
    setShowModal(false)
  }

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {(setPhase) => (
        <div className={styles['game-area']}>
          <Ram inputArray={state} setTextPopUp={setTextPopUp} data={myData} />
          {showModal && <Modal setValue={setText} handleClick={handleText} data={myData} />}
          {state.length < 10 && <div className={styles['game-area-button']} onClick={() => { setShowModal(true) }}>{myData.btnNew}</div>}
          {state.length === 10 && <div className={styles['game-area-button']} onClick={() => { setPhase('end') }}>{myData.btnEnd}</div>}
          {textPopUp && <PopUp txt={textPopUp} setTextPopUp={setTextPopUp} data={myData} />}
        </div>
      )}
    </NoScoringComponent>
  )
}

function Modal ({ setValue, handleClick, data }) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (setValue) setValue(text)
  }, [text])

  return (
    <div className={styles.modal}>
      <div className={styles['ram-title']}>{data.titleInput}</div>
      <div className={styles['modal-content']}>
        <textarea className={styles['modal-textarea']} value={text} onChange={({ target }) => { setText(target.value) }} />
        <div className={styles['modal-buttons']} onClick={handleClick}>{data.btnEntry}</div>
      </div>
    </div>
  )
}

function Ram ({ inputArray, setTextPopUp, data }) {
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
      <div className={styles['ram-title']}>{data.name}</div>
      <div className={styles['ram-slots']}>
        {slots.map((v, i) => <Slot setTextPopUp={setTextPopUp} data={data} key={i} label={v !== 0 ? 'doc' : 'Empty'} content={v !== 0 ? 'doc' : 'Empty'} txt={v !== 0 ? v : 'Empty'} />)}
      </div>
    </div>
  )
}

function PopUp ({ txt, setTextPopUp, data }) {
  return (
    <div className={styles.popup}>
      <p>{txt}</p>
      <button onClick={() => { setTextPopUp('') }}>{data.btnClose}</button>
    </div>
  )
}

function Slot ({ label = 'Empty', data, content = 'Empty', txt = 'Empty', setTextPopUp = () => {} }) {
  const handleClick = () => {
    if (content !== 'Empty') {
      setTextPopUp(txt)
    }
  }

  return (
    <div className={styles.slot}>
      <div className={`${styles['slot-content']} ${content !== 'Empty' && (content === 'audio' ? styles['slot-content-audio'] : styles['slot-content-doc'])}`} onClick={handleClick} />
      <div className={styles['slot-title']}>{label === 'Empty' ? data.empty : label}</div>
    </div>
  )
}
