import { useState, useEffect, useRef } from 'react'
// eslint-disable-next-line
import zorrito from "/images/exercises/09/zorrito.svg"
import styles from '../../../styles/maze2Component.module.css'
import laberintos from '../ex09/laberintos.json'
import starts from '../ex09/starts.json'
import MazeButton from './mazeButton'
// eslint-disable-next-line
import corazon from "/images/exercises/09/corazon.svg"
import Enemigos from './maze2EnemieComponent'
import positionEnemies from '../ex09/enemies.json'

const Zorrito = ({ style }) => (<img src={zorrito} alt="zorrito" style={style}/>)
const Maze = ({ style, laberinto }) => {
  const canvas = laberinto.map((line, index) => {
    const linedraw = {
      position: 'absolute',
      top: `${line.y}%`,
      left: `${line.x}%`,
      width: `${line.width}%`,
      height: `${line.height}%`,
      background: '#00D8CC'
    }

    return <canvas key={index} style={linedraw} />
  })

  return (
    <div style={ { display: 'flex', position: 'relative', width: '100%', height: '100%' }}>
      {canvas}
    </div>
  )
}
const Hearts = ({ vidas, style }) => {
  const hearts = []

  for (let i = 1; i <= vidas; i++) {
    hearts.push(
      <div key={`heart-${i}`}>
        <img src={corazon} style={style} />
      </div>)
  }
  return hearts
}

