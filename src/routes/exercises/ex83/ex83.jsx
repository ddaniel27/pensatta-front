import { useState, useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import DfdSelect from '../components/dfdSelect'
import useData from "../../../hooks/useData"
import '../../../styles/ex83.css'

export default function ex83 () {
  const { data } = useData("ex83")
  const [myData, setMyData] = useState({ ...data })

  useEffect(() => {
    setMyData({ ...data })
  }, [data])

  const variations = myData.variations[0]
  return (
    <ScoringComponent initMessages={myData.initMessages} title={myData.name} background={myData.color} exerciseId={myData.id} threshold={myData.threshold}>
      {
        (setScore, setPhase) => (
          <div className='ex83-container'>
            <img src={`/images/exercises/83/${variations.image}`} />
            <DfdSelect purple={variations.purple} yellow={variations.yellow} gray1={variations.gray1} gray2={variations.gray2} gray3={variations.gray3} gray4={variations.gray4} corrects={variations.corrects} setScore={setScore} setPhase={setPhase} />
          </div>
        )
      }
    </ScoringComponent>
  )
}
