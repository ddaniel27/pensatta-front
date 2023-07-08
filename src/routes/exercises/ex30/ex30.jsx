import { useState } from 'react'
import DndComponent from '../components/dndComponent'
import ScoringComponent from '../components/scoringComponent'
import RobotGame from '../components/robotGame'
import data from './data.json'
import styles from '../../../styles/ex30.module.css'

export default function Ex30 () {
  const [numCubes] = useState(Math.floor(Math.random() * 5) + 2)
  const [myData] = useState({
    ...data,
    columns: { ...data.columns, 'column-1': { ...data.columns['column-1'], title: `Producción hoy: ${numCubes}` } }
  })
  return (
    <ScoringComponent initMessages={data.initMessages} title={data.title} background={data.color} threshold={data.threshold} exerciseId={data.id}>
      {(setScore, setPhase) => (
        <div className={styles['all-game-container']}>
          <div className={styles['game-container']}>
            <DndComponent data={myData} />
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
