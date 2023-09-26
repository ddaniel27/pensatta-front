import { useState, useEffect, useRef } from 'react'
import mouse from '/images/exercises/49/rat.svg'
import cheese from '/images/exercises/49/cheese.svg'
import styles from '../../../styles/labrat.module.css'
import pistas from '../ex49/laberintos.json'
import starts from '../ex49/starts.json'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Cheese = ({ style }) => (<img src={cheese} alt="cheese" style={style}/>)
const Mouse = ({ style }) => (<img src={mouse} alt="mouse" style={style}/>)
const Maze = ({ pista, colorLine }) => {
  const canvas = pista.map((line, index) => {
    const linedraw = {
      position: 'absolute',
      top: `${line.y}%`,
      left: `${line.x}%`,
      width: `${line.width}%`,
      height: `${line.height}%`,
      background: `${colorLine}`
    }

    return <canvas style={linedraw} key={index}/>
  })

  return (
    <div style={ { display: 'flex', position: 'relative', width: '100%', height: '100%' }}>
      {canvas}
    </div>
  )
}

const MazeMouseComponent = ({ lab, setPhase, setScore, colorLine }) => {
  const mouseInitX = starts[`laberinto${lab}`].startPosition.x
  const mouseInitY = starts[`laberinto${lab}`].startPosition.y
  const maze2Styles = {
    mouse: {
      position: 'absolute',
      left: `${mouseInitX}%`,
      top: `${mouseInitY}%`,
      width: '5%',
      height: '20%',
      transform: 'rotate(0deg)'
    },
    mazeContainer: {
      display: 'flex',
      backgroundColor: ''
    },
    maze: {
      backgroundImage: `url("/images/exercises/49/lab${lab}.svg")`
    },
    cheese: {
      position: 'absolute',
      left: `${starts[`laberinto${lab}`].finishHitbox.x - 11}%`,
      top: `${starts[`laberinto${lab}`].finishHitbox.y}%`,
      width: `${starts[`laberinto${lab}`].finishHitbox.width}%`,
      height: `${starts[`laberinto${lab}`].finishHitbox.height}%`
    }

  }

  const finish = starts[`laberinto${lab}`].finishHitbox

  const pista = pistas[`laberinto${lab}`]
  const velocidad = 10
  const [posx, setPosx] = useState(mouseInitX)
  const [posy, setPosy] = useState(mouseInitY)
  const intervalRef = useRef(null)
  const [styleMouse, setStyleMouse] = useState(maze2Styles.mouse)
  const [mouseHitbox, setMouseHitbox] = useState({ x: posx, y: posy, width: 4, height: 20 })
  const [isCollide, setIsCollide] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [dirX, setDirX] = useState(1)
  const [dirY, setDirY] = useState(0)
  const [optionsSelected, setOptionsSelected] = useState(Array.from({ length: 4 }, () => ('empty')))
  const [beginAnimation, setBeginAnimation] = useState(false)
  const [disabledInit, setDisabledInit] = useState(true)
  const [disableReset, setDisabledReset] = useState(true)
  const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  const [isFinish, setIsFinish] = useState(false)

  const collisionDetection = (rect1, rect2) => (
    rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.height + rect1.y >= rect2.y
  )

  useEffect(() => {
    if (isFinish) {
      setScore(isWin ? 1 : 0)
      setPhase('end')
    }
  }, [isFinish])

  useEffect(() => {
    setStyleMouse({
      ...styleMouse,
      transform: `rotate(${-dirX * 90}deg)`
    })
  }, [dirX])

  useEffect(() => {
    setStyleMouse({
      ...styleMouse,
      transform: `rotate(${-(dirY - 1) * 90}deg)`
    })
  }, [dirY])

  useEffect(() => {
    setPosx(mouseInitX)
    setPosy(mouseInitY)
    setMouseHitbox({
      ...mouseHitbox,
      y: mouseInitY,
      x: mouseInitX
    })
    setStyleMouse({
      ...styleMouse,
      top: `${mouseInitY}%`,
      left: `${mouseInitX}%`
    })
  }, [])

  useEffect(() => {
    setMouseHitbox({ ...mouseHitbox, y: posy })

    if (!isCollide) {
      setStyleMouse({
        ...styleMouse,
        top: `${posy}%`
      })
    }
  }, [posy])

  useEffect(() => {
    setMouseHitbox({ ...mouseHitbox, x: posx })
    if (!isCollide) {
      setStyleMouse({
        ...styleMouse,
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
  const startCounter = (incrementoX, incrementoY, axis) => {
    let counter = 0

    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      if (!isCollide) {
        if (axis == 'x') {
          setDirX(Math.sign(incrementoX))
          setStyleMouse({
            ...styleMouse,
            transform: `rotate(${-(Math.sign(incrementoX)) * 90}deg)`
          })
          setPosx((prevCounter) => {
            counter = prevCounter
            return prevCounter + incrementoX
          })
          setMouseHitbox({
            ...mouseHitbox,
            x: counter + incrementoX
          })

          if (
            collisionDetection({ ...mouseHitbox, x: counter + 2 * incrementoX }, finish) ||
                pista.some(line => {
                  return collisionDetection({ ...mouseHitbox, x: counter + 2 * incrementoX }, line)
                })) {
            setPosx((prevCounter) => {
              return prevCounter - incrementoX
            })
            setIsCollide(false)
            if (collisionDetection({ ...mouseHitbox, x: counter + 2 * incrementoX }, finish)) {
              setIsWin(true)
            }

            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }
      }
      if (axis == 'y') {
        setDirY(Math.sign(incrementoY))
        setStyleMouse({
          ...styleMouse,
          transform: `rotate(${(Math.sign(incrementoY) - 1) * 90}deg)`
        })
        setPosy((prevCounter) => {
          counter = prevCounter
          return prevCounter + incrementoY
        })
        setMouseHitbox({
          ...mouseHitbox,
          y: counter + incrementoY
        })
        if (
          collisionDetection({ ...mouseHitbox, y: counter + 2 * incrementoY }, finish) ||
            pista.some(line => {
              return collisionDetection({ ...mouseHitbox, y: counter + 2 * incrementoY }, line)
            })) {
          setPosy((prevCounter) => {
            return prevCounter - incrementoY
          })
          setDirY(Math.sign(incrementoY))
          setIsCollide(false)
          if (collisionDetection({ ...mouseHitbox, y: counter + 2 * incrementoY }, finish)) {
            setIsWin(true)
          }

          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, velocidad)
  }

  const cbdown = (event) => {
    if (event.repeat) return
    if (isWin) return
    const option = {
      CustomArrowRight: () => { startCounter(0.3, 0, 'x') },
      CustomArrowLeft: () => { startCounter(-0.3, 0, 'x') },
      CustomArrowDown: () => { startCounter(0, 2, 'y') },
      CustomArrowUp: () => { startCounter(0, -2, 'y') }
    }
    if (event.code in option) { option[event.code]() }
  }
  const cbup = (event) => {
    stopCounter()
  }

  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  window.onkeydown = cbdown
  window.onkeyup = cbup

  useEffect(() => {
    return () => {
      window.onkeydown = null
      window.onkeyup = null
    }
  }, [])

  async function animate (option) {
    const event = new KeyboardEvent('keydown', {
      code: option,
      bubbles: true,
      cancelable: true
    })
    window.dispatchEvent(event)
    await sleep(2000)
    stopCounter()
  }

  async function animation () {
    await animate(`Custom${optionsSelected[0]}`)
    await animate(`Custom${optionsSelected[1]}`)
    await animate(`Custom${optionsSelected[2]}`)
    await animate(`Custom${optionsSelected[3]}`)
    await animate(`Custom${optionsSelected[0]}`)
    await animate(`Custom${optionsSelected[1]}`)
    await animate(`Custom${optionsSelected[2]}`)
    await animate(`Custom${optionsSelected[3]}`)
    await animate(`Custom${optionsSelected[0]}`)
    await animate(`Custom${optionsSelected[1]}`)
    await animate(`Custom${optionsSelected[2]}`)
    await animate(`Custom${optionsSelected[3]}`)
    await animate(`Custom${optionsSelected[0]}`)
    await animate(`Custom${optionsSelected[1]}`)
    await animate(`Custom${optionsSelected[2]}`)
    await animate(`Custom${optionsSelected[3]}`)
    setIsFinish(true)
  }

  useEffect(() => {
    if (beginAnimation) {
      animation()
    }
  }, [beginAnimation])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
            destination.index === source.index
    ) {
      return
    }

    const newOptionsSelected = [...optionsSelected]
    newOptionsSelected[destination.droppableId.replace('input-', '')] = draggableId

    setOptionsSelected(newOptionsSelected)
  }

  useEffect(() => {
    if (optionsSelected.every(option => option !== 'empty')) {
      setDisabledInit(false)
    } else {
      setDisabledInit(true)
    }
    if (optionsSelected.some(option => option !== 'empty')) {
      setDisabledReset(false)
    } else {
      setDisabledReset(true)
    }
  }, [optionsSelected])

  const handleInit = () => {
    if (!disabledInit) {
      setDisabledReset(true)
      setBeginAnimation(true)
    }
  }
  const handleReset = () => {
    if (!disableReset) {
      setOptionsSelected(Array.from({ length: 4 }, () => ('empty')))
    }
  }

  return (
    <div className={styles.allContainer}>
      <div className={styles.mazeContainer}>
        <div className={styles.maze} style={maze2Styles.maze}>
          <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', top: '0%', left: '0%' }}>
            <Maze pista={pista} colorLine={colorLine}/>
            <Mouse style = {styleMouse} />
            <Cheese style = {maze2Styles.cheese} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles['options-selected']}>
              {
                optionsSelected.map((option, index) => (
                  <Droppable droppableId={`input-${index}`} key={index}>
                    {(provided) => (
                      <>
                        <div {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={styles[option]} />
                      </>
                    )}
                  </Droppable>
                ))
              }
              <span>x 4</span>
            </div>
            <div className={styles['options-container']}>
              <Droppable droppableId='options'>
                {(provided) => (
                  <div {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.options}>
                    {
                      directions.map((option, index) => (
                        <Draggable key={option} draggableId={option} index={index}>
                          {(provided) => (
                            <div {...provided.dragHandleProps} ref={provided.innerRef} {...provided.draggableProps} className={styles[option]}/>
                          )}
                        </Draggable>
                      ))
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
      <div className={styles['buttons-container']}>
        <div className={`${styles['game-button']} ${styles['restart-button']} ${disableReset ? styles['button-disabled'] : ''}`} onClick={handleReset}>REINICIAR</div>
        <div className={`${styles['game-button']} ${styles['start-button']} ${disabledInit ? styles['button-disabled'] : ''}`} onClick={handleInit}>INICIAR</div>
      </div>
    </div>
  )
}

export default MazeMouseComponent
