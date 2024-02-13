import { useState, useEffect, useRef } from 'react'
import styles from '../../../styles/bloodstream.module.css'
import red from '/images/exercises/52/red.svg'
import white from '/images/exercises/52/white.svg'
import anomalia from '/images/exercises/52/anomalia.svg'
import Timer from './timer2.jsx'
import { useTranslation } from 'react-i18next'

const White = ({ id, setToDelete, appearsWhite, setWhitePositions }) => {
  const [position, setPosition] = useState({ top: Math.random() < 0.5 ? 0 : 50, left: -10 })
  const whiteRef = useRef(null)
  const [time, setTime] = useState(0)
  const millis = 30

  useEffect(() => {

  }, [appearsWhite])

  useEffect(() => {
    const appearsWhiteView = appearsWhite.find(el => el.id === id)?.view
    setWhitePositions(prev => {
      const index = prev.findIndex(el => el.id === id)
      if (index >= 0) {
        prev[index] = { id, position, view: appearsWhiteView }
      } else {
        prev.push({ id, position, view: appearsWhiteView })
      }
      return [...prev]
    })

    if (position.left == 100) {
      setToDelete(prev => {
        prev.push(id)
        return [...prev]
      })
    }
  }, [position])
  useEffect(() => {
    whiteRef.current = setInterval(() => {
      setTime(prev => prev + millis / 1000)
    }, millis)

    return () => {
      clearInterval(whiteRef.current)
    }
  }, [])

  useEffect(() => {
    setPosition(prev => { return { left: prev.left + 0.5, top: prev.top + 0.5 * Math.sin(2 * Math.PI * time) } })
  }, [time])

  return (
    <img className={styles['white-particle']}src={white} alt='white' style={{ top: `${position.top}%`, left: `${position.left}%` }}/>
  )
}
const Red = () => {
  const [position, setPosition] = useState({ top: Math.random() < 0.5 ? 0 : 50, left: -10 })
  const redRef = useRef(null)
  const [time, setTime] = useState(0)
  const millis = 30
  const [phase, setPhase] = useState(Math.random() * 2 * Math.PI)

  useEffect(() => {
    if (position.left == -10) {
      setPhase(Math.random() * 2 * Math.PI)
    }
  }, [position])

  useEffect(() => {
    redRef.current = setInterval(() => {
      setTime(prev => prev + millis / 1000)
    }, millis)

    return () => {
      clearInterval(redRef.current)
    }
  }, [])

  useEffect(() => {
    setPosition({ left: position.left + 0.3 < 100 ? position.left + 0.3 : -10, top: position.top + 0.5 * Math.sin(2 * Math.PI * time + phase) })
  }, [time])

  return (
    <img className={styles['white-particle']}src={red} alt='red' style={{ top: `${position.top}%`, left: `${position.left}%` }}/>
  )
}

const Anomalia = ({ whitePositions, id, appearsAnomalia, setToDeleteAnomalia, setScore, setPhase }) => {
  const [position, setPosition] = useState({ top: Math.random() < 0.5 ? 0 : 50, left: -10 })
  const whiteRef = useRef(null)
  const [time, setTime] = useState(0)
  const millis = 20

  const collisionDetection = (rect1, rect2) => (
    rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.height + rect1.y >= rect2.y
  )

  useEffect(() => {
    whitePositions.forEach(whitePosition => {
      const rect1 = { x: position.left - 2, y: position.top, width: 2, height: 10 }
      const rect2 = { x: whitePosition.position.left - 2, y: whitePosition.position.top, width: 2, height: 10 }
      if (collisionDetection(rect1, rect2)) {
        setToDeleteAnomalia(prev => {
          return id
        })
      }
    })
  }, [whitePositions])

  useEffect(() => {
    whiteRef.current = setInterval(() => {
      setTime(prev => prev + millis / 1000)
    }, millis)

    return () => {
      clearInterval(whiteRef.current)
    }
  }, [])

  useEffect(() => {
    setPosition(prev => { return { left: prev.left + 0.1, top: prev.top + 0.5 * Math.sin(2 * Math.PI * time) } })
  }, [time])

  useEffect(() => {
    if (position.left >= 98) {
      setScore(0)
      setPhase('end')
    }
  }, [position])
  return (
    <img className={styles['white-particle']}src={anomalia} alt='anomalia' style={{ top: `${position.top}%`, left: `${position.left}%` }}/>
  )
}

