import { useState, useEffect, useRef } from 'react'
import conveyorBelt from '/images/exercises/18/conveyorBelt.svg'
import styles from '../../../styles/conveyorScanner.module.css'

const ScannerLaser = ({ position, setPosition, timeRef, setStartScan }) => {
  return (
    <div className={styles['scanner-laser']} style={{ top: `${position.top}%`, left: `${position.left}%` }} />
  )
}

const Candy = ({ position, setPosition, color, setStop }) => {
  return (
    <svg className={styles['candy-svg']} width="136" height="80" viewBox="0 0 136 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ top: `${position.top}%`, left: `${position.left}%` }}>
      <path d="M133.086 68.2174C133.092 68.2115 133.092 68.2115 133.084 68.216C133.041 68.2406 132.765 68.3998 131.991 68.4192C131.145 68.4404 129.989 68.2829 128.586 67.8903C125.79 67.1083 122.312 65.4782 118.916 63.0411C112.104 58.1522 106 50.3117 106 40.1317C106 29.912 111.897 21.9508 118.555 17.0874C121.879 14.659 125.3 13.0761 128.101 12.3894C129.504 12.0454 130.678 11.9444 131.568 12.0275C132.474 12.1121 132.906 12.3665 133.086 12.5459C133.891 13.3514 133.972 13.9768 133.861 14.5843C133.715 15.3813 133.181 16.3482 132.275 17.5566C131.838 18.1396 131.359 18.7219 130.856 19.3337L130.843 19.3495C130.355 19.9422 129.839 20.5693 129.379 21.1886C128.529 22.3322 127.5 23.9052 127.5 25.6316C127.5 26.9593 127.831 28.2068 128.244 29.3496C128.554 30.208 128.949 31.1067 129.329 31.9703C129.443 32.23 129.556 32.4866 129.664 32.7379C130.639 34.9929 131.5 37.3067 131.5 40.1317C131.5 42.9144 130.665 44.8286 129.711 46.7372C129.621 46.9182 129.527 47.1028 129.431 47.2913C128.549 49.0233 127.5 51.0825 127.5 53.6316C127.5 55.3201 128.31 57.0323 129.098 58.443C129.568 59.2845 130.171 60.2469 130.745 61.1623C131.118 61.7577 131.478 62.3332 131.782 62.8427C132.648 64.296 133.242 65.5036 133.449 66.4889C133.633 67.3636 133.479 67.8238 133.086 68.2174Z" fill={`${color}`} stroke="#333333" strokeWidth="4"/>
      <path d="M2.81424 12.2037C2.8083 12.2096 2.80842 12.2096 2.81614 12.2051C2.85892 12.1804 3.13505 12.0213 3.90905 12.0019C4.75483 11.9807 5.91074 12.1382 7.31442 12.5308C10.1102 13.3128 13.5881 14.9428 16.9839 17.38C23.7958 22.2689 29.9 30.1094 29.9 40.2894C29.9 50.5091 24.0028 58.4703 17.3453 63.3337C14.021 65.7621 10.5999 67.3449 7.79879 68.0317C6.39558 68.3757 5.22188 68.4767 4.33198 68.3936C3.42567 68.309 2.99364 68.0546 2.81424 67.8752C2.00874 67.0697 1.92814 66.4442 2.03925 65.8368C2.18504 65.0398 2.71872 64.0728 3.62502 62.8644C4.06221 62.2815 4.5409 61.6992 5.04421 61.0873L5.05718 61.0716C5.5447 60.4789 6.06053 59.8518 6.52084 59.2325C7.37086 58.0888 8.40003 56.5159 8.40003 54.7895C8.40003 53.4618 8.06871 52.2143 7.65626 51.0715C7.34648 50.2131 6.95125 49.3144 6.57148 48.4508C6.45725 48.191 6.34443 47.9345 6.23574 47.6831C5.26065 45.4282 4.40003 43.1144 4.40003 40.2894C4.40003 37.5066 5.23456 35.5925 6.18888 33.6838C6.27935 33.5029 6.37336 33.3183 6.46935 33.1298C7.3514 31.3977 8.40003 29.3386 8.40003 26.7895C8.40003 25.1009 7.59037 23.3888 6.80229 21.9781C6.33216 21.1366 5.72912 20.1742 5.15548 19.2588C4.78241 18.6634 4.42178 18.0879 4.11823 17.5784C3.25248 16.1251 2.65832 14.9175 2.45088 13.9321C2.26675 13.0575 2.42065 12.5973 2.81424 12.2037Z" fill={`${color}`} stroke="#333333" strokeWidth="4"/>
      <g clipPath="url(#clip0_4644_122402)">
        <rect x="28" width="80" height="80" rx="40" fill={`${color}`}/>
        <g style={{ mixBlendMode: 'multiply' }}>
          <path d="M28 80L108 0" stroke="#E0E0E0" strokeWidth="10"/>
          <path d="M48 80L128 0" stroke="#E0E0E0" strokeWidth="10"/>
          <path d="M58 90L138 10" stroke="#E0E0E0" strokeWidth="10"/>
          <path d="M68 100L148 20" stroke="#E0E0E0" strokeWidth="10"/>
          <path d="M18 70L98 -10" stroke="#E0E0E0" strokeWidth="10"/>
          <path d="M8 60L88 -20" stroke="#E0E0E0" strokeWidth="10"/>
          <path d="M-2 50L78 -30" stroke="#E0E0E0" strokeWidth="10"/>
        </g>
        <circle cx="68" cy="40" r="38" stroke="#333333" strokeWidth="4"/>
      </g>
      <defs>
        <clipPath id="clip0_4644_122402">
          <rect x="28" width="80" height="80" rx="40" fill="white"/>
        </clipPath>
      </defs>
    </svg>

  )
}

