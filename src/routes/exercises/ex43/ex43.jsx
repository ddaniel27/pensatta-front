import React, { useEffect } from 'react'
import AvatarCreator from '../components/avatarCreator'
import SelectorWithArrow from '../components/selectorWithArrow'
import NoScoringComponent from '../components/noScoringComponent'

import '../../../styles/ex43.css'
import useData from '../../../hooks/useData'

export default function Ex43 () {
  const { data } = useData('ex43')
  const [myData, setMyData] = React.useState({
    ...data
  })

  const [body, setBody] = React.useState(0)
  const [eyes, setEyes] = React.useState(0)
  const [glass, setGlass] = React.useState(0)
  const [acc1, setAcc1] = React.useState(0)
  const [acc2, setAcc2] = React.useState(0)

  const setArr = [setBody, setEyes, setGlass, setAcc1, setAcc2]

  useEffect(() => {
    setMyData({ ...data })
  }, [data])

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <div className="ex43">
            <AvatarCreator
              body={body.index}
              eyes={eyes.index}
              glass={glass.index}
              acc1={acc1.index}
              acc2={acc2.index}
            />
            <div className="selector-field">
              {
                myData.options.map((option, index) => (
                  <SelectorWithArrow
                    key={index}
                    title={option.title}
                    options={option.options}
                    min={0}
                    max={option.options.length - 1}
                    returnValue={setArr[index]}
                  />
                ))
              }
            </div>
            <button onClick={() => { setPhase('end') }}>{myData.btnEnd}</button>
          </div>
        )
      }
    </NoScoringComponent>
  )
}
