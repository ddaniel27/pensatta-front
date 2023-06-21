import { useState, useEffect } from 'react'
import MazeProgMoveComponent from '../components/zorritoMazeProgMove'
import ScoringComponent from '../components/ScoringComponent'
import styles from '../../../styles/ex74.module.css'
import data from './data.json'

export default function Ex74 () {
  return (
    <ScoringComponent initMessages={data.initMessages} title={data.name} background={data.color} exerciseId={data.id} threshold={data.threshold}>
      {(setScore, setPhase) => (
        <div className={styles['']}>
          <MazeProgMoveComponent lab ={10} algorithm={['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp']}/>
        </div>
      )}
    </ScoringComponent>

  )
}
