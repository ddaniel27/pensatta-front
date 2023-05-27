import React, { useState, useEffect, useRef } from 'react'
import data from './data.json'
import ScoringComponent from '../components/scoringComponent'
import ConveyorScanner from '../components/conveyorScanner'
import styles from '../../../styles/ex18.module.css'
const Ex18 = () => {
  const myData = data
  const [init, setInit] = useState(false)
  const [reinit, setReinit] = useState(false)
  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold}>
      {
        (setScore, setPhase) => (
          <div>
            <ConveyorScanner setScore={setScore} setPhase={setPhase} init={init} reinit={reinit} />
            <div className={`${styles['btns-container']}`}>
              <div className={`${styles['btn-game']} ${styles['btn-game-white']}`} onClick={() => setReinit(true)}>REINICIAR</div>
              <div className={`${styles['btn-game']} ${styles['btn-game-purple']}`} onClick={() => setInit(true)}>INICIAR</div>
              <div className={`${styles['btn-game']} ${styles['btn-game-orange']}`} onClick={() => setPhase('end')}>FINALIZAR</div>
            </div>
          </div>
        )
      }
    </ScoringComponent>

  )
}

export default Ex18
