import { useState, useEffect } from 'react'
import MazeProgMoveComponent from '../components/zorritoMazeProgMove'
import ScoringComponent from '../components/scoringComponent'
import GenericSelector from '../../components/genericSelector'
import styles from '../../../styles/ex74.module.css'
import Timer from '../components/timer2'
import useData from '../../../hooks/useData'

export default function Ex74 () {
  const { data } = useData('ex74')
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [up, setUp] = useState('')
  const [down, setDown] = useState('')
  const [scr, setScr] = useState(0)
  const [isFinish, setIsFinish] = useState(false)
  const [myData, setMyData] = useState(data)

  useEffect(() => {
    setMyData(data)
  }, [data])

  const onFinishTime = () => {
    setIsFinish(true)
  }

  useEffect(() => {
    if (!isFinish) {
      const corrects = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
      const numberOfCorrects = [left, right, up, down].filter((direction, index) => direction === corrects[index]).length
      setScr(numberOfCorrects)
    }
  }, [left, right, up, down])

  return (
    <ScoringComponent initMessages={myData.initMessages} title={myData.name} background={myData.color} exerciseId={myData.id} threshold={myData.threshold}>
      {(setScore, setPhase) => (
        <div className={styles['all-game-container']}>
          <div className={styles['timer-container']}><Timer finishFunction={onFinishTime} startTime={30} stopTimer={isFinish}/></div>
          <div className={styles['whole-game']}>
            <div className={styles['dropdown-section']}>
              <ChangeKey text={myData.moves.top} setDirection={setUp} data={myData} />
              <ChangeKey text={myData.moves.bottom} setDirection={setDown} data={myData} />
              <ChangeKey text={myData.moves.left} setDirection={setLeft} data={myData} />
              <ChangeKey text={myData.moves.right} setDirection={setRight} data={myData} />
            </div>
            <MazeProgMoveComponent lab={10} algorithm={[right, left, down, up]} score={scr} setIsFinish={setIsFinish} isFinish={isFinish}/>
          </div>
          {isFinish && <button onClick={ () => {
            setScore(scr)
            setPhase('end')
          }}>{myData.btnNext}</button>}
        </div>
      )}
    </ScoringComponent>
  )
}

function ChangeKey ({ text = 'Selecciona la tecla a cambiar', setDirection, data }) {
  return (
    <div className={styles['change-key']}>
      <span>{text}</span>
      <GenericSelector defaultLabel={data.defaultLabel} options={data.options} setCurrentValue={setDirection} />
    </div>
  )
}
