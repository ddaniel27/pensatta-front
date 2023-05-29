import { useState } from 'react'
import data from './data.json'
import ScoringComponent from '../components/scoringComponent'
import ConveyorScanner from '../components/conveyorScanner'
import styles from '../../../styles/ex18.module.css'
const Ex18 = () => {
  const myData = data
  const [init, setInit] = useState(false)
  const [reinit, setReinit] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [numberOfCandies, setNumberOfCandies] = useState(0)
  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold}>
      {
        (setScore, setPhase) => (
          <div className={styles['game-container']}>
            <div className={styles['algorithm-animation-container']}>
              <div className={styles['production-draggables']}>
                <div className={styles['production-info']}>
                  {`Producción de hoy: ${numberOfCandies} dulces.`}
                </div>
                <div>
                  ALGORITMO IZQUIERDA DANIEL
                </div>
              </div>
              <div>
                ALGORITMO DERECHA DANIEL
              </div>
              <div>
                <ConveyorScanner setNCandies={setNumberOfCandies} isFinish={isFinish} setScore={setScore} setPhase={setPhase} init={init} reinit={reinit} setInit={setInit} setReinit={setReinit} />
              </div>
            </div>
            <div className={`${styles['btns-container']}`}>
              <div className={`${styles['btn-game']} ${styles['btn-game-white']}`} onClick={() => { setReinit(true) }}>REINICIAR</div>
              <div className={`${styles['btn-game']} ${styles['btn-game-purple']}`} onClick={() => { setInit(true) }}>INICIAR</div>
              <div
                className={`${styles['btn-game']} ${styles['btn-game-orange']}`} onClick={() => {
                  setPhase('end')
                  setIsFinish(true)
                }}
              >FINALIZAR
              </div>
            </div>
          </div>
        )
      }
    </ScoringComponent>

  )
}

export default Ex18