const BloodnameComponent = ({ setPhase, setScore }) => {
  const { t } = useTranslation('bloodNameComponent')
  const [appears, setAppears] = useState(Array(30).fill(false))
  const [appearsWhite, setAppearsWhite] = useState([])
  const [whitePositions, setWhitePositions] = useState([])
  const [appearsAnomalia, setAppearsAnomalia] = useState(Array.from({ length: 4 }, () => ({ id: Math.random(), view: false })))
  const [time, setTime] = useState(0)
  const [timeAnomalia, setTimeAnomalia] = useState(0)
  const intervalBlood = useRef(null)
  const intervalAnomalia = useRef(null)
  const millis = 2000
  const [clickCounter, setClickCounter] = useState(0)
  const [toDelete, setToDelete] = useState([])
  const [toDeleteAnomalia, setToDeleteAnomalia] = useState([])

  const handleClickAnomalia = () => {
    if (clickCounter >= 0 && clickCounter <= 10) {
      setAppearsWhite(prev => {
        const value = Math.floor(Math.random() * 9000000000) + 1000000000
        prev.push({ view: true, id: value })
        return [...prev]
      })
      setClickCounter(prev => prev + 1)
    } else {
      setTimeout(() => {
        setClickCounter(0)
      }, 2000)
    }
  }
  useEffect(() => {
    setAppearsAnomalia(prev => {
      const index = prev.findIndex(el => el.id == toDeleteAnomalia)
      if (index >= 0) {
        prev[index].view = false
      }
      return [...prev]
    })
  }, [toDeleteAnomalia])
  useEffect(() => {
    toDelete.forEach(id => {
      setAppearsWhite(prev => {
        const index = prev.findIndex(el => el.id == id)
        prev[index].view = false
        return [...prev]
      })
    })
  }, [toDelete])

  useEffect(() => {
    if (time > 30000) {
      clearInterval(intervalBlood.current)
    } else {
      setAppears(prev => {
        const index = Math.floor(Math.random() * prev.length)
        prev[index] = true
        return [...prev]
      })
    }
  }, [time])

  useEffect(() => {
    setAppearsAnomalia(prev => {
      const index = Math.floor(Math.random() * prev.length)
      prev[index].view = true
      return [...prev]
    })
  }, [timeAnomalia])

  useEffect(() => {
    intervalBlood.current = setInterval(() => {
      setTime(prev => prev + millis / 1000)
    }, millis)

    intervalAnomalia.current = setInterval(() => {
      setTimeAnomalia(prev => prev + millis / 1000)
    }, millis)

    return () => {
      clearInterval(intervalBlood.current)
      clearInterval(intervalAnomalia.current)
    }
  }, [])

  const handleFinish = () => {
    setScore(1)
    setPhase('end')
  }
  return (
    <div className={styles['all-game-container']}>
      <div className={styles['game-container']}>
        <div className={styles['timer-container']}>
          <Timer startTime={60} finishFunction={handleFinish}/>
        </div>
        <div className={styles['blood-stream-container']}>
          <div className={styles['blood-stream']}>
            {
              appearsWhite.map((element, index) => element.view && <White key= {element.id} id={element.id} setToDelete={setToDelete} setWhitePositions={setWhitePositions} appearsWhite={appearsWhite}/>)
            }
            {
              appears.map((_, index) => appears[index] && <Red key={index}/>)
            }
            {
              appearsAnomalia.map((element, index) => element.view && <Anomalia key={index} whitePositions={whitePositions} id={element.id} appearsAnomalia={appearsAnomalia} setToDeleteAnomalia={setToDeleteAnomalia} setScore={setScore} setPhase={setPhase}/>)
            }
          </div>
        </div>
        <div className={styles['game-button']} onClick={handleClickAnomalia}>{t('label')}</div>
      </div>
    </div>
  )
}
export default BloodnameComponent
