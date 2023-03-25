import hot from '/images/exercises/45/hot.svg'
import cold from '/images/exercises/45/cold.svg'
import dirty from '/images/exercises/45/dirty.svg'
import perfect from '/images/exercises/45/perfect.svg'
import dark from '/images/exercises/45/dark.svg'
import { useState, useEffect, useRef } from 'react'
import styles from '../../../styles/fishGame.module.css'

const Timer = ({ finishFunction = () => {}, startTime = 180, stopTimer = false }) => {
  const [time, setTime] = useState(startTime)
  const interval = useRef(null)

  useEffect(() => {
    interval.current = setInterval(
      () => {
        setTime(prevTime => {
          if (prevTime - 1 <= 0) {
            finishFunction()
            clearInterval(interval.current)
          }
          return prevTime - 1
        })
      }, 1000
    )
    return () => clearInterval(interval.current)
  }, [])

  useEffect(() => {
    if (stopTimer) {
      clearInterval(interval.current)
    }
  }, [time])
  function padTo2Digits (num) {
    return num.toString().padStart(2, '0')
  }

  return (
    <div className={styles.timer}>{`${padTo2Digits(Math.floor(time / 60))} : ${padTo2Digits(time % 60)}`}</div>
  )
}

const InputRange = ({ value = 0, setValue = () => {}, min = 0, max = 0, step = 0, label = '', isFinish = false }) => {
  const handleChange = (event) => {
    if (!isFinish) {
      setValue(event.target.value)
    }
  }
  const handleClickPlus = () => {
    if (!isFinish) {
      setValue(prev => prev === max ? prev : prev + 1)
    }
  }
  const handleClickMinus = () => {
    if (!isFinish) {
      setValue(prev => prev === min ? prev : prev - 1)
    }
  }
  return (
    <div className={styles['input-range-container']}>
      <div className={styles['input-range-label']}>{label}</div>
      <div className={styles['input-range-slider']}>
        <span onClick={handleClickMinus}>-</span>
        <div className={styles['input-range']}>
          <datalist>
            {
              Array.from({ length: (max - min) / step + 1 }, (_, i) => i * step + min).map((num, index) => (<option value={num} key={index}/>))
            }
          </datalist>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <span onClick={handleClickPlus}>+</span>
      </div>
    </div>
  )
}

const FishGame = ({ setPhase }) => {
  const [temperature, setTemperature] = useState(Math.floor(Math.random() * 9))
  const [light, setLight] = useState(Math.floor(Math.random() * 9))
  const [clean, setClean] = useState(Math.floor(Math.random() * 9))
  const [image, setImage] = useState('')
  const [isFinish, setIsFinish] = useState(false)

  const finishTimer = () => {
    setIsFinish(true)
  }

  useEffect(() => {
    if (temperature == 5 && light >= 5 && clean >= 7) {
      setImage(perfect)
      setIsFinish(true)
    } else if (light < 5) {
      setImage(dark)
    } else if (clean < 7) {
      setImage(dirty)
    } else if (temperature > 5) {
      setImage(hot)
    } else if (temperature < 5) {
      setImage(cold)
    }
  }, [temperature, light, clean])

  return (
    <>
      <div className={styles['game-container']}>
        <div className={styles['image-container']}>
          <img src={image} />
        </div>
        <div className={styles['options-container']}>
          <div className={styles['timer-container']} >
            <div className={styles['timer-container-child']}>
              <Timer stopTimer={isFinish} finishFunction={finishTimer}/>
            </div>
          </div>
          <div className={styles['inputs-container']}>
            <InputRange value={temperature} setValue={setTemperature} min={0} max={8} step={1} label="Temperatura" isFinish={isFinish}/>
            <InputRange value={light} setValue={setLight} min={0} max={8} step={1} label="Iluminación" isFinish={isFinish} />
            <InputRange value={clean} setValue={setClean} min={0} max={8} step={1} label="Limpieza" isFinish={isFinish}/>
          </div>
        </div>
      </div>
      {isFinish && <button onClick={() => setPhase('end')}>SIGUIENTE</button>}
    </>
  )
}
export default FishGame
