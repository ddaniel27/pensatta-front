import { useState, useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import DndVonListComponent from '../components/dndFor108'
import useData from "../../../hooks/useData"
import '../../../styles/ex108.css'

export default function Ex15 () {
  const { data } = useData("ex108")
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


  const [values, setValues] = useState([])
  const [isDone, setIsDone] = useState(false)

  const checkResult = () => {
    let score = 0
    const listOfItems = document.querySelectorAll('.draggable-108-item')
    values.forEach((value, index) => {
      if (value !== myData.variations.sequence[index].id) {
        listOfItems[index].classList.remove('correct-108')
        listOfItems[index].classList.add('wrong-108')
      } else {
        listOfItems[index].classList.remove('wrong-108')
        listOfItems[index].classList.add('correct-108')
        score++
      }
    })
    return score
  }

  const handleClick = (cb) => {
    const score = checkResult()
    cb(score)
    setIsDone(true)
  }

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <div className='list-ex108'>
            <DndVonListComponent data={myData.variations} returnScore={setValues} />
            {!isDone && <button className='btn btn-primary' onClick={() => handleClick(setScore)}>{myData["answer-button"]}</button>}
            {isDone && <button className='btn btn-primary' onClick={() => setPhase('end')}>{myData["next-button"]}</button>}
          </div>
        )
      }
    </ScoringComponent>
  )
}
