import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import UniqueOption from './uniqueOption'
import MultipleOption from './multipleOption'
import '../../../styles/screenRenderUniqueOptionsEncapsulate.css'
import '../../../styles/screenRenderUniqueOption.css'

export default function ScreenRenderUniqueOptionsEncapsulate ({ data, hasImages = false, returnScore, isFinished, center = false, hasBackground = false, smallImg = false }) {
  const [currentOption, setCurrentOption] = useState({})
  const [optionsSet, setOptionsSet] = useState([])
  const [score, setScore] = useState(false)
  const [gobalScore, setGlobalScore] = useState(0)
  const [disabled, setDisabled] = useState(true)
  const [options, setOptions] = useState(data.options)
  const [nextQuestion, setNextQuestion] = useState(false)
  const [loadedImg, setLoadedImg] = useState(false)
  const [prevPath, setPrevPath] = useState(false)
  const { t } = useTranslation('screenRenderUniqueOptionsEncapsulate')
  const didMount = useRef(false)

  useEffect(() => {
    if (data.length === 0) return
    setOptions(data.options)
    setCurrentOption(getRandomOption())
    return () => {
      setScore(false)
      setGlobalScore(0)
    }
  }, [])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    setOptionsSet(getOptions(currentOption))
    if (prevPath !== currentOption.image) {
      setLoadedImg(false)
    }
    setPrevPath(currentOption.image)
  }, [currentOption])

  function getOptions ({ answers }) {
    return answers.sort(() => 0.5 - Math.random())
  }

  function getRandomOption () {
    if (options.length) {
      const value = options[options.length - 1]
      setOptions(options.slice(0, options.length - 1))
      return value
    }
    return null
  }

  const handleClick = () => {
    const value = getRandomOption()
    setNextQuestion(false)
    setGlobalScore(handleScore())
    setDisabled(true)
    if (value) {
      document.querySelector(`${hasImages ? '.screenRenderUniqueOption' : '.screenRenderUniqueOptionsEncapsulate'}`).scrollTop = 0
      setCurrentOption(value)
    } else {
      if (isFinished) { isFinished('end') }
    }
  }

  const handleScore = () => {
    let value = null
    if (typeof score === 'object') {
      value = (Object.values(score).length === currentOption.maxOptions && Object.values(score).every(curr => curr)) ? gobalScore + 1 : gobalScore
    } else {
      value = score ? gobalScore + 1 : gobalScore
    }
    setScore(null)
    returnScore(value)
    return value
  }

  return (
    <div className={`${hasImages ? 'screenRenderUniqueOption' : 'screenRenderUniqueOptionsEncapsulate'} ${center && 'center'}`}>
      {hasImages &&
        <>
          {loadedImg ? null : <div className='spinner-3' />}
          <img style={loadedImg ? {} : { display: 'none' }} src={`./images/exercises/${data.path}/${currentOption.image}`} alt={currentOption.image} className={`${hasBackground ? 'img-styled' : ''} ${smallImg ? 'img-mini' : ''}`} onLoad={() => { setLoadedImg(true) }} />
        </>}
      {currentOption.multiple
        ? <MultipleOption options={optionsSet} isCorrectOption={setScore} enableButton={setDisabled} showCorrect={nextQuestion} title={currentOption.question} maxOptions={currentOption.maxOptions} />
        : <UniqueOption options={optionsSet} isCorrectOption={setScore} enableButton={setDisabled} showCorrect={nextQuestion} title={currentOption.question} />}
      {!nextQuestion && <button className='button-play' onClick={() => { setNextQuestion(true) }} disabled={disabled}>{t('answer-button')}</button>}
      {nextQuestion && <button className='button-play' onClick={handleClick}>{t('next-button')}</button>}
    </div>
  )
}
