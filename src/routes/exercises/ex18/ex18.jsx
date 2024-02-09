import { useState, useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import ConveyorScanner from '../components/conveyorScanner'
import DndForComponent from '../components/dndForComponent'
import styles from '../../../styles/ex18.module.css'
import useData from '../../../hooks/useData'
const Ex18 = () => {
  const { data } = useData('ex18')
  const [myData, setMyData] = useState({
    ...data
  })
  const [init, setInit] = useState(false)
  const [optionsData, setOptionsData] = useState([])
  const [dao, setDao] = useState([])
  const [reinit, setReinit] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [numberOfCandies, setNumberOfCandies] = useState(0)

  useEffect(() => {
    setMyData({
      ...data
    })
  }, [data])

  useEffect(() => {
    let rep = Number(optionsData[optionsData.length - 1]?.[1])
    if (rep >= 9) {
      rep = 9
    } else if (isNaN(rep) || rep < 1) {
      rep = 1
    }

    const newDao = []
    for (let i = 0; i < rep; i++) {
      for (let j = 0; j < optionsData.length - 1; j++) {
        newDao.push(optionsData[j][0])
      }
    }

    setDao(newDao)
  }, [optionsData])
  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold}>
      {
        (setScore, setPhase) => (
          <div className={styles['game-container']}>
            <div className={styles['algorithm-animation-container']}>
              <div className={styles['production-draggables']}>
                <div className={styles['production-info']}>
                  {`${myData.production} ${numberOfCandies} ${myData.sweet}.`}
                </div>
                <DndForComponent data={myData} returnScore={setOptionsData} reset={reinit} />
              </div>
              <div>
                <ConveyorScanner
                  setNCandies={setNumberOfCandies}
                  isFinish={isFinish}
                  setScore={setScore}
                  setPhase={setPhase}
                  init={init}
                  reinit={reinit}
                  setInit={setInit}
                  setReinit={setReinit}
                  algorithmIn={dao}
                />
              </div>
            </div>
            <div className={`${styles['btns-container']}`}>
              <div className={`${styles['btn-game']} ${styles['btn-game-white']}`} onClick={() => { setReinit(true) }}>{myData.reset}</div>
              <div className={`${styles['btn-game']} ${styles['btn-game-purple']}`} onClick={() => { setInit(true) }}>{myData.start}</div>
              <div
                className={`${styles['btn-game']} ${styles['btn-game-orange']}`} onClick={() => {
                  setIsFinish(true)
                }}
              >{myData.end}
              </div>
            </div>
          </div>
        )
      }
    </ScoringComponent>

  )
}

export default Ex18
