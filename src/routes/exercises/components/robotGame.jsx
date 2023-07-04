import { useRef, useEffect, useState } from 'react'
import styles from '../../../styles/robotGame.module.css'

const BoxBack = ({ color }) => {
  const colors = {
    green: ['#5DED7D', '#59D976', '#59D976', '#9FFFB5'],
    fuchsia: ['#E78CFE', '#D562F1', '#D562F1', '#EFAFFF']
  }
  return (
    <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles[`box-back-${color}`]}>
      <rect x="18.0952" width="160.952" height="76.1905" fill={colors[color][0]}/>
      <path d="M160.952 23.8095L179.048 0V76.1905L160.952 100V23.8095Z" fill={colors[color][1]}/>
      <path d="M0 23.8095L18.0952 0V76.1905L0 100V23.8095Z" fill={colors[color][2]}/>
    </svg>
  )
}

const BoxFront = ({ color }) => {
  const colors = {
    green: ['#5DED7D', '#59D976', '#59D976', '#9FFFB5'],
    fuchsia: ['#E78CFE', '#D562F1', '#D562F1', '#EFAFFF']
  }
  return (
    <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles[`box-front-${color}`]}>
      <rect y="23.8095" width="160.952" height="76.1905" fill={colors[color][3]}/>
    </svg>
  )
}

const Cube = ({ color, direction }) => {
  const [position, setPosition] = useState({ top: 15, left: 45 })
  const [counter, setCounter] = useState(0)
  const [time, setTime] = useState(0)
  const intervalCube = useRef(null)

  const beginMovement = () => {
    intervalCube.current = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 50)
  }
  useEffect(() => {
    setCounter(0)
    setPosition({ top: 15, left: 45 })
  }, [color, direction])

  useEffect(() => {
    if (position.top >= 85 && counter <= color.length - 1) {
      clearInterval(intervalCube.current)
      setPosition({ top: 15, left: 45 })
      setCounter((prev) => prev + 1)
      beginMovement()
    }
  }, [position])

  useEffect(() => {
    beginMovement()

    return () => {
      clearInterval(intervalCube.current)
    }
  }, [])

  useEffect(() => {
    if (direction[counter] == 'right') {
      if (position.left <= 67) {
        setPosition({ top: position.top, left: position.left + 1 })
      } else {
        setPosition({ top: position.top + 1, left: position.left })
      }
    } else if (direction[counter] == 'left') {
      if (position.left >= 25) {
        setPosition({ top: position.top, left: position.left - 1 })
      } else {
        setPosition({ top: position.top + 1, left: position.left })
      }
    }
  }, [time])

  return (
    <div className={`${styles['cube-box']} ${styles[`cube-${color[counter]}`]}`} style={{ left: `${position.left}%`, top: `${position.top}%` }}/>
  )
}

function EyeTracking ({ color = ['green', 'fuchsia', 'green', 'fuchsia'], direction = ['right', 'left', 'right', 'left'] }) {
  const eyeRef = useRef(null)
  const eyeRef2 = useRef(null)

  const handleMouseMove = (event) => {
    const eye = eyeRef.current
    const x = eye.offsetLeft + eye.offsetWidth / 2
    const y = eye.offsetTop + eye.offsetHeight / 2
    const rad = Math.atan2(event.pageX - x, event.pageY - y)
    const rot = (rad * (180 / Math.PI) * -1) + 180

    const eye2 = eyeRef2.current
    const x2 = eye2.offsetLeft + eye2.offsetWidth / 2
    const y2 = eye2.offsetTop + eye2.offsetHeight / 2
    const rad2 = Math.atan2(event.pageX - x2, event.pageY - y2)
    const rot2 = (rad2 * (180 / Math.PI) * -1) + 180

    eye.style.transform = `rotate(${rot}deg)`
    eye2.style.transform = `rotate(${rot2}deg)`
  }

  return (
    <section className={styles['move-area']} onMouseMove={handleMouseMove}>
      <div className={styles['animation-container']}>
        <div className={styles['robot-body']}>
          <div className={styles['container-eyes']}>
            <div className={styles.eye} ref={eyeRef} />
            <div className={styles.eye} ref={eyeRef2} />
          </div>
        </div>
        <Cube color={color} direction={direction}/>
        <BoxBack color="green"/>
        <BoxFront color="green"/>
        <BoxBack color="fuchsia"/>
        <BoxFront color="fuchsia"/>
      </div>
    </section>
  )
}

export default EyeTracking
