import { useState } from 'react'
import ScoringComponent from '../components/scoringComponent'
import TankGameComponent from '../components/tankGameComponent'
import data from './data.json'
import styles from '../../../styles/ex92.module.css'

export default function Ex92 () {
  const [stage, setStage] = useState(0)
  return (
    <ScoringComponent initMessages={data.initMessages} title={data.name} background={data.color} threshold={data.threshold} exerciseId={data.id}>
      {
        (setScore, setPhase) => (
          <>
            {
              stage == 0 &&
              <div className={styles['fase-1']}>
                Fase 1
                <button onClick={() => setStage(1)}>SIGUIENTE</button>
              </div>
            }
            {stage == 1 &&
            <TankGameComponent setPhase={setPhase} setScore={setScore}
              algorithm = {[{ function: 'tempIncrease', tank: 1 }, { function: 'decreasePressure', tank: 1 }, { function: 'fromOneToAnother', tank: 1 }, { function: 'tempDecrease', tank: 2 }]}
              corrects = {[{ function: 'tempIncrease', tank: 1 }, { function: 'decreasePressure', tank: 1 }, { function: 'fromOneToAnother', tank: 2 }, { function: 'tempDecrease', tank: 2 }]}/>
            }
          </>
        )
      }
    </ScoringComponent>
  )
}
