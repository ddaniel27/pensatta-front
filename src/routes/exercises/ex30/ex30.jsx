import { useState, useEffect } from 'react'
import DndComponent from '../components/dndComponent'
import ScoringComponent from '../components/scoringComponent'
import RobotGame from '../components/robotGame'
import styles from '../../../styles/ex30.module.css'
import useData from '../../../hooks/useData'

export default function Ex30 () {
  const { data } = useData('ex30')
  const [numCubes] = useState(Math.floor(Math.random() * 5) + 2)
  const [sequence, setSequence] = useState([])
  const [start, setStart] = useState(false)
  const [next, setNext] = useState(false)
  const [robotData, setRobotData] = useState({ color: [], direction: [] })
  const [reset, setReset] = useState(false)
  const [myData, setMyData] = useState({
    ...data,
    columns: { ...data.columns, 'column-1': { ...data.columns['column-1'], title: `${data.production} ${numCubes}` } }
  })

  useEffect(() => {
    setMyData({
      ...data,
      columns: { ...data.columns, 'column-1': { ...data.columns['column-1'], title: `${data.production} ${numCubes}` } }
    })
  }, [data])

  useEffect(() => {
    setStart(checkArray(sequence))
  }, [sequence])

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  }, [reset])

  useEffect(() => {
    if (next) {
      const result = createData(sequence, numCubes)
      setRobotData(result)
    }
  }, [next])

  return (
    <ScoringComponent initMessages={data.initMessages} title={data.title} background={data.color} threshold={data.threshold} exerciseId={data.id}>
      {(setScore, setPhase) => (
        <div className={styles['all-game-container']}>
          <div className={styles['game-container']}>
            <DndComponent data={myData} returnScore={setSequence} reset={reset} />
            <RobotGame {...robotData} />
          </div>
          <div className={styles['btns-container']}>
            {sequence.length && !next &&
              <div
                className={`${styles['btn-game']} ${styles['btn-game-white']}`}
                onClick={() => { setReset(true) }}
              >
                {myData.btnAgain}
              </div>}
            {start && !next &&
              <div
                className={`${styles['btn-game']} ${styles['btn-game-orange']}`}
                onClick={() => { setNext(true) }}
              >
                {myData.btnStart}
              </div>}
            {next &&
              <div
                className={`${styles['btn-game']} ${styles['btn-game-orange']}`}
                onClick={() => { checkResult(robotData, setScore, setPhase) }}
              >
                {myData.btnNext}
              </div>}
          </div>
        </div>

      )}
    </ScoringComponent>
  )
}

function checkResult (data, cb1, cb2) {
  const { color, direction } = data
  const color2 = [color[0], color[1]]
  const direction2 = [direction[0], direction[1]]

  if ((color2[0] === 'green' && direction2[0] === 'left') || (color2[0] === 'fuchsia' && direction2[0] === 'right')) {
    cb1(1)
  } else {
    cb1(0)
  }

  cb2('end')
}

function createData (array, n) {
  const colors = []
  const directions = []

  array.forEach(row => {
    if (row[0] === 'color') colors.push(row[1] === 'verde' ? 'green' : 'fuchsia')
    if (row[0] === 'direction') directions.push(row[1] === 'derecha' ? 'right' : 'left')
  })

  const colors2 = [].concat(...Array(n).fill(colors))
  const directions2 = [].concat(...Array(n).fill(directions))

  return ({
    color: colors2,
    direction: directions2
  })
}

function checkArray (array) {
  if (array.length !== 4) return false
  let count = 0
  let count2 = 0

  for (let i = 0; i < array.length; i++) {
    const row = array[i]
    if (row[0] === 'color') count++
    if (row[0] === 'direction') count--

    if (row[1] === '') return false
    if (row[1] === 'izquierda') count2++
    if (row[1] === 'derecha') count2--
    if (row[1] === 'verde') count2++
    if (row[1] === 'rosa') count2--
  }

  return (count === 0 && count2 === 0)
}