const Belt = ({ position, setPosition }) => {
  return (
    <img className={styles['belt-atom']} src={conveyorBelt} alt="conveyor belt" style={{ top: `${position.top}%`, left: `${position.left}%`, width: '120%' }}/>
  )
}

const ConveyorScanner = ({ algorithmIn, reinit, init, setScore, setReinit, setInit, isFinish, setNCandies }) => {
  const [startAnimation, setStartAnimation] = useState(true)
  const [positionBelt1, setPositionBelt1] = useState({ top: 0, left: 0 })
  const [positionBelt2, setPositionBelt2] = useState({ top: 0, left: 120 })
  const [positionCandies, setPositionCandies] = useState({ top: -10, left: -18 })
  const [positionScanner, setPositionScanner] = useState({ top: 0, left: 33 })
  const [timeGame, setTimeGame] = useState(0)
  const [time, setTime] = useState(0)
  const [timeScan, setTimeScan] = useState(0)
  const timeRef = useRef(null)
  const timeScanRef = useRef(null)
  const timeGameRef = useRef(null)
  const timeStep = useRef(30)
  const millis = 30
  const numberOfCandies = useRef(Math.floor(Math.random() * 6) + 4)
  const skips = useRef(Math.floor(Math.random() * 3) + 1)
  const candies = useRef(['red', 'fuchsia', 'blue', 'green', 'yellow', 'purple'].sort(() => Math.random() - 0.5))
  const candiesSelected = candies.current.slice(0, numberOfCandies.current)
  const candieHex = {
    red: '#FF7171',
    blue: '#3FDFE9',
    green: '#69E485',
    yellow: '#EDCA71',
    fuchsia: '#E78CFE',
    purple: '#9261F9'
  }
  const algorithmToDo = Array(candiesSelected.length).fill('scan').flatMap((item) => ([item].concat(Array(skips.current).fill('move')))).concat(['stop'])
  const [algorithm, setAlgorithm] = useState(algorithmToDo)

  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false
    }
    return arr1.every((element, index) => element === arr2[index])
  }

  const beginMovement = () => {
    timeRef.current = setInterval(() => {
      setTime(prev => prev + 1)
    }, millis)
  }
  const stopMovement = () => {
    clearInterval(timeRef.current)
  }
  const starScaning = () => {
    timeScanRef.current = setInterval(() => {
      setTimeScan(prev => prev + 1)
    }, millis)
  }
  const stopScaning = () => {
    clearInterval(timeScanRef.current)
    setPositionScanner({ top: 0, left: 33 })
  }

  useEffect(() => {
    if (isFinish) {
      const alg = algorithmIn
      alg.push('stop')
      const score = arraysAreEqual(alg, algorithmToDo) ? 1 : 0
      setScore(score)
    }
  }, [isFinish])

  useEffect(() => {
    if (init) {
      const alg = algorithmIn
      alg.push('stop')
      setAlgorithm(alg)
      clearInterval(timeRef.current)
      clearInterval(timeScanRef.current)
      clearInterval(timeGameRef.current)
      setPositionBelt1({ top: 0, left: 0 })
      setPositionBelt2({ top: 0, left: 120 })
      setPositionCandies({ top: -10, left: -18 })
      setPositionScanner({ top: 0, left: 33 })
      setTimeGame(0)
      setTime(0)
      setTimeScan(0)
      setStartAnimation(true)
      timeGameRef.current = setInterval(() => {
        setTimeGame(prev => prev + 1)
      }, millis)
      setInit(false)
    }
  }, [init])

  useEffect(() => {
    if (reinit) {
      setAlgorithm(algorithmToDo)
      clearInterval(timeRef.current)
      clearInterval(timeScanRef.current)
      clearInterval(timeGameRef.current)
      setPositionBelt1({ top: 0, left: 0 })
      setPositionBelt2({ top: 0, left: 120 })
      setPositionCandies({ top: -10, left: -18 })
      setPositionScanner({ top: 0, left: 33 })
      setTimeGame(0)
      setTime(0)
      setTimeScan(0)
      timeGameRef.current = setInterval(() => {
        setTimeGame(prev => prev + 1)
      }, millis)
      setReinit(false)
    }
  }, [reinit])

  useEffect(() => {
    if (startAnimation) {
      timeGameRef.current = setInterval(() => {
        setTimeGame(prev => prev + 1)
      }, millis)
    }
  }, [startAnimation])

  useEffect(() => {
    setNCandies(candiesSelected.length)
    return () => {
      clearInterval(timeRef.current)
      clearInterval(timeScanRef.current)
      clearInterval(timeGameRef.current)
    }
  }, [])

  useEffect(() => {
    if (timeGame % timeStep.current === 0) {
      if (algorithm[timeGame / timeStep.current] === 'move' && algorithm[(timeGame / timeStep.current) - 1] !== 'move') {
        stopScaning()
        beginMovement()
      } else if (algorithm[timeGame / timeStep.current] === 'scan' && algorithm[(timeGame / timeStep.current) - 1] !== 'scan') {
        stopMovement()
        starScaning()
      } else if (algorithm[timeGame / timeStep.current] === 'stop') {
        stopMovement()
        stopScaning()
        setStartAnimation(false)
      }
    }
  }, [timeGame])

  useEffect(() => {
    if (positionScanner.top >= 90) {
      clearInterval(timeScanRef.current)
    }
  }, [positionScanner])

  useEffect(() => {
    setPositionScanner({ top: positionScanner.top + 3, left: positionScanner.left })
  }, [timeScan])

  useEffect(() => {
    setPositionBelt1({ top: positionBelt1.top, left: positionBelt1.left + 1 })
    setPositionBelt2({ top: positionBelt2.top, left: positionBelt2.left + 1 })
    setPositionCandies({ top: positionCandies.top, left: positionCandies.left + 1 })
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
      <ScannerLaser position={positionScanner} setPosition={setPositionScanner} timeRef={timeScanRef} />
      <div className={styles['belts-container']}>
        {
          candiesSelected.map((candy, index) => <Candy key={index} color={candieHex[candy]} position={{ ...positionCandies, left: 60 + positionCandies?.left - index * skips.current * 30 }}/>)
        }
        <Belt position={positionBelt1}/>
        <Belt position={positionBelt2}/>
      </div>
    </div>
  )
}
export default ConveyorScanner