const Maze2Component = ({ lab, setPhase, setScore }) => {
  const enemiX = starts[`laberinto${lab}`].startPosition.x
  const enemiY = starts[`laberinto${lab}`].startPosition.y
  const maze2Styles = {
    zorrito: {
      position: 'absolute',
      left: `${enemiX}%`,
      top: `${enemiY}%`,
      width: '5%',
      height: '5%'
    },
    mazeContainer: {
      display: 'flex',
      backgroundColor: ''
    },
    corazon: {
      width: '100%',
      height: 'auto'
    }

  }
  const start = starts[`laberinto${lab}`].startHitbox
  const finish = starts[`laberinto${lab}`].finishHitbox
  const enemiesPos = positionEnemies[`laberinto${lab}`]

  const laberinto = laberintos[`laberinto${lab}`]
  const velocidad = 10
  const [posx, setPosx] = useState(enemiX)
  const [posy, setPosy] = useState(enemiY)
  const intervalRef = useRef(null)
  const [styleZorrito, setStyleZorrito] = useState(maze2Styles.zorrito)
  const styleMaze = maze2Styles.canvas1
  const [zorritoHitbox, setZorritoHitbox] = useState({ x: posx, y: posy, width: 5, height: 5 })
  const [isCollide, setIsCollide] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [vidas, setVidas] = useState(3)
  const [isRestart, setIsRestart] = useState(false)
  const [posEnemies, setPosEnemies] = useState(enemiesPos)
  const [loop, setLoop] = useState(0)
  const [trigger, setTrigger] = useState(0)

  const collisionDetection = (rect1, rect2) => (
    rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.height + rect1.y >= rect2.y
  )

  useEffect(() => {
    setPosEnemies(enemiesPos)
    setPosx(enemiX)
    setPosy(enemiY)
    setZorritoHitbox({
      ...zorritoHitbox,
      y: enemiY,
      x: enemiX
    })
    setStyleZorrito({
      ...styleZorrito,
      top: `${enemiY}%`,
      left: `${enemiX}%`
    })
  }, [isRestart])

  useEffect(() => {
    setTimeout(() => {
      if ((!vidas == 0) && (!isWin)) {
        setLoop(loop + 1)
      }
    }, 10)
  }, [trigger])

  useEffect(() => {
    const incremento = 0.2
    const newposEnemies = posEnemies.map((pos) => {
      if (pos.direction == 'right') {
        if (
          collisionDetection({ ...pos, x: pos.x + incremento }, zorritoHitbox) ||
                    laberinto.some(line => {
                      return collisionDetection({ ...pos, x: pos.x + incremento }, line)
                    }) ||
                    collisionDetection({ ...pos, x: pos.x + incremento }, start) ||
                    collisionDetection({ ...pos, x: pos.x + incremento }, finish)
        ) {
          if (collisionDetection({ ...pos, x: pos.x + incremento }, zorritoHitbox)) {
            setPosEnemies(enemiesPos)
            setPosx(enemiX)
            setPosy(enemiY)
            setZorritoHitbox({
              ...zorritoHitbox,
              y: enemiY,
              x: enemiX
            })
            setStyleZorrito({
              ...styleZorrito,
              top: `${enemiY}%`,
              left: `${enemiX}%`
            })
            setVidas(vidas - 1)
            setIsRestart(!isRestart)
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }

          const direction = ['up', 'left', 'down', 'right'][Math.floor(Math.random() * 4)]

          return ({ ...pos, direction })
        }
        return ({ ...pos, x: pos.x + incremento })
      } else if (pos.direction == 'down') {
        if (
          collisionDetection({ ...pos, y: pos.y + incremento }, zorritoHitbox) ||
                    laberinto.some(line => {
                      return collisionDetection({ ...pos, y: pos.y + incremento }, line)
                    }) ||
                    collisionDetection({ ...pos, y: pos.y + incremento }, finish) ||
                    collisionDetection({ ...pos, y: pos.y + incremento }, start)
        ) {
          if (collisionDetection({ ...pos, y: pos.y + incremento }, zorritoHitbox)) {
            setPosEnemies(enemiesPos)
            setPosx(enemiX)
            setPosy(enemiY)
            setZorritoHitbox({
              ...zorritoHitbox,
              y: enemiY,
              x: enemiX
            })
            setStyleZorrito({
              ...styleZorrito,
              top: `${enemiY}%`,
              left: `${enemiX}%`
            })
            setVidas(vidas - 1)
            setIsRestart(!isRestart)
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }

          const direction = ['up', 'left', 'down', 'right'][Math.floor(Math.random() * 4)]
          return ({ ...pos, direction })
        }
        return ({ ...pos, y: pos.y + incremento })
      } else if (pos.direction == 'up') {
        if (
          collisionDetection({ ...pos, y: pos.y - incremento }, zorritoHitbox) ||
                    laberinto.some(line => {
                      return collisionDetection({ ...pos, y: pos.y - incremento }, line)
                    }) ||
                    collisionDetection({ ...pos, y: pos.y - incremento }, start) ||
                    collisionDetection({ ...pos, y: pos.y - incremento }, finish)
        ) {
          if (collisionDetection({ ...pos, y: pos.y - incremento }, zorritoHitbox)) {
            setPosEnemies(enemiesPos)
            setPosx(enemiX)
            setPosy(enemiY)
            setZorritoHitbox({
              ...zorritoHitbox,
              y: enemiY,
              x: enemiX
            })
            setStyleZorrito({
              ...styleZorrito,
              top: `${enemiY}%`,
              left: `${enemiX}%`
            })
            setVidas(vidas - 1)
            setIsRestart(!isRestart)
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }

          const direction = ['up', 'left', 'down', 'right'][Math.floor(Math.random() * 4)]
          return ({ ...pos, direction })
        }
        return ({ ...pos, y: pos.y - incremento })
      } else {
        if (
          collisionDetection({ ...pos, x: pos.x - incremento }, zorritoHitbox) ||
                    laberinto.some(line => {
                      return collisionDetection({ ...pos, x: pos.x - incremento }, line)
                    }) ||
                    collisionDetection({ ...pos, x: pos.x - incremento }, start) ||
                    collisionDetection({ ...pos, x: pos.x - incremento }, finish)
        ) {
          if (collisionDetection({ ...pos, x: pos.x - incremento }, zorritoHitbox)) {
            setPosEnemies(enemiesPos)
            setPosx(enemiX)
            setPosy(enemiY)
            setZorritoHitbox({
              ...zorritoHitbox,
              y: enemiY,
              x: enemiX
            })
            setStyleZorrito({
              ...styleZorrito,
              top: `${enemiY}%`,
              left: `${enemiX}%`
            })
            setVidas(vidas - 1)
            setIsRestart(!isRestart)
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          const direction = ['up', 'left', 'down', 'right'][Math.floor(Math.random() * 4)]
          return ({ ...pos, direction })
        }
        return ({ ...pos, x: pos.x - incremento })
      }
    })
    setPosEnemies(newposEnemies)
    setTrigger(trigger + 1)
  }, [loop])

  useEffect(() => {
    setZorritoHitbox({ ...zorritoHitbox, y: posy })

    if (!isCollide) {
      setStyleZorrito({
        ...styleZorrito,
        top: `${posy}%`
      })
    }
  }, [posy])

  useEffect(() => {
    setZorritoHitbox({ ...zorritoHitbox, x: posx })
    if (!isCollide) {
      setStyleZorrito({
        ...styleZorrito,
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
      console.log('avanzando en x')
      setPosx((prevCounter) => {
        counter = prevCounter
        return prevCounter + incremento
      })
      setZorritoHitbox({
        ...zorritoHitbox,
        x: counter + incremento
      })

      if (
        posEnemies.some(enemie => {
          return collisionDetection({ ...zorritoHitbox, x: counter + 2 * incremento }, enemie)
        }) ||
                collisionDetection({ ...zorritoHitbox, x: counter + 2 * incremento }, start) ||
                collisionDetection({ ...zorritoHitbox, x: counter + 2 * incremento }, finish) ||
                laberinto.some(line => {
                  return collisionDetection({ ...zorritoHitbox, x: counter + 2 * incremento }, line)
                })) {
        setPosx((prevCounter) => {
          return prevCounter - incremento
        })
        setIsCollide(false)
        if (collisionDetection({ ...zorritoHitbox, x: counter + 2 * incremento }, finish)) {
          setIsWin(true)
        }
        if (posEnemies.some(enemie => {
          return collisionDetection({ ...zorritoHitbox, x: counter }, enemie)
        })) {
          setPosEnemies(enemiesPos)
          setPosx(enemiX)
          setPosy(enemiY)
          setZorritoHitbox({
            ...zorritoHitbox,
            y: enemiY,
            x: enemiX
          })
          setStyleZorrito({
            ...styleZorrito,
            top: `${enemiY}%`,
            left: `${enemiX}%`
          })
          setVidas(vidas - 1)
          setIsCollide(true)
          clearInterval(intervalRef.current)

          return
        }
        clearInterval(intervalRef.current)
      }
    }, velocidad)
  }

  const startCounterY = (incremento) => {
    let counter = 0
    if (intervalRef.current) return

    intervalRef.current = setInterval(() => {
      setPosy((prevCounter) => {
        counter = prevCounter
        return prevCounter + incremento
      })
      setZorritoHitbox({
        ...zorritoHitbox,
        y: counter + incremento
      })
      if (
        posEnemies.some(enemie => {
          return collisionDetection({ ...zorritoHitbox, y: counter + 2 * incremento }, enemie)
        }) ||
            collisionDetection({ ...zorritoHitbox, y: counter + 2 * incremento }, start) ||
            collisionDetection({ ...zorritoHitbox, y: counter + 2 * incremento }, finish) ||
            laberinto.some(line => {
              return collisionDetection({ ...zorritoHitbox, y: counter + 2 * incremento }, line)
            })) {
        setPosy((prevCounter) => {
          return prevCounter - incremento
        })
        setIsCollide(false)
        if (collisionDetection({ ...zorritoHitbox, y: counter + 2 * incremento }, finish)) {
          setIsWin(true)
        }
        if (posEnemies.some(enemie => {
          return collisionDetection({ ...zorritoHitbox, y: counter }, enemie)
        })) {
          setPosEnemies(enemiesPos)
          setPosx(enemiX)
          setPosy(enemiY)
          setZorritoHitbox({
            ...zorritoHitbox,
            y: enemiY,
            x: enemiX
          })
          setStyleZorrito({
            ...styleZorrito,
            top: `${enemiY}%`,
            left: `${enemiX}%`
          })
          setVidas(vidas - 1)
          clearInterval(intervalRef.current)

          return
        }
        clearInterval(intervalRef.current)
      }
    }, velocidad)
  }
  const cbdown = (event) => {
    if (event.repeat) return
    if (isWin || vidas <= 0) return
    const option = {
      ArrowRight: () => { startCounterX(0.2) },
      ArrowLeft: () => { startCounterX(-0.2) },
      ArrowDown: () => { startCounterY(0.2) },
      ArrowUp: () => { startCounterY(-0.2) }
    }

    option[event.code]()
  }
  const cbup = (event) => {
    stopCounter()
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
        <div className={styles.maze}>
          <div style={{ display: 'flex', position: 'relative', width: '90.83275862%', height: '90.83275862%', top: '4%', left: '3.6%' }}>
            <Maze style={styleMaze} laberinto={laberinto}/>
            <Zorrito style = {styleZorrito} />
            <Enemigos positions={posEnemies}/>
          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.intentosContainer}>
                    Intentos:
          <div className={styles.corazones}>
            <Hearts vidas={vidas} style={maze2Styles.corazon}/>
          </div>
        </div>
        <div className={styles.containerCross}>
          <div className={styles.containerBtnsText}>
            <div className={styles.buttonsContainer}>
              <div className={styles.btnR}>
                <MazeButton onMouseDown = { !isWin && vidas > 0 ? () => startCounterX(0.2) : null }
                  onMouseUp = {stopCounter}
                  onMouseLeave = {stopCounter}
                  direction="right" />
              </div>
              <div className={styles.btnD}>
                <MazeButton onMouseDown = { !isWin && vidas > 0 ? () => startCounterY(0.2) : null }
                  onMouseUp = {stopCounter}
                  onMouseLeave = {stopCounter}
                  direction="down" />
              </div>
              <div className={styles.btnL}>
                <MazeButton onMouseDown = { !isWin && vidas > 0 ? () => startCounterX(-0.2) : null }
                  onMouseUp = {stopCounter}
                  onMouseLeave = {stopCounter}
                  direction = "left" />
              </div>
              <div className={styles.btnU}>
                <MazeButton onMouseDown = { !isWin && vidas > 0 ? () => startCounterY(-0.2) : null}
                  onMouseUp = {stopCounter}
                  onMouseLeave = {stopCounter}
                  direction = "up"/>
              </div>
            </div>
            <div className={styles.infoText}>
                            Muévete oprimiendo estos botones o presionando las teclas de dirección de tu teclado.
            </div>

          </div>
          {isWin || vidas <= 0
            ? <div className={styles.containerBtnNext}>
              <button onClick={() => {
                setPhase('end')
                setScore(vidas)
              }}
              className={styles.btnNext}>SIGUIENTE</button>
            </div>
            : <></>}
        </div>
      </div>

    </div>
  )
}

export default Maze2Component
