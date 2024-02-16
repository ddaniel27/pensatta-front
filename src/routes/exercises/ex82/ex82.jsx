import React, { useEffect } from 'react'
import ScreenRenderUniqueOptionsEncapsulate from '../components/screenRenderUniqueOptionsEncapsulate'
import Timer from '../components/timer'
import ScoringComponent from '../components/scoringComponent'
import '../../../styles/ex82.css'
import useData from '../../../hooks/useData'

export default function Ex82 () {
  const { data } = useData('ex82')
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

  async function handleTimer (time, cb1, cb2) {
    if (time <= 1) {
      cb1(0)
      cb2('end')
    }
  }

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <>
            {!nextQuestion
              ? <>
                <div className="paragraph">
                  <p>{myData.text}</p>
                </div>
                <button className="button" onClick={() => setNextQuestion(true)}>{myData.btnStart}</button>
              </>
              : <div className="timer-and-options">
                <Timer startTime={80} returnTimerValue={(t) => { handleTimer(t, setScore, setPhase) }}/>
                <ScreenRenderUniqueOptionsEncapsulate data={myData} hasImages={false} returnScore={setScore} isFinished={setPhase} center={false}/>
              </div>
            }
          </>
        )
      }
    </ScoringComponent>
  )
}
