import { useState, useEffect } from 'react'
import MazeProgMoveComponent from '../components/zorritoMazeProgMove'
import ScoringComponent from '../components/ScoringComponent'
import GenericSelector from '../../components/genericSelector'
import styles from '../../../styles/ex74.module.css'
import data from './data.json'

export default function Ex74 () {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [up, setUp] = useState('')
  const [down, setDown] = useState('')
  const [validation, setValidation] = useState(false)

  useEffect(() => {
    if (left === 'ArrowLeft' && right === 'ArrowRight' && up === 'ArrowUp' && down === 'ArrowDown') {
      setValidation(true)
    } else {
      setValidation(false)
    }
  }, [left, right, up, down])

  return (
    <ScoringComponent initMessages={data.initMessages} title={data.name} background={data.color} exerciseId={data.id} threshold={data.threshold}>
      {(setScore, setPhase) => (
        <div className={styles['whole-game']}>
          <div className={styles['dropdown-section']}>
            <ChangeKey text='Moverse hacia arriba' setDirection={setUp} />
            <ChangeKey text='Moverse hacia abajo' setDirection={setDown} />
            <ChangeKey text='Moverse hacia la izquierda' setDirection={setLeft} />
            <ChangeKey text='Moverse hacia la derecha' setDirection={setRight} />
          </div>
          <MazeProgMoveComponent lab={10} algorithm={[right, left, down, up]} />
        </div>
      )}
    </ScoringComponent>
  )
}

function ChangeKey ({ text = 'Selecciona la tecla a cambiar', setDirection }) {
  const options = [
    { value: 'ArrowUp', label: 'Flecha hacia arriba' },
    { value: 'ArrowDown', label: 'Flecha hacia abajo' },
    { value: 'ArrowLeft', label: 'Flecha hacia la izquierda' },
    { value: 'ArrowRight', label: 'Flecha hacia la derecha' }
  ]
  return (
    <div className={styles['change-key']}>
      <span>{text}</span>
      <GenericSelector defaultLabel='Asigna una flecha' options={options} setCurrentValue={setDirection} />
    </div>
  )
}
