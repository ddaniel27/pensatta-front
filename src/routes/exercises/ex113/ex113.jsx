import React, { useEffect } from 'react'
import ScoringComponent from '../components/scoringComponent'
import '../../../styles/ex05.css'
import useData from '../../../hooks/useData'

export default function Ex113 () {
  const { data } = useData('ex113')
  const [myData, setMyData] = React.useState(() => {
    const randomOptions = data.options.sort(() => 0.5 - Math.random()).slice(0, 1)[0];
    const { message, placeholder } = randomOptions;
    return {
      ...data,
      dictionary: data.dictionary.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect),
      message: message,
      placeholder: placeholder
    };
  })
  const [encryptedMessage, setEncryptedMessage] = React.useState('')
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    if (myData.message) {
      const message = myData.message.toUpperCase()
      const hashMap = Object.fromEntries(myData.dictionary[0])
      const encryptedMessageT = []
      for (let i = 0; i < message.length; i++) {
        const hashed = hashMap[message[i]] || ' '
        encryptedMessageT.push(hashed.length > 1 ? <div className="square" style={{ backgroundColor: `${hashed}` }} /> : hashMap[message[i]])
      }
      setEncryptedMessage(encryptedMessageT)
    }
  }, [myData])

  useEffect(() => {
    setMyData(() => {
    const randomOptions = data.options.sort(() => 0.5 - Math.random()).slice(0, 1)[0];
    const { message, placeholder } = randomOptions;
    return {
      ...data,
      dictionary: data.dictionary.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect),
      message: message,
      placeholder: placeholder
    };
  })
  }, [data])

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  const handleClick = (cb1, cb2) => {
    if (value.toUpperCase() === myData.message.toUpperCase()) {
      cb1(1)
    } else {
      cb1(0)
    }
    cb2('end')
  }

  return (
    <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
      {
        (setScore, setPhase) => (
          <div className="cypher">
            <div className="cypher-map">
              {myData.dictionary[0].map((item, idx) => (
                <div key={idx} className="cypher-map-item">
                  <span className="symbol">{item[1].length > 1 ? <div className="square" style={{ backgroundColor: `${item[1]}` }} /> : item[1]}</span>
                  <span className="letter">{item[0]}</span>
                </div>
              ))}
            </div>
            <div className="cypher-test">
              <p>{encryptedMessage}</p>
              <input type="text" placeholder={myData.placeholder} value={value} onChange={handleChange} />
            </div>
            <button className="button-play" onClick={() => { handleClick(setScore, setPhase) }} disabled={!value.length}>{myData.btnEnd}</button>
          </div>
        )
      }
    </ScoringComponent>
  )
}
