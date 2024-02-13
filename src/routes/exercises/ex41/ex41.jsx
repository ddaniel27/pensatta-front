import React, { useEffect } from 'react'
import ImageSelector from '../components/imageSelector'
import ImageSelected from '../components/imageSelected'
import NoScoringComponent from '../components/noScoringComponent'

import '../../../styles/ex41.css'
import useData from '../../../hooks/useData'

export default function Ex41 () {
  const { data } = useData('ex41')
  const [myData, setMyData] = React.useState({
    ...data
  })

  const [selectedImage, setSelectedImage] = React.useState(null)
  const [selectedValue, setSelectedValue] = React.useState(null)
  const [currentIndex, setCurrentIndex] = React.useState(2)
  const [currentInput1, setCurrentInput1] = React.useState(null)
  const [currentInput2, setCurrentInput2] = React.useState(null)
  const [outputValue, setOutputValue] = React.useState(null)

  const inputArr = [setCurrentInput1, setCurrentInput2, () => {}]

  useEffect(() => {
    setMyData({ ...data })
  }, [data])

  const handleChange = ({ target }) => {
    if (target.checked) {
      setCurrentIndex(target.value)
    }
  }

  const operationDictionary = {
    and: (a, b) => (a && b ? 1 : 0),
    or: (a, b) => (a || b ? 1 : 0),
    xor: (a, b) => (a != b ? 1 : 0),
    nand: (a, b) => (a && b ? 0 : 1),
    nor: (a, b) => (a || b ? 0 : 1),
    xnor: (a, b) => (a != b ? 0 : 1)
  }

  React.useEffect(() => {
    if (selectedImage !== null && currentIndex < 2 && currentInput1 !== null && currentInput2 !== null) {
      setOutputValue(operationDictionary[selectedValue](currentInput1, currentInput2))
    }
  }, [currentIndex, currentInput1, currentInput2, selectedImage])

  return (
    <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
      {
        (setPhase) => (
          <div className="ex41">
            <div className="schema-container">
              <div className="inputs-container">
                <label>
                  <input type="radio" name="inputs" value="0" onChange={handleChange} hidden />
                  <span className="input-1">{currentInput1 !== null ? currentInput1 : 'X'}</span>
                </label>
                <label>
                  <input type="radio" name="inputs" value="1" onChange={handleChange} hidden/>
                  <span className="input-2">{currentInput2 !== null ? currentInput2 : 'X'}</span>
                </label>
              </div>
              <div className="operator-container">
                <ImageSelected
                  img={selectedImage}
                  hasBackground={false}
                />
              </div>
              <div className="outputs-container">
                <span className="output-1">{outputValue}</span>
              </div>
            </div>
            <div className="images-container">
              <div className="input-selector">
                <span onClick={() => { inputArr[currentIndex](1) }}>1</span>
                <span onClick={() => { inputArr[currentIndex](0) }}>0</span>
              </div>
              <ImageSelector
                options={myData.options}
                setCurrentValue={setSelectedValue}
                setCurrentImage={setSelectedImage}
                hasBackground={false}
              />
              <div className="description">
                <p>{selectedValue?.toUpperCase() || myData.description.text1}</p>
                <span>{myData.descriptions[selectedValue] || myData.description.text2}</span>
              </div>
            </div>
            <button onClick={() => { setPhase('end') }}>{myData.btnEnd}</button>
          </div>
        )
      }
    </NoScoringComponent>
  )
}
