import { useEffect, useState } from 'react'
import styles from '../../../styles/ex30.module.css'
import ScoringComponent from '../components/scoringComponent'
import RobotGame from '../components/robotGame'
import data from './data.json'

export default function Ex30 () {
  const [numCubes] = useState(Math.floor(Math.random() * 5) + 2)
  return (
    <ScoringComponent initMessages={data.initMessages} title={data.title} background={data.color} threshold={data.threshold} exerciseId={data.id}>
      {(setScore, setPhase) => (
        <div className={styles['all-game-container']}>
          <div className={styles['game-container']}>
            <div className={styles['info-and-dnd-container']}>
              <div className={styles['info-container']}>
                {`Producción de hoy: ${numCubes} cubos.`}
              </div>
            </div>
            <RobotGame />
          </div>
          <div className={styles['btns-container']}>
            <div className={`${styles['btn-game']} ${styles['btn-game-white']}`}>REINICIAR</div>
            <div className={`${styles['btn-game']} ${styles['btn-game-orange']}`}>SIGUIENTE</div>
          </div>
        </div>

      )}
    </ScoringComponent>
  )
}
