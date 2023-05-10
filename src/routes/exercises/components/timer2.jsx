import { useEffect, useState, useRef } from 'react'
import styles from '../../../styles/timer2.module.css'

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
export default Timer
