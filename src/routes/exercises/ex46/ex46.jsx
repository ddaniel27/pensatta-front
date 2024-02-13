import React, { useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import DndComponent from '../components/dndComponent'
import useData from '../../../hooks/useData'
import '../../../styles/ex10.css'

export default function Ex46 () {
  const { data } = useData('ex46')
  // eslint-disable-next-line no-unused-vars
  const [myData, setMyData] = React.useState({
    ...data,
    variations: {
      ...data.variations.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)[0],
      isSingle: true
    }
  })
  const [start, setStart] = React.useState(false)
  const [reset, setReset] = React.useState(false)

  const [optionsData, setOptionsData] = React.useState({})

  const [rojo, setRojo] = React.useState(null)
  const [verde, setVerde] = React.useState(null)

  const rojoRef = React.useRef(null)
  const verdeRef = React.useRef(null)

  function delay (n) {
    return new Promise(function (resolve) {
      setTimeout(resolve, n)
    })
  }

  useEffect(() => {
    setMyData({
      ...data,
      variations: {
        ...data.variations.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)[0],
        isSingle: true
      }
    })
  }, [data])

  React.useEffect(() => {
    async function test () {
      while (!rojoRef.current && !verdeRef.current) {
        await new Promise(r => setTimeout(r, 500))
        console.log('waiting...')
      }
      setRojo(rojoRef.current)
      setVerde(verdeRef.current)
    }
    test()
  }, [])

  React.useLayoutEffect(() => {
    if (reset) {
      setReset(false)
    }
  }, [optionsData])

  const handleClick = async (cb1, cb2) => {
    document.querySelector('.maze-style').scrollTop = 0
    setStart(true)
    // if(optionsData[0][1] === 1 && optionsData[1][1] === 4 && optionsData[2][1] === 2 && optionsData[3][1] === 3 && optionsData.length === 4){
    if (optionsData.every((item, idx) => item[1] === myData.variations.sequence[idx]) && optionsData.length === 4) {
      verde.style['fill-opacity'] = '0'
      cb1(1)
    } else {
      rojo.style['fill-opacity'] = '0'
      cb1(0)
    }
    await delay(1000)
    cb2('end')
  }

  const handleReset = () => {
    setStart(false)
    setOptionsData({})
    setReset(true)
  }

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <div className="maze-style">
            <DndComponent data={myData.variations} returnScore={setOptionsData} reset={reset} />
            <div className="info-box">
              <svg width="180" height="80" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="180" height="80" rx="20" fill="#F2F2F2"/>
                <circle cx="40" cy="40" r="20" fill="#69E485"/>
                <circle id="s1" cx="40" cy="40" r="20" fill="#4F4F4F" fillOpacity="0.65" ref={verdeRef}/>
                <circle cx="140" cy="40" r="20" fill="#FF7171"/>
                <circle id="s2" cx="140" cy="40" r="20" fill="#4F4F4F" fillOpacity="0.65" ref={rojoRef}/>
              </svg>
              <span>{myData.title}</span>
            </div>

            <div className="buttons-field">
              {optionsData.length > 0 && <button onClick={handleReset} className="restart">{myData.btnAgain}</button>}
              <button onClick={() => { handleClick(setScore, setPhase) }} disabled={!optionsData.length}>{myData.btnStart}</button>
            </div>
          </div>
        )
      }
    </ScoringComponent>
  )
}
