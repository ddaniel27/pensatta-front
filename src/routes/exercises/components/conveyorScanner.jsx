import { useState, useEffect, useRef } from 'react'
import conveyorBelt from '/images/exercises/18/conveyorBelt.svg'
import styles from '../../../styles/conveyorScanner.module.css'
const Belt = ({ position, setPosition }) => {
  useEffect(() => {
    console.log('atom', position)
  }, [position])
  return (
    <img className={styles['belt-atom']} src={conveyorBelt} alt="conveyor belt" style={{ top: `${position.top}%`, left: `${position.left}%`, width: '120%' }}/>
  )
}

const ConveyorScanner = () => {
  const [positionBelt1, setPositionBelt1] = useState({ top: 0, left: 0 })
  const [positionBelt2, setPositionBelt2] = useState({ top: 0, left: 120 })
  const [time, setTime] = useState(0)
  const timeRef = useRef(null)
  const millis = 30

  useEffect(() => {
    timeRef.current = setInterval(() => {
      setTime(prev => prev + 1)
    }, millis)

    return () => {
      clearInterval(timeRef.current)
    }
  }, [])

  useEffect(() => {
    setPositionBelt1({ top: positionBelt1.top, left: positionBelt1.left + 1 })
    setPositionBelt2({ top: positionBelt2.top, left: positionBelt2.left + 1 })
  }, [time])

  useEffect(() => {
    if (positionBelt1.left >= 119) {
      setPositionBelt1({ top: positionBelt1.top, left: -119 })
    }
    if (positionBelt2.left >= 119) {
      setPositionBelt2({ top: positionBelt2.top, left: -119 })
    }
  }, [positionBelt1, positionBelt2])

  return (
    <div className={styles['scanner-container']}>
      <div className={styles['belts-container']}>
        <Belt position={positionBelt1}/>
        <Belt position={positionBelt2}/>

      </div>
      <div>{time}</div>
    </div>
  )
}
export default ConveyorScanner
