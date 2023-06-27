import { useState, useEffect, useRef } from 'react'
import carrito from '/images/exercises/74/fox.svg'
import styles from '../../../styles/mazeProgComponent.module.css'
import pistas from '../ex74/walls.json'
import starts from '../ex74/starts.json'
import MazeButton from './mazeButton'

const Carrito = ({ style }) => (<img src={carrito} alt='carrito' style={style} />)
const Maze = ({ pista, colorLine }) => {
  const canvas = pista.map((line, idx) => {
    const linedraw = {
      position: 'absolute',
      top: `${line.y}%`,
      left: `${line.x}%`,
      width: `${line.width}%`,
      height: `${line.height}%`,
      background: `${colorLine}`
    }

    return <canvas key={idx} style={linedraw} />
  })

  return (
    <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%' }}>
      {canvas}
    </div>
  )
}

const MazeProgMoveComponent = ({ lab = 1, setPhase, setScore, colorLine, imagePath, algorithm = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'] }) => {
  const carInitX = starts[`lab-${lab}`].startPosition.x
  const carInitY = starts[`lab-${lab}`].startPosition.y
  const maze2Styles = {
    carrito: {
      position: 'absolute',
      left: `${carInitX}%`,
      top: `${carInitY}%`,
      width: '20%',
      height: '20%',
      transform: 'rotate(0deg)'
    },
    mazeContainer: {
      display: 'flex',
      backgroundColor: ''
    },
    corazon: {
      width: '100%',
      height: 'auto'
    },
    maze: {

      display: 'flex',
      position: 'relative',
      width: '380px',
      height: '380px',
      backgroundImage: `url("/images/exercises/74/lab${lab}.svg")`

    }

  }

  const finish = starts[`lab-${lab}`].finishHitbox

  const pista = pistas[`lab-${lab}`]
  const velocidad = 10
  const [posx, setPosx] = useState(carInitX)
  const [posy, setPosy] = useState(carInitY)
  const intervalRef = useRef(null)
  const [styleCarrito, setStyleCarrito] = useState(maze2Styles.carrito)
  const [carritoHitbox, setCarritoHitbox] = useState({ x: posx, y: posy, width: 19, height: 17 })
  const [isCollide, setIsCollide] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [isRestart] = useState(false)

  const collisionDetection = (rect1, rect2) => (
    rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.height + rect1.y >= rect2.y
  )

  useEffect(() => {
    setPosx(carInitX)
    setPosy(carInitY)
    setCarritoHitbox({
      ...carritoHitbox,
      y: carInitY,
      x: carInitX
    })
    setStyleCarrito({
      ...styleCarrito,
      top: `${carInitY}%`,
      left: `${carInitX}%`
    })
  }, [isRestart])

  useEffect(() => {
    setCarritoHitbox({ ...carritoHitbox, y: posy })

    if (!isCollide) {
      setStyleCarrito({
        ...styleCarrito,
        top: `${posy}%`
      })
    }
  }, [posy])

  useEffect(() => {
    setCarritoHitbox({ ...carritoHitbox, x: posx })
    if (!isCollide) {
      setStyleCarrito({
        ...styleCarrito,
        left: `${posx}%`
      })
    }
  }, [posx])

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsCollide(false)
    }
  }

  const startCounterX = (incremento) => {
    let counter = 0

    if (intervalRef.current) return

    intervalRef.current = setInterval(() => {
      if (!isCollide) {
        setPosx((prevCounter) => {
          counter = prevCounter
          return prevCounter + incremento
        })

        setCarritoHitbox({
          ...carritoHitbox,
          x: counter + incremento
        })

        if (
          collisionDetection({ ...carritoHitbox, x: counter + 2 * incremento }, finish) ||
                pista.some(line => {
                  return collisionDetection({ ...carritoHitbox, x: counter + 2 * incremento }, line)
                })) {
          setPosx((prevCounter) => {
            return prevCounter - incremento
          })
          setIsCollide(false)
          if (collisionDetection({ ...carritoHitbox, x: counter + 2 * incremento }, finish)) {
            setIsWin(true)
          }
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, velocidad)
  }

  const startCounterY = (incremento) => {
    let counter = 0

    if (intervalRef.current) return

    intervalRef.current = setInterval(() => {
      if (!isCollide) {
        setPosy((prevCounter) => {
          counter = prevCounter
          return prevCounter + incremento
        })
        setCarritoHitbox({
          ...carritoHitbox,
          y: counter + incremento
        })
        if (
          collisionDetection({ ...carritoHitbox, y: counter + 2 * incremento }, finish) ||
            pista.some(line => collisionDetection({ ...carritoHitbox, y: counter + 2 * incremento }, line))) {
          setPosy((prevCounter) => {
            return prevCounter - incremento
          })
          setIsCollide(false)
          if (collisionDetection({ ...carritoHitbox, y: counter + 2 * incremento }, finish)) {
            setIsWin(true)
          }
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, velocidad)
  }
  const cbdown = (event, isKey = true) => {
    if (isKey && event.repeat) return
    if (isWin) return
    const startsCounters = [() => { startCounterX(1) }, () => { startCounterX(-1) }, () => { startCounterY(1) }, () => { startCounterY(-1) }]
    const option = algorithm.reduce((obj, key, index) => {
      obj[key] = startsCounters[index]
      return obj
    }, {})
    if (isKey) {
      option[event.code]()
    } else {
      option[event]()
    }
  }
  const cbup = (event) => {
    stopCounter()
  }

  function onClickButton (option) {
    const event = new KeyboardEvent('keydown', {
      code: option,
      bubbles: true,
      cancelable: true
    })
    window.dispatchEvent(event)
  }

  window.onkeydown = cbdown
  window.onkeyup = cbup

  useEffect(() => {
    return () => {
      window.onkeydown = null
      window.onkeyup = null
    }
  }, [])

  return (
    <div className={styles.allContainer}>
      <div className={styles.mazeContainer}>
        <div style={maze2Styles.maze}>
          <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', top: '0%', left: '0%' }}>
            <Maze pista={pista} colorLine={colorLine} />
            <Carrito style={styleCarrito} />

          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.containerCross}>
          <div className={styles.containerBtnsText}>
            <div className={styles.buttonsContainer}>
              <div className={styles.btnR}>
                <MazeButton
                  onMouseDown={!isWin ? () => onClickButton('ArrowRight') : null}
                  onMouseUp={stopCounter}
                  onMouseLeave={stopCounter}
                  direction='right'
                />
              </div>
              <div className={styles.btnD}>
                <MazeButton
                  onMouseDown={!isWin ? () => onClickButton('ArrowDown') : null}
                  onMouseUp={stopCounter}
                  onMouseLeave={stopCounter}
                  direction='down'
                />
              </div>
              <div className={styles.btnL}>
                <MazeButton
                  onMouseDown={!isWin ? () => onClickButton('ArrowLeft') : null}
                  onMouseUp={stopCounter}
                  onMouseLeave={stopCounter}
                  direction='left'
                />
              </div>
              <div className={styles.btnU}>
                <MazeButton
                  onMouseDown={!isWin ? () => onClickButton('ArrowUp') : null}
                  onMouseUp={stopCounter}
                  onMouseLeave={stopCounter}
                  direction='up'
                />
              </div>
            </div>
            <div className={styles.infoText}>
              Muévete oprimiendo estos botones o presionando las teclas de dirección de tu teclado.
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default MazeProgMoveComponent
