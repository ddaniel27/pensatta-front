import React, { useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import UniqueOptionImg from '../components/uniqueOptionImg'
import useData from '../../../hooks/useData'

export default function Ex47 () {
  const { data } = useData('ex47')
  // eslint-disable-next-line no-unused-vars
  const [myData, setMyData] = React.useState({
    ...data,
    options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
  })

  useEffect(() => {
    setMyData({
      ...data,
      options: data.options.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })
  }, [data])

  const [value, setValue] = React.useState(null)
  const [nextQuestion, setNextQuestion] = React.useState(false)

  React.useEffect(() => {
    if (nextQuestion) {
      document.querySelector(`.uniqueOptionImg p.uni-opt-img-${myData.options[0].correct}`).style.backgroundColor = '#69E485'
    }
  }, [nextQuestion])

  const handleClick = (cb1, cb2) => {
    const newValue = value === myData.options[0].correct ? 1 : 0
    cb1(newValue)
    cb2('end')
  }

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <div className="animation-ex28">
            <div className="animation-related-ex47">
              <h3>{myData.title}</h3>
              <span>{myData.options[0].question}</span>
            </div>
            <div className="options-related">
              <UniqueOptionImg path={myData.path} options={myData.options[0].options} returnScore={setValue} disabled={nextQuestion} />
            </div>
            {!nextQuestion && <button className="button-play" onClick={() => { setNextQuestion(true) }} disabled={!value}>{myData.btnAnswer}</button>}
            {nextQuestion && <button className="button-play" onClick={() => { handleClick(setScore, setPhase) }}>{myData.btnNext}</button>}
          </div>
        )
      }
    </ScoringComponent>
  )
}
