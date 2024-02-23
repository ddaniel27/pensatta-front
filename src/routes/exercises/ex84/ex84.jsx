import React, { useEffect } from 'react'
import ScreenRenderUniqueOptionsEncapsulate from '../components/screenRenderUniqueOptionsEncapsulate'
import ScoringComponent from '../components/scoringComponent'
import '../../../styles/ex84.css'
import useData from '../../../hooks/useData'

export default function Ex69 () {
  const { data } = useData('ex84')
  // eslint-disable-next-line no-unused-vars
  const [myData, setMyData] = React.useState({
    ...data,
    options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
  })
  const [nextQuestion, setNextQuestion] = React.useState(false)

  useEffect(() => {
    setMyData({
      ...data,
      options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })
  }, [data])

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <>
            {!nextQuestion
              ? <>
                <div className="ex84-img-container">
                  <img src={`images/exercises/84/${myData.lg}/Tendencias_2.svg`} alt="tendencias2" />
                  <img src={`images/exercises/84/${myData.lg}/Tendencias_1.svg`} alt="tendencias1" />
                </div>
                <button className="button" onClick={() => setNextQuestion(true)}>{myData.btnStart}</button>
              </>
              : <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={false} returnScore={setScore} isFinished={setPhase} center={true}/>
            }
          </>
        )
      }
    </ScoringComponent>
  )
}
