import { useState, useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import Timer from '../components/timer'
import DndVonListComponent from '../components/dndVonListComponent'
import useData from "../../../hooks/useData"
import '../../../styles/ex15.css'

export default function Ex15 () {
  const { data } = useData("ex15")
  const [myData, setMyData] = useState({
    ...data,
    variations: data.variations.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
  })

  useEffect(() => {
    setMyData({
      ...data,
      variations: data.variations.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
    })
  }, [data])

  const [value, setValue] = useState(null)
  const [nextQuestion, setNextQuestion] = useState(false)

  function delay (n) {
    return new Promise(function (resolve) {
      setTimeout(resolve, n)
    })
  }

  async function handleTimer (time, cb1, cb2) {
    if (time <= 1) {
      let counter = 0
      setNextQuestion(true)
      document.querySelector('.droppable-von-list').childNodes.forEach((child, idx) => {
        if (child.id === myData.variations.sequence[idx]) {
          child.style.backgroundColor = 'green'
          counter++
        } else {
          child.style.backgroundColor = 'red'
        }
      })
      cb1(counter)
      await delay(2000)
      cb2('end')
    }
  }

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <div className='list-ex15'>
            <Timer startTime={20} returnTimerValue={(ti) => { handleTimer(ti, setScore, setPhase) }} />
            <DndVonListComponent data={myData.variations} returnScore={setValue} block={nextQuestion} />
          </div>
        )
      }
    </ScoringComponent>
  )
}
